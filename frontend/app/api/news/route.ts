import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    test: "LIVE API WORKS",
    time: Date.now(),
  });
}