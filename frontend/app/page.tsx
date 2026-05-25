"use client";

import { useEffect, useState } from "react";
import { getContract } from "../lib/contract";

export default function Home() {

  const [wallet, setWallet] = useState("");
  const [score, setScore] = useState("0");
  const [label, setLabel] = useState("loading...");
  const [updated, setUpdated] = useState("");
  const [news, setNews] = useState<any[]>([]);

  async function connectWallet() {

    try {

      if (!(window as any).ethereum) {
        alert("Install MetaMask");
        return;
      }

      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });

      const shortAddress =
        accounts[0].slice(0, 6) +
        "..." +
        accounts[0].slice(-4);

      setWallet(shortAddress);

    } catch (err) {

      console.error(err);

    }

  }

  async function loadContractData() {

    try {

      const contract = await getContract();

      const sentimentScore =
        await contract.sentimentScore();

      const sentimentLabel =
        await contract.sentimentLabel();

      const timestamp =
        await contract.lastUpdated();

      const date = new Date(
        Number(timestamp) * 1000
      );

      setScore(sentimentScore.toString());

      setLabel(sentimentLabel);

      setUpdated(date.toLocaleString());

      const response = await fetch("/news.json");

      const data = await response.json();

      setNews(data);

    } catch (err) {

      console.error(err);

    }

  }

  useEffect(() => {

    loadContractData();

    const interval = setInterval(() => {
      loadContractData();
    }, 15000);

    return () => clearInterval(interval);

  }, []);

  return (

    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">

      <div className="w-full max-w-4xl border border-zinc-800 rounded-3xl p-8 bg-black shadow-2xl">

        <div className="flex items-center justify-between mb-8">

          <div>

            <h1 className="text-5xl font-bold mb-2">
              Ritual AI Oracle
            </h1>

            <p className="text-zinc-400">
              Autonomous AI sentiment oracle
            </p>

          </div>

          <button
            onClick={connectWallet}
            className="bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:opacity-90 transition px-6 py-3 rounded-xl border border-cyan-400"
          >
            {wallet ? wallet : "Connect Wallet"}
          </button>

        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">

          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">

            <p className="text-zinc-400 mb-2">
              Sentiment
            </p>

            <h2 className="text-4xl font-bold text-green-400">
              {label}
            </h2>

          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">

            <p className="text-zinc-400 mb-2">
              AI Score
            </p>

            <h2 className="text-4xl font-bold">
              {score}
            </h2>

          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">

            <p className="text-zinc-400 mb-2">
              Last Updated
            </p>

            <h2 className="text-lg font-bold">
              {updated}
            </h2>

          </div>

        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">

          <p className="text-zinc-400 mb-4">
            Latest Headlines
          </p>

          <ul className="space-y-3 text-zinc-200">

            {news.map((item, index) => (

              <li key={index}>
                • {item.title}
              </li>

            ))}

          </ul>

        </div>

      </div>

    </main>

  );

}