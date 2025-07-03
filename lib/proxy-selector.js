const { shuffleArray } = require("meo-forkcy-utils");

/**
 * Manages proxy selection from a list based on a specified mode.
 */
class ProxySelector {
  /**
   * @param {Array<string>} proxies - The list of proxy strings.
   * @param {'static'|'round'|'random'|'shuffle'|'batch'} [mode='round'] - The proxy selection mode.
   * @param {number} [batchOffset=0] - The offset for 'batch' mode.
   */
  constructor(proxies, mode = "static", batchOffset = 0) {
    this.proxies = proxies || [];
    this.mode = mode;
    this.batchOffset = batchOffset;
    this.shuffledProxies =
      this.mode === "shuffle" ? shuffleArray([...this.proxies]) : [];
  }

  /**
   * Gets a proxy for a given index.
   * @param {number} idx - The account or task index.
   * @returns {string|null} The selected proxy string or null if none are available.
   */
  getProxy(idx) {
    if (!this.proxies || this.proxies.length === 0) return null;

    switch (this.mode) {
      case "static":
        return this.proxies[idx] || null;

      case "round":
        return this.proxies[idx % this.proxies.length];

      case "random":
        return this.proxies[Math.floor(Math.random() * this.proxies.length)];

      case "shuffle":
        return this.shuffledProxies[idx % this.shuffledProxies.length];

      case "batch":
        return this.proxies[(this.batchOffset + idx) % this.proxies.length];

      default:
        throw new Error(`Unknown proxy mode: ${this.mode}`);
    }
  }
}

module.exports = { ProxySelector };
