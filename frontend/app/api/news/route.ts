import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const url =
      "https://api.gdeltproject.org/api/v2/doc/doc?query=crypto&mode=ArtList&format=json&maxrecords=10&sort=HybridRel";

    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();

    const articles =
      data?.articles ||
      data?.documents ||
      data?.result ||
      [];

    const news = articles
      .slice(0, 5)
      .map((a: any) =>
        a.title ||
        a?.documentTitle ||
        a?.seendate ||
        "Untitled market news"
      )
      .filter(Boolean);

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