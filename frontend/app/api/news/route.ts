import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const fallbackNews = [
  "Bitcoin volatility increases amid macro uncertainty",
  "AI trading systems reshape market liquidity",
  "ETF inflows continue influencing crypto sentiment",
  "Global markets react to interest rate expectations",
  "Institutional investors increase crypto exposure",
];

export async function GET() {
  try {
    // временно НЕ используем GDELT (он ломается у тебя сейчас)
    return NextResponse.json({
      news: fallbackNews,
      updatedAt: new Date().toISOString(),
      source: "fallback-stable",
    });
  } catch (e) {
    return NextResponse.json({
      news: fallbackNews,
      error: "hard fallback active",
      updatedAt: new Date().toISOString(),
    });
  }
}