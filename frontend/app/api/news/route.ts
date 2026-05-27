import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";

export const dynamic = "force-dynamic";

// 2 RSS + 1 LIVE API
const RSS_FEEDS = [
  "https://www.coindesk.com/arc/outboundfeeds/rss/",
  "https://cointelegraph.com/rss",
];

// GDELT (live global news)
const GDELT_URL =
  "https://api.gdeltproject.org/api/v2/doc/doc?query=crypto%20bitcoin%20OR%20ethereum&mode=ArtList&format=json&maxrecords=10&sort=HybridRel";

// RSS parser
async function fetchRSS(url: string) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "cache-control": "no-cache",
      },
    });

    const xml = await res.text();

    const parser = new XMLParser({ ignoreAttributes: true });
    const data = parser.parse(xml);

    const items = data?.rss?.channel?.item || [];

    return (Array.isArray(items) ? items : [items])
      .slice(0, 5)
      .map((i: any) => i.title)
      .filter(Boolean);
  } catch {
    return [];
  }
}

// GDELT fetch
async function fetchGDELT() {
  try {
    const res = await fetch(GDELT_URL, { cache: "no-store" });
    const data = await res.json();

    const articles = data?.articles || data?.documents || [];

    return articles.slice(0, 5).map((a: any) => a.title).filter(Boolean);
  } catch {
    return [];
  }
}

export async function GET() {
  try {
    const [rssResults, gdeltResults] = await Promise.all([
      Promise.all(RSS_FEEDS.map(fetchRSS)),
      fetchGDELT(),
    ]);

    // merge all sources
    const raw = [...rssResults.flat(), ...gdeltResults];

    // dedupe + shuffle (важно!)
    const unique = Array.from(new Set(raw))
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);

    return NextResponse.json({
      news: unique,
      updatedAt: new Date().toISOString(),
      source: "hybrid-live-engine",
    });
  } catch (e) {
    return NextResponse.json({
      news: ["System fallback active", "No live data"],
      error: "Hybrid engine failed",
      updatedAt: new Date().toISOString(),
    });
  }
}