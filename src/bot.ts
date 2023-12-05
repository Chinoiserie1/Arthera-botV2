import { account, publicClient, walletClient } from "./clients";
import { parseEther, formatEther } from "viem";
import getContractUserBalance from "./getContractUserBalance";
import contractCall from "./contractCall";
import contractCallWithValue from "./contractCallWithValue";
import random from "./random";
import getAmountOut from "./getAmountOut";

const addressELK = "0xeEeEEb57642040bE42185f49C52F7E9B38f8eeeE";
const addressWAA = "0xC7A183Ad373301d68f7E0Ee824c8c727C7D5B21d";

export const bot = async (amount: bigint) => {
  const balanceELK = await getContractUserBalance(addressELK, account.address);
  // const balanceWAA = await getContractUserBalance(addressWAA, account.address);
  const balanceAA = await publicClient.getBalance({
    address: account.address,
  });
  const block = await publicClient.getBlock();
  const timestamp = block.timestamp + BigInt(60000);

  var hash;

  const amountAA =
    amount == BigInt(0) ? random(1, Number(formatEther(balanceAA))) : amount;

  if (balanceAA < parseEther("2")) {
    console.log("enter ELK => AA ");
    const amountOut = await getAmountOut(balanceELK, [addressELK, addressWAA]);
    if (amountOut) {
      const output = (amountOut * BigInt("10")) / BigInt("100");
      hash = await contractCall(
        balanceELK,
        output,
        [addressELK, addressWAA],
        account.address,
        timestamp
      );
    }
  } else {
    console.log("enter AA => ELK ");
    const amountOut = await getAmountOut(parseEther(amountAA.toString()), [
      addressWAA,
      addressELK,
    ]);
    if (amountOut) {
      const output = (amountOut * BigInt("10")) / BigInt("100");
      hash = await contractCallWithValue(
        output,
        [addressWAA, addressELK],
        account.address,
        timestamp,
        parseEther(amountAA.toString())
      );
    }
  }

  if (hash) {
    const transaction = await publicClient.waitForTransactionReceipt({
      hash: hash,
    });
    console.log(transaction.status);

    if (transaction.status === "reverted") {
      throw new Error(amountAA.toString());
    }
  }

  console.log("hash : ", hash);
};

export const runBotWithRetry = async () => {
  let retryCount = 0;
  const maxRetries = 20;
  let amount = BigInt(0);

  while (retryCount < maxRetries) {
    try {
      await bot(amount);
      break;
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      amount = BigInt(message);
      retryCount++;
      await new Promise((resolve) => setTimeout(resolve, 10000));
    }
  }

  if (retryCount === maxRetries) {
    console.error(`La transaction a échoué après ${maxRetries} tentatives.`);
  }
};
