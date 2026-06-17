import { useEffect, useMemo, useState } from "react";
import { FileText, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { AutomationJob } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  batchId: string;
}

const GBP = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" });
const money = (n: number | null | undefined) =>
  typeof n === "number" ? GBP.format(n) : "—";

const PENDING_STATUSES = new Set(["pending", "claimed", "running"]);

export function QuoteComparison({ batchId }: Props) {
  const [jobs, setJobs] = useState<Record<string, AutomationJob>>({});
  const [portalNames, setPortalNames] = useState<Record<string, string>>({});

  useEffect(() => {
    let active = true;

    (async () => {
      const { data } = await supabase
        .from("automation_jobs")
        .select("*")
        .eq("batch_id", batchId);
      if (!active || !data) return;

      const map: Record<string, AutomationJob> = {};
      for (const job of data as AutomationJob[]) map[job.id] = job;
      setJobs(map);

      const portalIds = [
        ...new Set((data as AutomationJob[]).map((j) => j.portal_id).filter(Boolean)),
      ] as string[];
      if (portalIds.length > 0) {
        const { data: portals } = await supabase
          .from("insurer_portals")
          .select("id, insurer_name")
          .in("id", portalIds);
        const names: Record<string, string> = {};
        for (const p of portals ?? []) names[p.id] = p.insurer_name;
        setPortalNames(names);
      }
    })();

    const channel = supabase
      .channel(`batch-${batchId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "automation_jobs",
          filter: `batch_id=eq.${batchId}`,
        },
        (payload) => {
          const row = payload.new as AutomationJob | undefined;
          if (row?.id) setJobs((prev) => ({ ...prev, [row.id]: row }));
        },
      )
      .subscribe();

    return () => {
      active = false;
      void supabase.removeChannel(channel);
    };
  }, [batchId]);

  const rows = useMemo(
    () =>
      Object.values(jobs).sort((a, b) =>
        (portalNames[a.portal_id ?? ""] ?? "").localeCompare(
          portalNames[b.portal_id ?? ""] ?? "",
        ),
      ),
    [jobs, portalNames],
  );

  const settled = rows.filter((j) => !PENDING_STATUSES.has(j.status)).length;

  async function openQuoteDoc(path: string) {
    const { data } = await supabase.storage.from("quote-docs").createSignedUrl(path, 60);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank", "noopener");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quote comparison</CardTitle>
        <CardDescription>
          {settled} of {rows.length} insurers complete · live updates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Insurer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Premium (gross)</TableHead>
              <TableHead className="text-right">Excess</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead>Doc</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  Waiting for jobs…
                </TableCell>
              </TableRow>
            )}
            {rows.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">
                  {portalNames[job.portal_id ?? ""] ?? "—"}
                </TableCell>
                <TableCell>
                  <StatusCell job={job} />
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {money(job.result?.premium_gross)}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {money(job.result?.excess)}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {job.result?.quote_ref ?? "—"}
                </TableCell>
                <TableCell>
                  {job.result?.quote_doc_path ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openQuoteDoc(job.result!.quote_doc_path!)}
                    >
                      <FileText className="h-4 w-4" />
                      View
                    </Button>
                  ) : (
                    "—"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function StatusCell({ job }: { job: AutomationJob }) {
  if (job.status === "needs_review") {
    return (
      <div className="space-y-1">
        <Badge variant="warning">Needs review</Badge>
        {job.error_message && (
          <p className="max-w-[16rem] text-xs text-muted-foreground">{job.error_message}</p>
        )}
      </div>
    );
  }
  if (job.status === "failed") {
    return (
      <div className="space-y-1">
        <Badge variant="danger">Failed</Badge>
        {job.error_message && (
          <p className="max-w-[16rem] text-xs text-muted-foreground">{job.error_message}</p>
        )}
      </div>
    );
  }
  if (job.status === "completed" && job.result) {
    const o = job.result.outcome;
    if (o === "quoted") return <Badge variant="success">Quoted</Badge>;
    if (o === "referred") return <Badge variant="warning">Referred</Badge>;
    return <Badge variant="muted">Declined</Badge>;
  }
  // pending / claimed / running
  return (
    <Badge variant="secondary" className="gap-1">
      <Loader2 className="h-3 w-3 animate-spin" />
      {job.status}
    </Badge>
  );
}
