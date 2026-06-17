import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { InsurerPortal } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QuoteComparison } from "./QuoteComparison";

interface EnqueueResponse {
  batch_id: string;
  job_ids: string[];
  product_type: string;
  insurers: string[];
}

export function GetQuotes() {
  const [portals, setPortals] = useState<InsurerPortal[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [policyRef, setPolicyRef] = useState("");
  const [productType, setProductType] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [batchId, setBatchId] = useState<string | null>(null);

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

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function submit() {
    setError(null);
    if (!policyRef.trim()) {
      setError("Enter a policy reference.");
      return;
    }
    if (selected.size === 0) {
      setError("Select at least one insurer.");
      return;
    }
    setSubmitting(true);
    setBatchId(null);
    try {
      const { data, error: fnErr } = await supabase.functions.invoke<EnqueueResponse>(
        "enqueue-quote-job",
        {
          body: {
            policy_ref: policyRef.trim(),
            product_type: productType.trim() || undefined,
            portal_ids: [...selected],
          },
        },
      );
      if (fnErr) throw new Error(fnErr.message);
      if (!data?.batch_id) throw new Error("No batch_id returned.");
      setBatchId(data.batch_id);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Get quotes</CardTitle>
          <CardDescription>
            Pick the insurers to quote in parallel. One job per portal, shared batch.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="policy-ref">Policy reference</Label>
              <Input
                id="policy-ref"
                placeholder="e.g. ABC123"
                value={policyRef}
                onChange={(e) => setPolicyRef(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="product-type">Product type (optional)</Label>
              <Input
                id="product-type"
                placeholder="defaults to the policy's product type"
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Insurers</Label>
            {portals.length === 0 ? (
              <p className="text-sm text-muted-foreground">No active portals configured.</p>
            ) : (
              <div className="grid gap-2 sm:grid-cols-2">
                {portals.map((portal) => (
                  <label
                    key={portal.id}
                    className="flex cursor-pointer items-center gap-2 rounded-md border p-2.5 text-sm hover:bg-accent"
                  >
                    <Checkbox
                      checked={selected.has(portal.id)}
                      onChange={() => toggle(portal.id)}
                    />
                    <span className="font-medium">{portal.insurer_name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button onClick={submit} disabled={submitting}>
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            Request {selected.size > 0 ? selected.size : ""} quote
            {selected.size === 1 ? "" : "s"}
          </Button>
        </CardContent>
      </Card>

      {batchId && <QuoteComparison batchId={batchId} />}
    </div>
  );
}
