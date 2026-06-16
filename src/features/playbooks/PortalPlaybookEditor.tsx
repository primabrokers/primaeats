import { useEffect, useState } from "react";
import { Plus, Trash2, Upload, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { InsurerPortal, PlaybookStep, PortalPlaybook } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const PLAYBOOK_BUCKET = "portal-playbooks";

interface EditableField {
  portalField: string;
  riskField: string;
}

interface EditableStep {
  id: string;
  instruction: string;
  expected_screen: string;
  fields: EditableField[];
  screenshotFile: File | null;
  existingScreenshot: string | null;
}

const blankStep = (): EditableStep => ({
  id: crypto.randomUUID(),
  instruction: "",
  expected_screen: "",
  fields: [],
  screenshotFile: null,
  existingScreenshot: null,
});

const slug = (s: string) =>
  s.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "x";

export function PortalPlaybookEditor() {
  const [portals, setPortals] = useState<InsurerPortal[]>([]);
  const [portalId, setPortalId] = useState("");
  const [productType, setProductType] = useState("");
  const [steps, setSteps] = useState<EditableStep[]>([blankStep()]);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("insurer_portals")
        .select("id, insurer_name, portal_url, credential_key, is_active")
        .eq("is_active", true)
        .order("insurer_name");
      setPortals((data ?? []) as InsurerPortal[]);
    })();
  }, []);

  function patchStep(id: string, patch: Partial<EditableStep>) {
    setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }

  function patchField(stepId: string, index: number, patch: Partial<EditableField>) {
    setSteps((prev) =>
      prev.map((s) =>
        s.id === stepId
          ? { ...s, fields: s.fields.map((f, i) => (i === index ? { ...f, ...patch } : f)) }
          : s,
      ),
    );
  }

  async function loadCurrent() {
    setMessage(null);
    if (!portalId || !productType.trim()) {
      setMessage({ kind: "error", text: "Pick a portal and product type first." });
      return;
    }
    const { data } = await supabase
      .from("portal_playbooks")
      .select("*")
      .eq("portal_id", portalId)
      .eq("product_type", productType.trim())
      .order("version", { ascending: false })
      .limit(1);
    const pb = (data?.[0] as PortalPlaybook | undefined) ?? null;
    if (!pb) {
      setMessage({ kind: "error", text: "No existing version — start fresh." });
      return;
    }
    setNotes(pb.notes ?? "");
    setSteps(
      (pb.steps ?? []).map((s: PlaybookStep) => ({
        id: crypto.randomUUID(),
        instruction: s.instruction ?? "",
        expected_screen: s.expected_screen ?? "",
        fields: Object.entries(s.field_map ?? {}).map(([portalField, riskField]) => ({
          portalField,
          riskField,
        })),
        screenshotFile: null,
        existingScreenshot: s.reference_screenshot ?? null,
      })),
    );
    setMessage({ kind: "ok", text: `Loaded v${pb.version}. Saving creates v${pb.version + 1}.` });
  }

  async function save() {
    setMessage(null);
    if (!portalId) return setMessage({ kind: "error", text: "Pick a portal." });
    if (!productType.trim()) return setMessage({ kind: "error", text: "Enter a product type." });
    if (!steps.some((s) => s.instruction.trim())) {
      return setMessage({ kind: "error", text: "Add at least one step with an instruction." });
    }

    setSaving(true);
    try {
      // Next version for this (portal, product_type).
      const { data: latest } = await supabase
        .from("portal_playbooks")
        .select("version")
        .eq("portal_id", portalId)
        .eq("product_type", productType.trim())
        .order("version", { ascending: false })
        .limit(1);
      const nextVersion = ((latest?.[0]?.version as number | undefined) ?? 0) + 1;

      // Upload any new step screenshots; collect playbook-level reference list.
      const referenceScreenshots: string[] = [];
      const stepRows: PlaybookStep[] = [];
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i]!;
        if (!step.instruction.trim()) continue;

        let screenshotPath = step.existingScreenshot;
        if (step.screenshotFile) {
          const ext = step.screenshotFile.name.split(".").pop() || "png";
          const path = `${portalId}/${slug(productType)}/v${nextVersion}/step${i + 1}-${Date.now()}.${ext}`;
          const { error: upErr } = await supabase.storage
            .from(PLAYBOOK_BUCKET)
            .upload(path, step.screenshotFile, {
              contentType: step.screenshotFile.type || "image/png",
              upsert: true,
            });
          if (upErr) throw new Error(`Screenshot upload failed: ${upErr.message}`);
          screenshotPath = path;
        }
        if (screenshotPath) referenceScreenshots.push(screenshotPath);

        const fieldMap: Record<string, string> = {};
        for (const f of step.fields) {
          if (f.portalField.trim() && f.riskField.trim()) {
            fieldMap[f.portalField.trim()] = f.riskField.trim();
          }
        }

        stepRows.push({
          instruction: step.instruction.trim(),
          expected_screen: step.expected_screen.trim(),
          field_map: fieldMap,
          reference_screenshot: screenshotPath,
        });
      }

      // Append-only: deactivate prior versions, then insert the new active one.
      await supabase
        .from("portal_playbooks")
        .update({ is_active: false })
        .eq("portal_id", portalId)
        .eq("product_type", productType.trim());

      const { error: insErr } = await supabase.from("portal_playbooks").insert({
        portal_id: portalId,
        version: nextVersion,
        product_type: productType.trim(),
        steps: stepRows,
        reference_screenshots: referenceScreenshots,
        notes: notes.trim() || null,
        is_active: true,
      });
      if (insErr) throw new Error(insErr.message);

      setMessage({ kind: "ok", text: `Saved as version ${nextVersion}.` });
    } catch (err) {
      setMessage({ kind: "error", text: (err as Error).message });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Portal playbook editor</CardTitle>
          <CardDescription>
            Author how to drive a portal for a product type. Each save is a new version —
            history is kept for audit and rollback.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="portal">Portal</Label>
              <Select id="portal" value={portalId} onChange={(e) => setPortalId(e.target.value)}>
                <option value="">Select a portal…</option>
                {portals.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.insurer_name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="product">Product type</Label>
              <Input
                id="product"
                placeholder="e.g. motor"
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button variant="outline" onClick={loadCurrent} className="w-full">
                Load current version
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {steps.map((step, index) => (
        <Card key={step.id}>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Step {index + 1}</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSteps((prev) => prev.filter((s) => s.id !== step.id))}
              aria-label="Remove step"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Instruction</Label>
              <Textarea
                placeholder="e.g. Log in, then open New Quote"
                value={step.instruction}
                onChange={(e) => patchStep(step.id, { instruction: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Expected screen (label)</Label>
              <Input
                placeholder="e.g. New Quote — Vehicle details"
                value={step.expected_screen}
                onChange={(e) => patchStep(step.id, { expected_screen: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Field mappings</Label>
              <p className="text-xs text-muted-foreground">
                Portal field label → which <code>risk_data</code> key supplies its value.
              </p>
              <div className="space-y-2">
                {step.fields.map((field, fi) => (
                  <div key={fi} className="flex items-center gap-2">
                    <Input
                      placeholder="Portal field (e.g. Registration)"
                      value={field.portalField}
                      onChange={(e) => patchField(step.id, fi, { portalField: e.target.value })}
                    />
                    <span className="text-muted-foreground">←</span>
                    <Input
                      placeholder="risk_data key (e.g. vehicle_reg)"
                      value={field.riskField}
                      onChange={(e) => patchField(step.id, fi, { riskField: e.target.value })}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        patchStep(step.id, {
                          fields: step.fields.filter((_, i) => i !== fi),
                        })
                      }
                      aria-label="Remove field"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    patchStep(step.id, {
                      fields: [...step.fields, { portalField: "", riskField: "" }],
                    })
                  }
                >
                  <Plus className="h-4 w-4" />
                  Add field
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Reference screenshot</Label>
              <div className="flex items-center gap-3">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent">
                  <Upload className="h-4 w-4" />
                  Choose image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      patchStep(step.id, { screenshotFile: e.target.files?.[0] ?? null })
                    }
                  />
                </label>
                <span className="text-sm text-muted-foreground">
                  {step.screenshotFile?.name ??
                    (step.existingScreenshot ? "current screenshot kept" : "none")}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button
        variant="outline"
        onClick={() => setSteps((prev) => [...prev, blankStep()])}
      >
        <Plus className="h-4 w-4" />
        Add step
      </Button>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="Anything the runner should know about this portal."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          {message && (
            <p
              className={
                message.kind === "ok" ? "text-sm text-emerald-600" : "text-sm text-destructive"
              }
            >
              {message.text}
            </p>
          )}
          <Button onClick={save} disabled={saving}>
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            Save as new version
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
