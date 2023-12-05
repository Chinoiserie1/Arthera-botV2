import { account, publicClient, walletClient } from "./clients";
import ABI from "./abi.json";

const contractCallWithValue = async (
  amountOutMin: bigint,
  address: `0x${string}`[],
  to: `0x${string}`,
  deadline: bigint,
  value: bigint
) => {
  const { request } = await publicClient.simulateContract({
    account,
    address: "0x7ae799fDBE4c330A4AC18d8d65765222A0D47e6D",
    abi: ABI.abi,
    functionName: "swapExactETHForTokens",
    args: [amountOutMin, address, to, deadline],
    value: value,
  });
  const hash = await walletClient.writeContract(request);
  return hash;
};

export default contractCallWithValue;
