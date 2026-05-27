import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch("https://example.com/api/news", {
      cache: "no-store",
    });

    const news = await res.json();

    return NextResponse.json({
      news,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({
      news: [],
      error: "Failed to fetch news",
    });
  }
}