const { HttpsProxyAgent } = require("https-proxy-agent");
const { SocksProxyAgent } = require("socks-proxy-agent");

/**
 * A wrapper class to create an appropriate proxy agent (HTTP/HTTPS or SOCKS)
 * based on the provided proxy URL string.
 */
class ProxyAgent {
  /**
   * Creates an instance of ProxyAgent.
   * Automatically determines whether to use a SOCKS or HTTPS proxy.
   *
   * @param {string} proxy - The proxy URL string. Example:
   *  - "http://host:port"
   *  - "http://user:pass@host:port"
   *  - "https://user:pass@host:port"
   *  - "socks5://user:pass@host:port"
   * @param {object} [options] - Additional options for the proxy agent.
   *
   * @example
   * // Pass options like TLS validation or connection reuse
   * new ProxyAgent("https://user:pass@host:port", {
   *   rejectUnauthorized: false, // allow self-signed certs
   *   keepAlive: true            // keep sockets alive
   * });
   *
   * @example
   * // You can also wrap with a custom https.Agent
   * const https = require("https");
   * new ProxyAgent("http://host:port", new https.Agent({
   *   keepAlive: true,
   *   timeout: 5000
   * }));
   */
  constructor(proxy, options = {}) {
    /** @type {HttpsProxyAgent | SocksProxyAgent | null} */
    this.agent = null;

    if (!proxy) return;

    const url = proxy.toLowerCase();

    if (url.startsWith("sock")) {
      this.agent = new SocksProxyAgent(proxy, options);
    } else if (url.startsWith("http")) {
      this.agent = new HttpsProxyAgent(proxy, options);
    } else {
      throw new Error(`Unsupported proxy protocol: ${proxy}`);
    }
  }
}

module.exports = { ProxyAgent };
