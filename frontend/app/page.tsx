"use client";

import { useEffect, useState } from "react";

type OracleData = {
  success: boolean;
  score: number;
  label: string;
  headlines: string;
};

export default function Home() {
  const [data, setData] = useState<OracleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadOracle() {
    try {
      setError(null);

      const res = await fetch("/api/oracle"); 
      if (!res.ok) throw new Error("API error");

      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
      setError("Failed to load oracle");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOracle();

    const interval = setInterval(loadOracle, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Loading Oracle...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!data) return <div>No data</div>;

  return (
    <div style={{ padding: 24, fontFamily: "Arial" }}>
      <h1>🧠 Ritual AI Oracle</h1>

      <div style={{ marginTop: 20 }}>
        <h2>Sentiment</h2>
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
      </div>

      <div style={{ marginTop: 20 }}>
        <h2>Headlines</h2>
        <pre style={{ whiteSpace: "pre-wrap" }}>
          {data.headlines}
        </pre>
      </div>
    </div>
  );
}