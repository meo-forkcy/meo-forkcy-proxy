class ProxyScraper {
  /**
   * Initializes the ProxyScraper with default and custom sources.
   * @param {string[]} sources - Array of proxy source URLs.
   */
  constructor(sources) {
    this.sources = [
      ...sources,
      "https://raw.githubusercontent.com/TheSpeedX/PROXY-List/refs/heads/master/http.txt",
      "https://raw.githubusercontent.com/dpangestuw/Free-Proxy/refs/heads/main/allive.txt",
      "https://raw.githubusercontent.com/TheSpeedX/PROXY-List/refs/heads/master/socks4.txt",
      "https://raw.githubusercontent.com/TheSpeedX/PROXY-List/refs/heads/master/socks5.txt",
      "https://raw.githubusercontent.com/watchttvv/free-proxy-list/refs/heads/main/proxy.txt",
      "https://raw.githubusercontent.com/proxifly/free-proxy-list/refs/heads/main/proxies/all/data.txt",
    ];
  }

  /**
   * Parse and format a proxy string to standard format
   * @param {string} line - Raw proxy string line
   * @returns {string|null} Formatted proxy string or null if invalid
   */
  parseProxyLine(line) {
    // Regular expression to match proxy patterns
    const proxyRegex =
      /(?:(http|socks4|socks5):\/\/)?([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}):([0-9]{1,5})/i;

    const match = line.match(proxyRegex);
    if (!match) return null;

    const [, protocol, ip, port] = match;
    // If no protocol specified, assume http
    const finalProtocol = protocol ? protocol.toLowerCase() : "http";

    return `${finalProtocol}://${ip}:${port}`;
  }

  /**
   * Fetches proxies from the configured sources and returns them as an array.
   * @returns {Promise<string[]>} A promise that resolves to an array of proxies.
   */
  async getProxies() {
    let proxies = [];

    for (const source of this.sources) {
      try {
        const res = await fetch(source, {
          headers: { "User-Agent": "Mozilla/5.0" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.text();

        const proxyList = data
          .split("\n")
          .map((line) => line.trim())
          .map((line) => this.parseProxyLine(line))
          .filter(Boolean);

        proxies = proxies.concat(proxyList);
      } catch (err) {
        console.error(`Error fetching proxies from ${source}: ${err.message}`);
      }
    }

    return proxies;
  }
}

module.exports = { ProxyScraper };
