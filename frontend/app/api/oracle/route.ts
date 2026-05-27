import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const mockHeadlines = [
    "Bitcoin volatility increases as traders await Fed signals",
    "AI-driven hedge funds outperform traditional markets",
    "Crypto sentiment shifts after ETF inflows surge",
  ];

  const score =
    Math.floor(Math.random() * 5) - 2; // -2 ... +2

  const label =
    score > 0 ? "BULLISH" : score < 0 ? "BEARISH" : "NEUTRAL";

  return NextResponse.json({
    score,
    label,
    headlines: mockHeadlines,
    updatedAt: new Date().toISOString(),
  });
}