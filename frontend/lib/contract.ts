import { ethers } from "ethers";

export const CONTRACT_ADDRESS =
  "0x8101CC03c6f02f226eC86b95fe315407Ba6390B3";

export const ABI = [
  "function sentimentScore() view returns (int256)",
  "function sentimentLabel() view returns (string)",
  "function lastUpdated() view returns (uint256)"
];

export async function getContract() {
  if (!window.ethereum) {
    throw new Error("MetaMask not found");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);

  const signer = await provider.getSigner();

  return new ethers.Contract(
    CONTRACT_ADDRESS,
    ABI,
    signer
  );
}