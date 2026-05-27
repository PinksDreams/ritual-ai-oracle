import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const url =
      "https://api.gdeltproject.org/api/v2/doc/doc?query=bitcoin%20crypto&mode=ArtList&format=json&maxrecords=5&sort=HybridRel";

    const res = await fetch(url);

    const data = await res.json();

    // GDELT returns "articles" OR "documents" depending on response
    const articles = data?.articles || data?.documents || [];

    const news = articles
      .slice(0, 5)
      .map((a: any) => a.title || a.seendate || "Untitled news");

    return NextResponse.json({
      news,
      updatedAt: new Date().toISOString(),
    });
  } catch (e) {
    return NextResponse.json({
      news: [
        "Market data temporarily unavailable",
        "Fallback system active",
      ],
      error: "GDELT fetch failed",
      updatedAt: new Date().toISOString(),
    });
  }
}