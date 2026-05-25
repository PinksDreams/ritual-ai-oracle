require("dotenv").config();

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

    console.log("\nFetching crypto news...\n");

    const feed = await parser.parseURL(
      "https://www.coindesk.com/arc/outboundfeeds/rss/"
    );

    const headlines = feed.items
      .slice(0, 5)
      .map(item => item.title)
      .join(" ");

    console.log("Latest Headlines:\n");

    console.log(headlines);

    const result = sentiment.analyze(headlines);

    let label = "NEUTRAL";

    if (result.score > 2) {
      label = "BULLISH";
    }

    if (result.score < -2) {
      label = "BEARISH";
    }

    console.log("\nAI Sentiment Analysis:\n");

    console.log("Score:", result.score);

    console.log("Label:", label);

    console.log("\nUpdating smart contract...\n");

    const tx = await contract.updateSentiment(
      result.score,
      label
    );

    await tx.wait();

    console.log("Contract updated!");

    console.log("TX Hash:", tx.hash);

  } catch (error) {

    console.error(error);

  }

}

analyzeSentiment();