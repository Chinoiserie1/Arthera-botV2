import { account, publicClient, walletClient } from "./clients";
import ABI from "./abi.json";

const contractCallWithValue = async (
  amountOutMin: bigint,
  address: `0x${string}`[],
  to: `0x${string}`,
  deadline: bigint,
  value: bigint
) => {
  console.log("enter contractCallWithValue");
  // const { request } = await publicClient.simulateContract({
  //   account,
  //   address: "0x7ae799fDBE4c330A4AC18d8d65765222A0D47e6D",
  //   abi: ABI.abi,
  //   functionName: "swapETHForExactTokens",
  //   args: [amountOutMin, address, to, deadline],
  //   value: amountOutMin,
  // });
  const hash = await walletClient.writeContract({
    account,
    address: "0x7ae799fDBE4c330A4AC18d8d65765222A0D47e6D",
    abi: ABI.abi,
    functionName: "swapExactETHForTokens",
    args: [amountOutMin, address, to, deadline],
    value: value,
  });
  return hash;
};

export default contractCallWithValue;
