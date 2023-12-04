//0xeEeEEb57642040bE42185f49C52F7E9B38f8eeeE
import { account, publicClient, walletClient } from "./clients";
import ABI from "./token.json";

const getContractUserBalance = async (
  contractAddress: `0x${string}`,
  addressTo: `0x${string}`
) => {
  const data = await publicClient.readContract({
    address: contractAddress,
    abi: ABI.abi,
    functionName: "balanceOf",
    args: [addressTo],
  });

  return data as bigint;
};

export default getContractUserBalance;
