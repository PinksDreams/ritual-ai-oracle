const Parser = require("rss-parser");
const Sentiment = require("sentiment");

const parser = new Parser();
const sentiment = new Sentiment();

async function analyzeSentiment() {

  try {

    const feed = await parser.parseURL(
      "https://www.coindesk.com/arc/outboundfeeds/rss/"
    );

    const headlines = feed.items
      .slice(0, 5)
      .map(item => item.title)
      .join(" ");

    console.log("\nLatest Headlines:\n");

    console.log(headlines);

    const result = sentiment.analyze(headlines);

    let label = "neutral";

    if (result.score > 2) {
      label = "bullish";
    }

    if (result.score < -2) {
      label = "bearish";
    }

    console.log("\nAI Sentiment Analysis:\n");

    console.log("Score:", result.score);

    console.log("Label:", label);

  } catch (error) {

    console.error(error);

  }

}

analyzeSentiment();