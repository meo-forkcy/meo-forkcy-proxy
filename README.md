# 🔌 meo-forkcy-proxy

A simple and flexible proxy management library for Node.js, supporting various proxy selection strategies and compatible with `axios`, `got`, or any HTTP client that supports custom agents.

## 📦 Installation

```bash
npm install meo-forkcy-proxy
```

> Note: Requires `https-proxy-agent`, and `socks-proxy-agent` as peer dependencies.

## 🚀 Features

- Support for HTTP, HTTPS, and SOCKS5 proxies.
- Select proxies using different strategies:

  - `static`
  - `round`
  - `random`
  - `shuffle`
  - `batch`

- Easy integration with HTTP clients like `axios`.

## 🛠️ Usage

### Basic Example

```js
const { ProxyAgent, ProxySelector } = require("meo-forkcy-proxy");

const accounts = ["acc1", "acc2"];
const PROXIES = [
  "http://user:pass@proxy1.com:8080",
  "socks5://user:pass@proxy2.com:1080",
];

const mode = "round";

for (let i = 0; i < accounts.length; i++) {
  const selector = new ProxySelector(PROXIES, mode, i);
  const proxy = selector.getProxy(i);
  const agent = new ProxyAgent(proxy);

  // Example with axios
  const axios = require("axios");
  const res = await axios.get("https://api.ipify.org?format=json", {
    httpAgent: agent.agent,
    httpsAgent: agent.agent,
  });

  console.log(`${accounts[i]} => ${res.data.ip}`);
}
```

### Using ProxyRotater

```js
const { ProxyRotater } = require("meo-forkcy-proxy");

const rotater = new ProxyRotater([
  "http://proxy1.com:8080",
  "http://proxy2.com:8080",
]);

// Get next proxy in rotation
const proxy = rotater.getNext();

// Add more proxies
rotater.addProxy("http://proxy3.com:8080");
```

### Using ProxyScraper

```js
const { ProxyScraper } = require("meo-forkcy-proxy");

// Initialize with optional custom sources
const scraper = new ProxyScraper(["https://your-proxy-source.com/proxies.txt"]);

// Fetch proxies from all sources
const proxies = await scraper.getProxies();
console.log(`Found ${proxies.length} proxies`);
```

## 🧠 Proxy Modes

| Mode      | Description                                  |
| --------- | -------------------------------------------- |
| `static`  | One-to-one mapping based on index            |
| `round`   | Round-robin cycling through proxies          |
| `random`  | Randomly choose a proxy for each task        |
| `shuffle` | Use a pre-shuffled version of the proxy list |
| `batch`   | Shifted round-robin with a `batchOffset`     |

## 📘 API

### `new ProxyAgent(proxyUrl, options?)`

Creates an agent based on the proxy type (HTTP/HTTPS/SOCKS).

- `proxyUrl`: Full proxy URL string
- `options`: (optional) Extra options for the agent

### `new ProxySelector(proxies, mode, batchOffset?)`

Returns proxy strings based on the chosen selection mode.

### `new ProxyRotater(proxyList?)`

Manages proxy rotation in round-robin fashion.

- `proxyList`: Optional initial array of proxy strings

### `new ProxyScraper(sources?)`

Fetches proxies from multiple sources.

- `sources`: Optional array of custom proxy source URLs

## 🧪 Test

```bash
node examples/test.js
```

## 📄 License

MIT
