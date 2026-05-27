import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const FEEDS = [
  "https://www.coindesk.com/arc/outboundfeeds/rss/",
  "https://cointelegraph.com/rss",
  "https://bitcoinmagazine.com/.rss/full/",
];

async function fetchFeed(url: string) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      "cache-control": "no-cache",
    },
  });

  const text = await res.text();

  // более точный extraction (берём item blocks)
  const items = text
    .split("<item>")
    .slice(1)
    .map((block) => {
      const match = block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/);
      return match?.[1] || match?.[2];
    })
    .filter(Boolean);

  return items.slice(0, 5);
}

export async function GET() {
  try {
    const results = await Promise.all(FEEDS.map(fetchFeed));

    const news = Array.from(new Set(results.flat())).slice(0, 5);

    return NextResponse.json({
      news,
      updatedAt: new Date().toISOString(),
      source: "rss-fixed-v2",
    });
  } catch (e) {
    return NextResponse.json({
      news: ["Fallback active", "RSS parsing failed"],
      error: "RSS parse error",
    });
  }
}