"use strict";

const { ProxyAgent } = require("../lib/proxy-agent");
const { shuffleArray } = require("meo-forkcy-utils");
const { ProxyRotater } = require("../lib/proxy-rotater");
const { ProxyScraper } = require("../lib/proxy-scraper");
const { ProxySelector } = require("../lib/proxy-selector");

// --- 1. Input data ---
const ACCOUNTS = ["account1", "account2", "account3", "account4", "account5"];
const LOCAL_PROXIES = [
  "http://user1:pass1@proxy1.com:8080",
  "http://user2:pass2@proxy2.com:8080",
  "socks5://user3:pass3@proxy3.com:1080",
];

// --- 2. Configuration ---
const MODE = "random"; // static | round | random | shuffle | batch
const USE_SCRAPER = true; // fetch fresh proxies before using
const USE_ROTATER = false; // use ProxyRotater instead of ProxySelector

// --- 3. Prepare proxies ---
async function prepareProxies() {
  let proxies = [...LOCAL_PROXIES];

  if (USE_SCRAPER) {
    console.log("Fetching fresh proxies...");
    try {
      const scraper = new ProxyScraper([]);
      const scraped = await scraper.getProxies();
      console.log(`Fetched ${scraped.length} proxies from sources.`);
      proxies = proxies.concat(scraped);
    } catch (err) {
      console.warn(`Failed to fetch proxies: ${err.message}`);
    }
  }

  if (MODE === "shuffle") proxies = shuffleArray([...proxies]);
  return proxies;
}

// --- 4. Run logic ---
async function runTasks() {
  const proxies = await prepareProxies();
  if (!proxies.length) return console.error("No proxies available.");

  const proxyRotater = USE_ROTATER ? new ProxyRotater(proxies) : null;

  console.log(`\nRunning ${ACCOUNTS.length} accounts in mode "${MODE}"`);
  console.log(`Proxy pool size: ${proxies.length}\n`);

  for (let i = 0; i < ACCOUNTS.length; i++) {
    const account = ACCOUNTS[i];

    const proxyString = USE_ROTATER
      ? proxyRotater.getNext()
      : new ProxySelector(proxies, MODE, i).getProxy(i);

    if (!proxyString) {
      console.log(`[${i}] ${account} — No proxy assigned, skipping.`);
      continue;
    }

    console.log(`[${i}] ${account} — Using proxy: ${proxyString}`);

    try {
      const proxyAgent = new ProxyAgent(proxyString).agent;

      // Example fetch using proxy
      // const fetch = require('node-fetch');
      // const res = await fetch('https://api.ipify.org?format=json', { agent: proxyAgent });
      // const data = await res.json();
      // console.log(`   ↳ Public IP via proxy: ${data.ip}`);
    } catch (err) {
      console.error(`   ✖ Proxy failed: ${err.message}`);
    }
  }
}

// --- 5. Execute ---
runTasks().catch(console.error);
