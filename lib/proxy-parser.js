/**
 * Parses a proxy URL string into its components.
 *
 * @param {string} input - Proxy string (e.g. "socks5://user:pass@host:1080").
 * @returns {{protocol: string, user: string|null, pass: string|null, host: string, port: string}|null}
 *          An object with proxy details, or null if parsing fails.
 */
function parseProxy(input) {
  if (!input) return null;

  input = input.trim();
  let protocol = "http";
  const protocolMatch = input.match(/^(https?|socks4|socks5):\/\//i);
  if (protocolMatch) {
    protocol = protocolMatch[1].toLowerCase();
    input = input.slice(protocolMatch[0].length);
  }

  let user = null,
    pass = null,
    host = null,
    port = null;

  // auth part before @
  const authSplit = input.split("@");
  if (authSplit.length === 2) {
    const creds = authSplit[0].split(":");
    user = creds[0]?.trim() || null;
    pass = creds[1]?.trim() || null;
    input = authSplit[1];
  }

  const parts = input.split(":").map((p) => p.trim());

  if (parts.length === 2) {
    host = parts[0];
    port = parts[1];
  } else if (parts.length === 4) {
    user = user || parts[0];
    pass = pass || parts[1];
    host = parts[2];
    port = parts[3];
  } else if (parts.length === 3 && !user && !pass) {
    user = parts[0];
    pass = parts[1];
    host = parts[2];
  } else {
    host = parts[0];
  }

  if (!host) return null;

  host = host.replace(/\/+$/, "");
  port =
    port?.replace(/[^\d]/g, "") ||
    (protocol.startsWith("socks") ? "1080" : "8080");

  return { protocol, host, port, user: user || null, pass: pass || null };
}

module.exports = { parseProxy };
