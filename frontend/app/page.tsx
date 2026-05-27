"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/oracle")
      .then((res) => res.json())
      .then(setData)
      .catch(() => setData(null));
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Summoning Oracle...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
      
      <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">

        <h1 className="text-2xl font-bold mb-6">
          🧠 Ritual AI Oracle
        </h1>

        {/* SENTIMENT */}
        <div className="mb-6">
          <p className="text-sm text-gray-400">Sentiment</p>

          <p className="text-xl font-semibold">
            Score: {data.score ?? "N/A"}
          </p>

          <p className="text-sm uppercase tracking-wider">
            Label: {data.label ?? "UNKNOWN"}
          </p>
        </div>

        {/* HEADLINES — ВОТ ТВОЙ FIX */}
        <div>
          <p className="text-sm text-gray-400 mb-2">Headlines</p>

          <ul className="space-y-2 text-sm text-gray-200">
            {Array.isArray(data.headlines) ? (
              data.headlines.map((h: string, i: number) => (
                <li key={i}>• {h}</li>
              ))
            ) : (
              <li>• No headlines available</li>
            )}
          </ul>
        </div>

      </div>
    </div>
  );
}