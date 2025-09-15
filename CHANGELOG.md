# Changelog

All notable changes to this project will be documented in this file.

## [1.0.2] - 2025-09-15

### Added

- `parseProxy(input)` utility to normalize proxy URL strings into:
  `{ protocol, host, port, user, pass }`.
- Extended JSDoc for `ProxyAgent`:
  - Added multiple usage `@example` blocks.
  - Documented `@returns {ProxyAgent}` type.
  - Added SOCKS4 support example.

### Changed

- Refined `ProxyAgent` constructor logic and documentation.
- Updated dependencies in `package.json`:
  - `https-proxy-agent` → latest
  - `socks-proxy-agent` → latest
  - `meo-forkcy-proxy` → latest
  - `meo-forkcy-utils` → latest

---

## [1.0.1] - 2025-07-03

### Fixed

- Version error in package metadata.

---

## [1.0.0] - 2025-07-03

### Added

- 🧭 `ProxySelector` class with multiple proxy selection strategies:
  - `static`: one-to-one mapping by index
  - `round`: round-robin cycling
  - `random`: random pick
  - `shuffle`: pre-shuffled list
  - `batch`: offset-based round-robin
- 🌍 `ProxyAgent` class that wraps proxy agent creation for:
  - HTTP
  - HTTPS
  - SOCKS5 proxies
- 📦 Example script with test accounts and proxy usage.

### Changed

- N/A (Initial release)

### Deprecated

- N/A (Initial release)

### Removed

- N/A (Initial release)

### Fixed

- N/A (Initial release)
