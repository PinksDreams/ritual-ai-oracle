import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const news = [
    "Bitcoin volatility increases as traders await macro data",
    "AI trading systems dominate short-term momentum",
    "Crypto market reacts to ETF inflows and liquidity shifts",
    "Federal Reserve signals impact risk assets",
  ];

  return NextResponse.json({
    news,
    updatedAt: new Date().toISOString(),
  });
}