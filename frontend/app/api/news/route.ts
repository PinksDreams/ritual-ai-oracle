import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    // пример: замени на свой источник новостей
    const res = await fetch("https://example.com/api/news", {
      cache: "no-store",
    });

    const data = await res.json();

    return NextResponse.json({
      news: data,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({
      news: [],
      error: "Failed to fetch news",
      updatedAt: new Date().toISOString(),
    });
  }
}