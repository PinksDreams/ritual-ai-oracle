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
    <div className="min-h-screen bg-black text-white">

      {/* NAVBAR */}
      <div className="fixed top-0 left-0 w-full z-50">
        <div className="mx-auto max-w-6xl mt-4 px-6">
          <div className="flex items-center justify-between
            rounded-2xl border border-white/10
            bg-white/5 backdrop-blur-xl
            px-6 py-3 shadow-lg">

            {/* LOGO */}
            <img
              src="/logo.png"
              alt="Logo"
              className="w-10 h-10 object-contain"
            />

            {/* TITLE */}
            <h1 className="text-xl font-bold tracking-widest">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]">
                AI Oracle
              </span>
            </h1>

            <div className="w-10" />

          </div>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="pt-28 flex justify-center p-6">

        <div className="w-full max-w-6xl grid grid-cols-3 gap-6">

          {/* LEFT: ORACLE */}
          <div className="col-span-2 rounded-3xl border border-purple-500/20 bg-white/5 backdrop-blur-2xl p-8 shadow-2xl">

            {/* SCORE */}
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

          {/* RIGHT: GAME CARD */}
          <div className="rounded-3xl border border-purple-500/20 bg-white/5 backdrop-blur-2xl p-6 shadow-2xl flex flex-col items-center">

            <h2 className="text-lg font-semibold mb-4 text-gray-300">
              Play Ritual Game
            </h2>

            <a
              href="https://pinksdreams.github.io/ritualtetris/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center mb-4 px-4 py-3 rounded-xl border border-purple-400/40
              text-transparent bg-clip-text bg-gradient-to-r
              from-purple-400 via-pink-400 to-purple-300
              font-bold hover:scale-105 transition"
            >
              OPEN GAME
            </a>

            <img
              src="/tetris.png"
              alt="Tetris Preview"
              className="w-full rounded-xl border border-purple-500/20 shadow-lg hover:scale-[1.02] transition"
            />

          </div>

        </div>
      </div>
    </div>
  );
}