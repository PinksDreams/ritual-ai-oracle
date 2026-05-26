const Parser = require("rss-parser");
const Sentiment = require("sentiment");

const parser = new Parser();
const sentiment = new Sentiment();

module.exports = async (req, res) => {
  try {
    const feed = await parser.parseURL(
      "https://www.coindesk.com/arc/outboundfeeds/rss/"
    );

    const items = feed.items.slice(0, 5);

    const headlines = items.map((item) => item.title).join(" ");

    const result = sentiment.analyze(headlines);

    let label = "NEUTRAL";

    if (result.score > 0) {
      label = "BULLISH";
    } else if (result.score < 0) {
      label = "BEARISH";
    }

    res.status(200).json({
      success: true,
      score: result.score,
      label,
      headlines,
      items,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};