async function main() {

  const Oracle = await ethers.getContractFactory(
    "SentimentOracle"
  );

  const oracle = await Oracle.deploy();

  await oracle.waitForDeployment();

  console.log(
    "Oracle deployed to:",
    await oracle.getAddress()
  );

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});