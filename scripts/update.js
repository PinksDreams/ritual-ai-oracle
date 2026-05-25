const hre = require("hardhat");

async function main() {
  const contractAddress =
    "0x8101CC03c6f02f226eC86b95fe315407Ba6390B3";

  const Oracle =
    await hre.ethers.getContractFactory(
      "SentimentOracle"
    );

  const oracle =
    await Oracle.attach(contractAddress);

  console.log("Updating sentiment...");

  const tx =
    await oracle.updateSentiment(
      78,
      "BULLISH"
    );

  await tx.wait();

  console.log("Sentiment updated!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});