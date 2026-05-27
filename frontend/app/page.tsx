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
      <div className="text-center mt-20 text-gray-400">
        Summoning Oracle...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-xl">
        
        <h1 className="text-2xl font-bold mb-4">
          🧠 Ritual AI Oracle
        </h1>

        <div className="mb-4">
          <p className="text-sm text-gray-400">Sentiment</p>
          <p className="text-xl font-semibold">
            Score: {data.score}
          </p>
          <p className="text-sm uppercase tracking-wider">
            Label: {data.label}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-400 mb-2">Headlines</p>
          <ul className="space-y-2 text-sm">
            {data.headlines?.map((h: string, i: number) => (
              <li key={i} className="text-gray-200">
                • {h}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}