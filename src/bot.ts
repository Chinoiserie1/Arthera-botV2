import { account, publicClient, walletClient } from "./clients";
import { parseEther, formatEther } from "viem";
import getContractUserBalance from "./getContractUserBalance";
import contractCall from "./contractCall";
import contractCallWithValue from "./contractCallWithValue";
import random from "./random";
import getAmountOut from "./getAmountOut";

const addressELK = "0xeEeEEb57642040bE42185f49C52F7E9B38f8eeeE";
const addressWAA = "0xC7A183Ad373301d68f7E0Ee824c8c727C7D5B21d";

export const bot = async () => {
  const balanceELK = await getContractUserBalance(addressELK, account.address);
  // const balanceWAA = await getContractUserBalance(addressWAA, account.address);
  const balanceAA = await publicClient.getBalance({
    address: account.address,
  });
  const block = await publicClient.getBlock();
  const timestamp = block.timestamp + BigInt(60000);

  var hash;

  if (balanceAA < parseEther("2")) {
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
    console.log("enter B ");
    const amountAA = random(1, Number(formatEther(balanceAA)));
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
  console.log(hash);
};
