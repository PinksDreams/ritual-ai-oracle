import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";

export const dynamic = "force-dynamic";

const RSS_FEEDS = [
  "https://www.coindesk.com/arc/outboundfeeds/rss/",
  "https://cointelegraph.com/rss",
  "https://bitcoinmagazine.com/.rss/full/",
];

async function fetchRSS(url: string) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  });

  const xml = await res.text();

  const parser = new XMLParser({
    ignoreAttributes: true,
  });

  const data = parser.parse(xml);

  const items =
    data?.rss?.channel?.item ||
    data?.feed?.entry ||
    [];

  const normalized = (Array.isArray(items) ? items : [items])
    .slice(0, 5)
    .map((item: any) => item.title)
    .filter(Boolean);

  return normalized;
}

export async function GET() {
  try {
    const results = await Promise.all(
      RSS_FEEDS.map(fetchRSS)
    );

    const news = results
      .flat()
      .slice(0, 5);

    return NextResponse.json({
      news,
      updatedAt: new Date().toISOString(),
      source: "rss-production",
    });
  } catch (e) {
    return NextResponse.json({
      news: [
        "Market data temporarily unavailable",
        "RSS system fallback active",
      ],
      error: "RSS fetch failed",
      updatedAt: new Date().toISOString(),
    });
  }
}