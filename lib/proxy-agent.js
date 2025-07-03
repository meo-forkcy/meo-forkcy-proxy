const { HttpsProxyAgent } = require("https-proxy-agent");
const { SocksProxyAgent } = require("socks-proxy-agent");

/**
 * A wrapper class to create an appropriate proxy agent (HTTP/HTTPS or SOCKS)
 * based on the provided proxy URL string.
 */
class ProxyAgent {
  /**
   * The initialized agent instance (either HttpsProxyAgent or SocksProxyAgent).
   * @type {HttpsProxyAgent | SocksProxyAgent}
   */
  agent;

  /**
   * Creates an instance of ProxyAgent.
   * Automatically determines whether to use a SOCKS or HTTPS proxy.
   *
   * @param {string} proxy - The proxy URL string. Example:
   *  - "http://user:pass@host:port"
   *  - "https://user:pass@host:port"
   *  - "socks5://user:pass@host:port"
   */
  constructor(proxy, options = {}) {
    if (proxy.startsWith("sock")) {
      this.agent = new SocksProxyAgent(proxy, options);
    } else if (proxy.startsWith("http")) {
      this.agent = new HttpsProxyAgent(proxy, options);
    } else return null;
  }
}

module.exports = { ProxyAgent };
