import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { arthera } from "./artheraChain";

const pk = process.env.PRIVATE_KEY;

export const account = privateKeyToAccount(pk as `0x${string}`);

export const publicClient = createPublicClient({
  chain: arthera,
  transport: http(),
});

export const walletClient = createWalletClient({
  account,
  chain: arthera,
  transport: http(),
});
