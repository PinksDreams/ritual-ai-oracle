"use client";

import { useEffect, useState } from "react";
import { getContract } from "../lib/contract";

export default function Home() {
  const [wallet, setWallet] = useState("");
  const [score, setScore] = useState("0");
  const [label, setLabel] = useState("loading...");

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

      const sentimentScore = await contract.sentimentScore();
      const sentimentLabel = await contract.sentimentLabel();

      setScore(sentimentScore.toString());
      setLabel(sentimentLabel);

    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadContractData();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-3xl border border-zinc-800 rounded-3xl p-8 bg-black">

        <h1 className="text-5xl font-bold mb-4">
          Ritual AI Oracle
        </h1>

        <p className="text-zinc-400 mb-8">
          AI-powered sentiment oracle on Ritual testnet
        </p>

        <button
          onClick={connectWallet}
          className="bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:opacity-90 transition px-6 py-3 rounded-xl mb-8 border border-cyan-400"
        >
          {wallet ? wallet : "Connect Wallet"}
        </button>

        <div className="grid grid-cols-2 gap-4 mb-6">

          <div className="bg-zinc-900 p-6 rounded-2xl">
            <p className="text-zinc-400 mb-2">
              Sentiment
            </p>

            <h2 className="text-4xl font-bold text-green-400">
              {label}
            </h2>
          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl">
            <p className="text-zinc-400 mb-2">
              AI Score
            </p>

            <h2 className="text-4xl font-bold">
              {score}
            </h2>
          </div>

        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl">
          <p className="text-zinc-400 mb-4">
            Latest Headlines
          </p>

          <ul className="space-y-3 text-zinc-200">
            <li>
              • Bitcoin breaks above resistance levels
            </li>

            <li>
              • Ethereum ETF inflows continue rising
            </li>

            <li>
              • AI trading activity increases across markets
            </li>
          </ul>
        </div>

      </div>
    </main>
  );
}