import "dotenv/config";
import readline from "node:readline";
import { Writable } from "node:stream";
import { createRunnerClient } from "./core/supabase.js";
import { setPortalCredentials } from "./core/credentials.js";
import type { InsurerPortal } from "./core/types.js";

// Interactive, one-time setup: prompt for each portal's username/password and
// write them into the Windows Credential Manager under the portal's
// credential_key. Secrets never leave this machine — they are NOT stored in
// Supabase, .env, or git. Re-running updates an existing entry.

function ask(query: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(query, (a) => { rl.close(); resolve(a.trim()); }));
}

// Password prompt that does not echo keystrokes to the terminal.
function askHidden(query: string): Promise<string> {
  return new Promise((resolve) => {
    const muted = new Writable({
      write(_chunk, _enc, cb) { cb(); },
    });
    const rl = readline.createInterface({ input: process.stdin, output: muted, terminal: true });
    process.stdout.write(query);
    rl.question("", (answer) => {
      rl.close();
      process.stdout.write("\n");
      resolve(answer.trim());
    });
  });
}

async function main(): Promise<void> {
  const supabase = createRunnerClient();
  const { data: portals, error } = await supabase
    .from("insurer_portals")
    .select("id, insurer_name, portal_url, credential_key, is_active")
    .eq("is_active", true)
    .order("insurer_name");
  if (error) throw new Error(`Failed to list portals: ${error.message}`);

  const active = (portals ?? []) as InsurerPortal[];
  if (active.length === 0) {
    console.log("No active portals found. Add portals in the CRM first.");
    return;
  }

  console.log("Store portal credentials in Windows Credential Manager.\n");
  for (const portal of active) {
    console.log(`\n${portal.insurer_name}  (${portal.portal_url})`);
    console.log(`  credential_key: ${portal.credential_key}`);
    const skip = (await ask("  Set credentials now? [y/N] ")).toLowerCase();
    if (skip !== "y" && skip !== "yes") {
      console.log("  Skipped.");
      continue;
    }
    const username = await ask("  Username: ");
    const password = await askHidden("  Password: ");
    if (!username || !password) {
      console.log("  Empty username/password — skipped.");
      continue;
    }
    await setPortalCredentials(portal.credential_key, { username, password });
    console.log("  ✓ Stored.");
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
