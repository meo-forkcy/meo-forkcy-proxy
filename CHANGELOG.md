# Changelog

## v1.0.1 - Fix version error - 3/7/2025

## v1.0.0 - Initial Release - 3/7/2025

### Features

- 🧭 `ProxySelector` class supports multiple proxy selection strategies:

  - `static`: one-to-one mapping by index
  - `round`: round-robin cycling
  - `random`: random pick
  - `shuffle`: pre-shuffled list
  - `batch`: offset-based round-robin

- 🌍 `ProxyAgent` class that wraps proxy agent creation for:

  - HTTP
  - HTTPS
  - SOCKS5 proxies

- ✅ Ready to be used with `axios` or other HTTP clients.

- 📦 Example script with test accounts and proxy usage.
