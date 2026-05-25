"use client";

import { useEffect, useState } from "react";
import { getContract } from "../lib/contract";

export default function Home() {
  const [wallet, setWallet] = useState("");
  const [score, setScore] = useState("0");
  const [label, setLabel] = useState("loading...");

  async function connectWallet() {
    if (!window.ethereum) {
      alert("Install MetaMask");
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const short =
  accounts[0].slice(0, 6) +
  "..." +
  accounts[0].slice(-4);

setWallet(short);
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
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-2xl p-8 border border-zinc-800 rounded-3xl">

        <h1 className="text-5xl font-bold mb-4">
          Ritual AI Oracle
        </h1>

        <p className="text-zinc-400 mb-8">
          AI-powered sentiment oracle on Ritual testnet
        </p>

        <button
          onClick={connectWallet}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl mb-8"
        >
          {wallet ? "Wallet Connected" : "Connect Wallet"}
        </button>

        <div className="grid grid-cols-2 gap-4">

          <div className="bg-zinc-900 p-6 rounded-2xl">
            <p className="text-zinc-400 mb-2">
              Sentiment
            </p>

            <h2 className="text-3xl font-bold text-green-400">
              {label}
            </h2>
          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl">
            <p className="text-zinc-400 mb-2">
              AI Score
            </p>

            <h2 className="text-3xl font-bold">
              {score}
            </h2>
          </div>

        </div>

      </div>
    </main>
  );
}