// src/components/OrderBook.jsx
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

function num(n) { return Number(n); }
function fmt(n) {
  if (n === null || n === undefined || isNaN(n)) return "—";
  const x = Number(n);
  if (Math.abs(x) >= 1_000_000) return (x / 1_000_000).toFixed(2) + "M";
  if (Math.abs(x) >= 1_000) return (x / 1_000).toFixed(2) + "K";
  return x.toLocaleString(undefined, { maximumFractionDigits: 6 });
}

export default function OrderBook({ symbol }) {
  const [bids, setBids] = useState([]);
  const [asks, setAsks] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setErr("");
        const url = "https://api.binance.com/api/v3/depth";
        const { data } = await axios.get(url, {
          params: { symbol, limit: 20 },
          timeout: 15000,
        });
        if (!active) return;

        setBids(data.bids.map(([price, size]) => ({ price: num(price), size: num(size) })));
        setAsks(data.asks.map(([price, size]) => ({ price: num(price), size: num(size) })));
      } catch (e) {
        console.error(e);
        setErr("Gagal memuat order book.");
      }
    }
    load();
    const id = setInterval(load, 5000);
    return () => { active = false; clearInterval(id); };
  }, [symbol]);

  const asksWithSum = useMemo(() => {
    let sum = 0;
    return asks
      .slice()
      .sort((a, b) => a.price - b.price) // dari bawah ke atas
      .map((r) => { sum += r.size; return { ...r, sum }; });
  }, [asks]);

  const bidsWithSum = useMemo(() => {
    let sum = 0;
    return bids
      .slice()
      .sort((a, b) => b.price - a.price) // dari atas ke bawah
      .map((r) => { sum += r.size; return { ...r, sum }; });
  }, [bids]);

  return (
    <div className="w-full lg:w-80 xl:w-96 border border-slate-800 rounded-xl p-3 bg-slate-900/60">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-slate-200">Order Book</h3>
        <span className="text-xs text-slate-400">0.1%</span>
      </div>

      {err && <div className="text-xs text-red-300 mb-2">{err}</div>}

      <div className="text-xs grid grid-cols-3 gap-1 text-slate-400 mb-1">
        <span>Price</span><span className="text-right">Size</span><span className="text-right">Sum</span>
      </div>

      {/* ASKS */}
      <div className="space-y-1 mb-2">
        {asksWithSum.slice(-10).map((r, i) => (
          <div
            key={`a-${i}-${r.price}`}
            className="text-xs grid grid-cols-3 gap-1"
          >
            <span className="text-red-400">{r.price.toLocaleString()}</span>
            <span className="text-right text-slate-300">{fmt(r.size)}</span>
            <span className="text-right text-slate-500">{fmt(r.sum)}</span>
          </div>
        ))}
      </div>

      {/* Best price separator */}
      <div className="border-t border-slate-700 my-2" />

      {/* BIDS */}
      <div className="space-y-1">
        {bidsWithSum.slice(0, 10).map((r, i) => (
          <div
            key={`b-${i}-${r.price}`}
            className="text-xs grid grid-cols-3 gap-1"
          >
            <span className="text-green-400">{r.price.toLocaleString()}</span>
            <span className="text-right text-slate-300">{fmt(r.size)}</span>
            <span className="text-right text-slate-500">{fmt(r.sum)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
