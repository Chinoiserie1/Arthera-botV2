import { defineChain } from "viem";

export const arthera = defineChain({
  id: 10243,
  name: "Arthera",
  network: "Arthera testnet",
  nativeCurrency: {
    decimals: 18,
    name: "AA",
    symbol: "AA",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc-test.arthera.net"],
      webSocket: ["wss://ws-test.arthera.net"],
    },
    public: {
      http: ["https://rpc-test.arthera.net"],
      webSocket: ["wss://ws-test.arthera.net"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://explorer-test.arthera.net" },
  },
});
