const { ProxyAgent } = require("../lib/proxy-agent");
const { shuffleArray } = require("meo-forkcy-utils");
const { ProxySelector } = require("../lib/proxy-selector");

// --- 1. Input data ---
const accounts = ["account1", "account2", "account3", "account4", "account5"];
const PROXIES = [
  "http://user1:pass1@proxy1.com:8080",
  "http://user2:pass2@proxy2.com:8080",
  "socks5://user3:pass3@proxy3.com:1080",
];

// --- 2. Choose mode and prepare ---
const proxyMode = "random"; // Choose the mode you want: static | round | random | shuffle | batch
let shuffledProxies = null;

// For 'shuffle' mode, we need to pre-generate a shuffled proxy list
if (proxyMode === "shuffle") {
  shuffledProxies = shuffleArray([...PROXIES]);
}

// --- 3. Loop through accounts and use proxies ---
async function runTasks() {
  for (let i = 0; i < accounts.length; i++) {
    const account = accounts[i];

    // 3a. Get the proxy string for the current account
    const selector = new ProxySelector(
      shuffledProxies || PROXIES,
      proxyMode,
      i
    );
    const proxyString = selector.getProxy(i);

    if (!proxyString) {
      console.log(`[${i}] ${account} - No proxy assigned. Skipping.`);
      continue;
    }

    console.log(`[${i}] ${account} - Using proxy: ${proxyString}`);

    try {
      // 3b. Create an agent from the proxy string
      const proxyAgent = new ProxyAgent(proxyString);

      // 3c. Use the agent to perform a network request (e.g., with axios)
      // const axios = require("axios");
      // const response = await axios.get("https://api.ipify.org?format=json", {
      //   httpsAgent: proxyAgent.agent, // Important: attach the agent here
      //   httpAgent: proxyAgent.agent,
      // });
      // console.log(`[${i}] ${account} - Public IP via proxy: ${response.data.ip}`);
    } catch (error) {
      console.error(
        `[${i}] ${account} - Error with proxy ${proxyString}:`,
        error.message
      );
    }
  }
}

runTasks();
