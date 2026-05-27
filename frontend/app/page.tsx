"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/oracle")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Summoning Oracle...
      </div>
    );
  }

  const isBullish = data.label === "BULLISH";
  const isBearish = data.label === "BEARISH";

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8 shadow-2xl">

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-6 text-center">
          🧠 Ritual AI Oracle
        </h1>

        {/* SENTIMENT CARD */}
        <div className="grid grid-cols-2 gap-4 mb-8">

          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-gray-400 text-sm">Score</p>
            <p className="text-2xl font-bold">{data.score}</p>
          </div>

          <div className={`p-4 rounded-xl border text-center ${
            isBullish
              ? "bg-green-500/10 border-green-500/30 text-green-300"
              : isBearish
              ? "bg-red-500/10 border-red-500/30 text-red-300"
              : "bg-gray-500/10 border-gray-500/30 text-gray-300"
          }`}>
            <p className="text-sm text-gray-400">Signal</p>
            <p className="text-xl font-bold">{data.label}</p>
          </div>

        </div>

        {/* HEADLINES */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-300">
            Market Signals
          </h2>

          <div className="space-y-3">
            {data.headlines?.map((h: string, i: number) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-white/5 border border-white/10 text-sm leading-relaxed hover:bg-white/10 transition"
              >
                • {h}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}