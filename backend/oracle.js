require("dotenv").config();

const fs = require("fs");
const Parser = require("rss-parser");
const Sentiment = require("sentiment");
const { ethers } = require("ethers");

const parser = new Parser();
const sentiment = new Sentiment();

const CONTRACT_ADDRESS =
  "0x8101CC03c6f02f226eC86b95fe315407Ba6390B3";

const ABI = [
  "function updateSentiment(int256 _score, string memory _label) public"
];

const provider = new ethers.JsonRpcProvider(
  "https://rpc.ritualfoundation.org"
);

const wallet = new ethers.Wallet(
  process.env.PRIVATE_KEY,
  provider
);

const contract = new ethers.Contract(
  CONTRACT_ADDRESS,
  ABI,
  wallet
);

async function analyzeSentiment() {

  try {

    console.log("\n============================");
    console.log("RUNNING AI ORACLE UPDATE");
    console.log("============================\n");

    const feed = await parser.parseURL(
      "https://www.coindesk.com/arc/outboundfeeds/rss/"
    );

    const latestItems = feed.items.slice(0, 5);

    fs.writeFileSync(
      "./frontend/public/news.json",
      JSON.stringify(latestItems, null, 2)
    );

    const headlines = latestItems
      .map(item => item.title)
      .join(" ");

    console.log("Latest Headlines:\n");

    latestItems.forEach((item) => {
      console.log("-", item.title);
    });

    const result = sentiment.analyze(headlines);

    let label = "NEUTRAL";

    if (result.score > 2) {
      label = "BULLISH";
    }

    if (result.score < -2) {
      label = "BEARISH";
    }

    console.log("\nAI Sentiment:\n");

    console.log("Score:", result.score);

    console.log("Label:", label);

    console.log("\nUpdating blockchain...\n");

    const tx = await contract.updateSentiment(
      result.score,
      label
    );

    await tx.wait();

    console.log("SUCCESS");
    console.log("TX:", tx.hash);

    console.log("\nNext update in 5 minutes...\n");

  } catch (error) {

    console.error("\nOracle Error:\n");

    console.error(error);

  }

}

analyzeSentiment();

setInterval(() => {

  analyzeSentiment();

}, 5 * 60 * 1000);