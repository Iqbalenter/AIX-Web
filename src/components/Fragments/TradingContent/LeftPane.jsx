// src/components/Fragments/TradingContent/LeftPane.jsx
import { useEffect, useState } from "react";
import CoinChart from "./CoinChart";            // gunakan versi v5 Anda
import OrderBook from "./OrderBook";            // sudah ada di project Anda
import { getPremiumIndex } from "../../../lib/binance";

const TABS = ["Price", "Depth", "Funding"];

export default function LeftPane({ symbol }) {
  const [tab, setTab] = useState("Price");
  const [funding, setFunding] = useState(null);

  useEffect(() => {
    let active = true;
    async function loadFunding() {
      try {
        const p = await getPremiumIndex(symbol);
        if (!active) return;
        if (p.ok) {
          setFunding({
            rate8h: p.lastFundingRate,
            nextTime: p.nextFundingTime,
          });
        } else {
          setFunding(null);
        }
      } catch { setFunding(null); }
    }
    loadFunding();
    const id = setInterval(loadFunding, 60_000);
    return () => { active = false; clearInterval(id); };
  }, [symbol]);

  const btn = (name) =>
    `px-3 py-1.5 rounded-md text-sm border ${
      tab === name ? "bg-zinc-800 border-zinc-700 text-amber-300" : "border-zinc-700 text-zinc-300 hover:bg-zinc-800/60"
    }`;

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
      {/* tabs */}
      <div className="flex items-center gap-2 mb-3">
        {TABS.map((t) => (
          <button key={t} className={btn(t)} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      {/* content */}
      {tab === "Price" && <CoinChart symbol={symbol} height={420} />}
      {tab === "Depth" && <OrderBook symbol={symbol} />} {/* gunakan OrderBook Anda sebagai "depth" sederhana */}
      {tab === "Funding" && (
        <div className="text-sm text-zinc-300">
          {funding ? (
            <div className="space-y-2">
              <div>Est. Funding (8h) : <span className="font-semibold">{(funding.rate8h * 100).toFixed(4)}%</span></div>
              <div>Next Funding    : <span className="font-semibold">{new Date(funding.nextTime).toLocaleString()}</span></div>
              <div className="text-[12px] text-zinc-400 mt-2">Sumber: Binance Futures premiumIndex</div>
            </div>
          ) : (
            <div className="text-zinc-400">Funding tidak tersedia untuk pair ini.</div>
          )}
        </div>
      )}
    </div>
  );
}
