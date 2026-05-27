"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadNews = async () => {
    try {
      const res = await fetch("/api/news", {
        cache: "no-store",
      });

      const json = await res.json();

      setData({
        score: 0,
        label: "NEUTRAL",
        headlines: json.news,
      });
    } catch (e) {
      console.error("News fetch failed:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();

    const interval = setInterval(() => {
      loadNews();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 bg-black">
        Summoning Oracle...
      </div>
    );
  }

  const isBullish = data.label === "BULLISH";
  const isBearish = data.label === "BEARISH";

  return (
    <div className="min-h-screen bg-black text-white p-6 relative overflow-hidden">

      {/* LOGO TOP LEFT */}
      <div className="absolute top-6 left-6">
        <img
  src="/logo.png"
  alt="Ritual Logo"
  className="w-24 h-24 object-contain
  drop-shadow-[0_0_25px_rgba(168,85,247,0.9)]
  drop-shadow-[0_0_60px_rgba(236,72,153,0.4)]
  hover:scale-105 transition duration-300
  filter"
/>
      </div>

      {/* MAIN CARD */}
      <div className="flex items-center justify-center min-h-screen">

        <div className="w-full max-w-2xl rounded-3xl border border-purple-500/20 bg-white/5 backdrop-blur-2xl p-8 shadow-2xl">

          {/* TITLE */}
          <h1 className="text-center text-4xl font-extrabold tracking-widest mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 drop-shadow-[0_0_25px_rgba(168,85,247,0.6)]">
              Ritual AI Oracle
            </span>
          </h1>

          {/* SENTIMENT */}
          <div className="grid grid-cols-2 gap-4 mb-8">

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-gray-400 text-sm">Score</p>
              <p className="text-2xl font-bold">{data.score}</p>
            </div>

            <div
              className={`p-4 rounded-xl border text-center transition ${
                isBullish
                  ? "bg-green-500/10 border-green-500/30 text-green-300"
                  : isBearish
                  ? "bg-red-500/10 border-red-500/30 text-red-300"
                  : "bg-gray-500/10 border-gray-500/30 text-gray-300"
              }`}
            >
              <p className="text-sm text-gray-400">Signal</p>
              <p className="text-xl font-bold">{data.label}</p>
            </div>

          </div>

          {/* HEADLINES */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-300">
              Market News
            </h2>

            <div className="space-y-3">
              {(data.headlines ?? []).map((h: string, i: number) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition"
                >
                  • {h}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}