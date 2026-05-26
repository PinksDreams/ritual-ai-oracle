import Parser from "rss-parser";
import Sentiment from "sentiment";

const parser = new Parser();
const sentiment = new Sentiment();

export async function GET() {
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

    return Response.json({
      success: true,
      score: result.score,
      label,
      headlines,
      items,
    });
  } catch (error: any) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}