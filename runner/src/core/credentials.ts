import keytar from "keytar";

export interface PortalCredentials {
  username: string;
  password: string;
}

/**
 * Read a portal's username/password from the Windows Credential Manager, keyed
 * by the portal's `credential_key`. Credentials are stored as a single
 * Credential Manager entry where the account is the username and the secret is
 * the password (see setup-credentials.ts).
 *
 * NEVER source credentials from env, git, or Supabase. NEVER log the password.
 */
export async function getPortalCredentials(
  credentialKey: string,
): Promise<PortalCredentials> {
  const found = await keytar.findCredentials(credentialKey);
  if (!found || found.length === 0) {
    throw new Error(
      `No credentials found in Windows Credential Manager under "${credentialKey}". ` +
        `Run setup-credentials to store them.`,
    );
  }
  const first = found[0]!;
  if (!first.account || !first.password) {
    throw new Error(`Incomplete credential entry under "${credentialKey}".`);
  }
  return { username: first.account, password: first.password };
}

/**
 * Store a portal's credentials. Used by setup-credentials.ts only. Overwrites
 * any prior entry for this credential_key so re-running updates the password.
 */
export async function setPortalCredentials(
  credentialKey: string,
  creds: PortalCredentials,
): Promise<void> {
  // Clear any prior entries (a different username, or a re-run) first.
  const existing = await keytar.findCredentials(credentialKey);
  for (const e of existing) {
    await keytar.deletePassword(credentialKey, e.account);
  }
  await keytar.setPassword(credentialKey, creds.username, creds.password);
}
