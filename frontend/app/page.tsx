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

      {/* LOGO */}
      <div className="absolute top-6 left-6">
        <img
          src="/logo.png"
          alt="Logo"
          className="w-32 h-32 object-contain"
        />
      </div>

      {/* MAIN CARD */}
      <div className="flex items-center justify-center min-h-screen">

        <div className="w-full max-w-4xl rounded-3xl border border-purple-500/20 bg-white/5 backdrop-blur-2xl p-8 shadow-2xl">

          {/* HEADER */}
          <div className="flex items-start justify-between mb-8">

            <h1 className="text-5xl font-extrabold tracking-widest">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 drop-shadow-[0_0_25px_rgba(168,85,247,0.6)]">
                AI Oracle
              </span>
            </h1>

            <div className="flex flex-col items-center">

              <a
                href="https://pinksdreams.github.io/ritualtetris/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl border border-purple-400/40
                text-transparent bg-clip-text bg-gradient-to-r
                from-purple-400 via-pink-400 to-purple-300
                font-bold tracking-wider hover:scale-105
                transition"
              >
                PLAY GAME
              </a>

              <img
                src="/tetris.png"
                alt="Ritual Tetris"
                className="w-40 mt-4 rounded-xl border border-purple-500/20 shadow-lg"
              />

            </div>

          </div>

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

          {/* NEWS */}
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