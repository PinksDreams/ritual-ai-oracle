import { ethers } from "ethers";

export const CONTRACT_ADDRESS =
  "0x8101CC03c6f02f226eC86b95fe315407Ba6390B3";

export const ABI = [
  "function sentimentScore() view returns (int256)",
  "function sentimentLabel() view returns (string)",
  "function lastUpdated() view returns (uint256)"
];

const RPC_URL = "https://rpc.ritualfoundation.org";

export async function getContract() {
  const provider = new ethers.JsonRpcProvider(RPC_URL);

  return new ethers.Contract(
    CONTRACT_ADDRESS,
    ABI,
    provider
  );
}