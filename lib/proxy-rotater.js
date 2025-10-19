/**
 * @fileoverview A class for rotating through a list of proxies.
 * @module ProxyRotater
 */

/**
 * @class
 * @classdesc A utility class to manage a list of proxies and rotate through them in a round-robin fashion.
 */
class ProxyRotater {
  /**
   * Creates an instance of ProxyRotater.
   * @constructor
   * @param {string[]} [proxyList=[]] - An initial array of proxy strings.
   */
  constructor(proxyList = []) {
    /**
     * The internal array holding the list of proxy strings.
     * @private
     * @type {string[]}
     */
    this.proxyList = proxyList;

    /**
     * The index of the next proxy to be returned.
     * @private
     * @type {number}
     */
    this.currentIndex = 0;
  }

  /**
   * Adds a single proxy string to the list.
   * @param {string} proxy - The proxy string to add (e.g., "http://user:pass@ip:port").
   */
  addProxy(proxy) {
    if (typeof proxy === "string") {
      this.proxyList.push(proxy);
    }
  }

  /**
   * Adds an array of proxy strings to the list.
   * @param {string[]} proxies - An array of proxy strings to add.
   */
  addProxies(proxies) {
    if (Array.isArray(proxies)) {
      this.proxyList.push(...proxies);
    }
  }

  /**
   * Gets the next proxy in the list using a round-robin rotation.
   * The internal index is automatically incremented.
   * @returns {?string} The next proxy string, or `null` if the list is empty.
   */
  getNext() {
    if (this.proxyList.length === 0) {
      return null;
    }

    const proxy = this.proxyList[this.currentIndex];
    // Use the modulo operator to loop the index back to 0 when it reaches the list length
    this.currentIndex = (this.currentIndex + 1) % this.proxyList.length;
    return proxy;
  }

  /**
   * Removes a specific proxy string from the list.
   * If the removed proxy was the one pointed to by `currentIndex`, the index is reset to 0
   * if it exceeds the new length of the list.
   * @param {string} proxy - The proxy string to remove.
   */
  removeProxy(proxy) {
    const index = this.proxyList.indexOf(proxy);
    if (index > -1) {
      this.proxyList.splice(index, 1);
      // Adjust currentIndex if it's now out of bounds after removal
      if (this.currentIndex >= this.proxyList.length) {
        this.currentIndex = 0;
      }
    }
  }

  /**
   * Clears all proxies from the list and resets the rotation index.
   */
  clear() {
    this.proxyList = [];
    this.currentIndex = 0;
  }

  /**
   * Gets the current number of proxies in the list.
   * @member {number}
   * @readonly
   */
  get count() {
    return this.proxyList.length;
  }
}

module.exports = { ProxyRotater };
