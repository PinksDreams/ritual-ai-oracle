require("dotenv").config();

const Parser = require("rss-parser");
const Sentiment = require("sentiment");

const parser = new Parser();
const sentiment = new Sentiment();

let lastScore = null;
let lastLabel = null;

async function getOracleData() {
  const feed = await parser.parseURL(
    "https://www.coindesk.com/arc/outboundfeeds/rss/"
  );

  const latestItems = feed.items.slice(0, 5);

  const headlines = latestItems.map(i => i.title).join(" ");

  const result = sentiment.analyze(headlines);

  let label = "NEUTRAL";
  if (result.score > 2) label = "BULLISH";
  if (result.score < -2) label = "BEARISH";

  const changed = result.score !== lastScore || label !== lastLabel;

  lastScore = result.score;
  lastLabel = label;

  return {
    success: true,
    score: result.score,
    label,
    headlines,
    items: latestItems,
    changed
  };
}

module.exports = { getOracleData };