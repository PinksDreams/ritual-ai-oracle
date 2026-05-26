import { NextResponse } from "next/server";

let cachedNews: any[] = [];

export async function GET() {
  return NextResponse.json({
    news: cachedNews,
    updatedAt: new Date().toISOString(),
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  cachedNews = body.news || [];

  return NextResponse.json({
    ok: true,
    count: cachedNews.length,
  });
}