"use client";

import { useEffect, useState } from "react";

type OracleData = {
  success: boolean;
  score: number;
  label: string;
  headlines: string;
};

const API_URL =
  "https://psychic-garbanzo-9695q6j6r5v7hxjw7-4000.app.github.dev/api/oracle";

export default function Home() {
  const [data, setData] = useState<OracleData | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadOracle() {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOracle();

    const interval = setInterval(() => {
      loadOracle();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Loading Oracle...</div>;
  if (!data) return <div>No data</div>;

  return (
    <div style={{ padding: 24, fontFamily: "Arial" }}>
      <h1>🧠 Ritual AI Oracle</h1>

      <p>Score: {data.score}</p>

      <p>
        Label:{" "}
        <b
          style={{
            color:
              data.label === "BULLISH"
                ? "green"
                : data.label === "BEARISH"
                ? "red"
                : "gray",
          }}
        >
          {data.label}
        </b>
      </p>

      <h3>Headlines</h3>
      <pre style={{ whiteSpace: "pre-wrap" }}>
        {data.headlines}
      </pre>
    </div>
  );
}