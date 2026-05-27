import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch(
      "https://api.gdeltproject.org/api/v2/doc/doc?query=bitcoin%20OR%20crypto&mode=ArtList&format=json"
    );

    const data = await res.json();

    const news =
      data?.articles?.slice(0, 5).map((a: any) => a.title) || [];

    return NextResponse.json({
      news,
      updatedAt: new Date().toISOString(),
    });
  } catch (e) {
    return NextResponse.json({
      news: [
        "Market data temporarily unavailable",
        "Using fallback system",
      ],
      error: "GDELT fetch failed",
      updatedAt: new Date().toISOString(),
    });
  }
}