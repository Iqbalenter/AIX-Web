// src/components/Fragments/TradingContent/TradingHeader.jsx
import { useEffect, useState } from "react";
import { get24h, getPremiumIndex, getBase, getIconUrl, formatCurrency, formatNumber } from "../../../lib/binance";
import SymbolPicker from "./SymbolPicker";

export default function TradingHeader({ symbol, onSelectSymbol }) {
  const [info, setInfo] = useState(null);
  const [mark, setMark] = useState(null);
  const [openPicker, setOpenPicker] = useState(false);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        // 24h spot
        const data = await get24h(symbol);
        const d = Array.isArray(data) ? data[0] : data;
        if (!active) return;

        const last = Number(d.lastPrice);
        const volQ = Number(d.quoteVolume);
        const changePct = Number(d.priceChangePercent);

        setInfo({ lastPrice: last, vol24h: volQ, changePct });

        // mark/funding
        const prem = await getPremiumIndex(symbol);
        if (!active) return;
        if (prem.ok) {
          setMark({
            markPrice: prem.markPrice,
            fundingRate: prem.lastFundingRate,
            nextFundingTime: prem.nextFundingTime,
            source: "Futures",
          });
        } else {
          setMark({ markPrice: last, fundingRate: null, nextFundingTime: null, source: "Spot (fallback)" });
        }
      } catch (e) {
        console.error('TradingHeader API Error:', e);
        // Set default values untuk mencegah crash
        if (active) {
          setInfo({ lastPrice: 0, vol24h: 0, changePct: 0 });
        }
      }
    }

    load();
    const id = setInterval(load, 15000);
    return () => { active = false; clearInterval(id); };
  }, [symbol]);

  const base = getBase(symbol);
  const icon = getIconUrl(symbol);
  const pos = (info?.changePct ?? 0) >= 0;

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
        {/* Kiri: klik untuk ganti koin */}
        <button
          type="button"
          onClick={() => setOpenPicker(true)}
          className="group flex items-center gap-2 sm:gap-3 rounded-lg px-2 py-1 -ml-2 hover:bg-zinc-900/60 transition"
          title="Click to change market"
        >
          <img
            src={icon}
            alt={`${base} icon`}
            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-zinc-800 ring-1 ring-zinc-700 object-contain flex-shrink-0"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `${icon.replace(/\/[^/]+$/, "/generic.svg")}`; }}
          />
          <div className="text-left min-w-0">
            <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-semibold">{base}/USDT</h2>
              <span className="text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-600/30">PERP</span>
              <span className="text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-600/30">USDT</span>
              <span className="ml-1 sm:ml-2 text-[10px] sm:text-[11px] text-zinc-400 opacity-0 group-hover:opacity-100 transition hidden sm:inline">Change ↴</span>
            </div>
            <div className="text-[10px] sm:text-xs text-zinc-400">Spot · Binance</div>
          </div>
        </button>

        {/* Kanan: metrik */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:flex lg:items-center gap-3 sm:gap-4 lg:gap-6 xl:gap-8 text-left lg:text-right">
          <div className="min-w-0">
            <div className="text-[10px] sm:text-xs text-zinc-400">Price</div>
            <div className="text-sm sm:text-base font-semibold truncate">{info ? formatCurrency(info.lastPrice) : "—"}</div>
          </div>
          <div className="min-w-0 hidden sm:block">
            <div className="text-[10px] sm:text-xs text-zinc-400">
              Mark Price 
              <span className="text-[9px] sm:text-[10px] text-zinc-500 ml-1">({mark?.source || "-"})</span>
            </div>
            <div className="text-sm sm:text-base font-semibold truncate">{mark ? formatCurrency(mark.markPrice) : "—"}</div>
          </div>
          <div className="min-w-0">
            <div className="text-[10px] sm:text-xs text-zinc-400">24h Volume</div>
            <div className="text-sm sm:text-base font-semibold truncate">{info ? formatNumber(info.vol24h) : "—"}</div>
          </div>
          <div className="min-w-0">
            <div className="text-[10px] sm:text-xs text-zinc-400">24h Change</div>
            <div className={`text-sm sm:text-base font-semibold truncate ${pos ? "text-emerald-400" : "text-rose-400"}`}>
              {info ? `${pos ? "+" : ""}${info.changePct.toFixed(2)}%` : "—"}
            </div>
          </div>
        </div>
      </div>

      {/* Dialog Picker */}
      <SymbolPicker
        open={openPicker}
        onClose={() => setOpenPicker(false)}
        onSelect={(sym) => onSelectSymbol?.(sym)}
      />
    </>
  );
}
