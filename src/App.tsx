import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { SignIn } from "@/components/SignIn";
import { Button } from "@/components/ui/button";
import { GetQuotes } from "@/features/quotes/GetQuotes";
import { PortalPlaybookEditor } from "@/features/playbooks/PortalPlaybookEditor";
import { cn } from "@/lib/utils";

type Tab = "quotes" | "playbooks";

export default function App() {
  // undefined = still loading, null = signed out, Session = signed in.
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [tab, setTab] = useState<Tab>("quotes");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (session === null) return <SignIn />;

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-6">
            <span className="font-semibold">Prima Quote Agent</span>
            <nav className="flex gap-1">
              <TabButton active={tab === "quotes"} onClick={() => setTab("quotes")}>
                Get quotes
              </TabButton>
              <TabButton active={tab === "playbooks"} onClick={() => setTab("playbooks")}>
                Playbook editor
              </TabButton>
            </nav>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>{session.user.email}</span>
            <Button variant="outline" size="sm" onClick={() => supabase.auth.signOut()}>
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        {tab === "quotes" ? <GetQuotes /> : <PortalPlaybookEditor />}
      </main>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
        active ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
