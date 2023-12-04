//0xeEeEEb57642040bE42185f49C52F7E9B38f8eeeE
import { account, publicClient, walletClient } from "./clients";
import ABI from "./abi.json";

// const contractFactory = "0xfbb4E52FEcc90924c79F980eb24a9794ae4aFFA4";

const getAmountIn = async (amountIn: bigint, path: `0x${string}`[]) => {
  const data = await publicClient.readContract({
    address: "0x7ae799fDBE4c330A4AC18d8d65765222A0D47e6D",
    abi: ABI.abi,
    functionName: "getAmountsIn",
    args: [amountIn, path],
  });

  if (Array.isArray(data)) {
    const amountIn = data[1];
    return amountIn as bigint;
  } else {
    // Handle the case when data is not an array
    console.error("Data is not an array:", data);
    // You may choose to return a default value, throw an error, or handle it in some other way.
    // For now, let's return null as an example.
    return null;
  }
};

export default getAmountIn;
