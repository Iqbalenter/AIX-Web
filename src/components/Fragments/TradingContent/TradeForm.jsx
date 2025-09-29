// src/components/Fragments/TradingContent/TradeForm.jsx
import { useMemo, useState } from "react";
import { formatNumber } from "../../../lib/binance";

const TAB = { MARKET: "Market", LIMIT: "Limit", SCALED: "Scaled Limit" };
const SIDE = { LONG: "LONG", SHORT: "SHORT" };

export default function TradeForm({ base = "BTC", quote = "USDC", balance = 0 }) {
  const [tab, setTab] = useState(TAB.MARKET);
  const [side, setSide] = useState(SIDE.LONG);
  const [size, setSize] = useState("");     // nilai size
  const [unit, setUnit] = useState(base);   // BTC / USDC
  const [leverage, setLeverage] = useState(5);
  const [marginPct, setMarginPct] = useState(1); // 0.1x..5x UI-imitasi

  const tabClasses = (t) =>
    `px-3 py-1.5 rounded-md text-sm border transition ${
      tab === t ? "bg-zinc-800 border-zinc-700 text-amber-300" : "border-zinc-700 text-zinc-300 hover:bg-zinc-800/60"
    }`;

  const sideBtn = (s) =>
    `w-full py-2 rounded-lg text-sm font-semibold border ${
      side === s
        ? s === SIDE.LONG
          ? "bg-emerald-600/20 border-emerald-600 text-emerald-300"
          : "bg-rose-600/20 border-rose-600 text-rose-300"
        : "border-zinc-700 hover:bg-zinc-800"
    }`;

  const unitBtn = (u) =>
    `px-3 py-1.5 rounded-md text-xs border ${
      unit === u ? "bg-zinc-800 border-zinc-600 text-zinc-100" : "border-zinc-700 text-zinc-400 hover:bg-zinc-800/60"
    }`;

  const estMargin = useMemo(() => {
    // UI-only estimation: amount in quote divided by leverage
    const v = Number(size) || 0;
    return leverage > 0 ? v / leverage : 0;
  }, [size, leverage]);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
      {/* Tabs Market/Limit/Scaled */}
      <div className="flex items-center gap-2 mb-3">
        <button className={tabClasses(TAB.MARKET)} onClick={() => setTab(TAB.MARKET)}>{TAB.MARKET}</button>
        <button className={tabClasses(TAB.LIMIT)} onClick={() => setTab(TAB.LIMIT)}>{TAB.LIMIT}</button>
        <button className={tabClasses(TAB.SCALED)} onClick={() => setTab(TAB.SCALED)}>{TAB.SCALED}</button>
      </div>

      {/* Side LONG/SHORT */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <button className={sideBtn(SIDE.LONG)} onClick={() => setSide(SIDE.LONG)}>LONG</button>
        <button className={sideBtn(SIDE.SHORT)} onClick={() => setSide(SIDE.SHORT)}>SHORT</button>
      </div>

      {/* Size */}
      <label className="block text-xs text-zinc-400 mb-1">Size</label>
      <div className="flex items-center gap-2 mb-3">
        <input
          value={size}
          onChange={(e) => setSize(e.target.value)}
          placeholder="0.0"
          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          inputMode="decimal"
        />
        <div className="flex items-center gap-2">
          <button className={unitBtn(base)} onClick={() => setUnit(base)}>{base}</button>
          <button className={unitBtn(quote)} onClick={() => setUnit(quote)}>{quote}</button>
        </div>
      </div>

      {/* Adjust Margin / Leverage */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
          <span>Adjust Margin</span>
          <div className="flex items-center gap-2">
            <span>By</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-[10px]">
              Leverage
            </span>
          </div>
        </div>

        {/* Slider 0.1x - 5x imitasi */}
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={marginPct}
            onChange={(e) => setMarginPct(Number(e.target.value))}
            className="w-full"
          />
          <div className="w-[64px]">
            <input
              type="number"
              min={1}
              max={125}
              step={1}
              value={leverage}
              onChange={(e) => setLeverage(Number(e.target.value))}
              className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-sm"
            />
          </div>
        </div>
        <div className="mt-1 text-[11px] text-zinc-400">Leverage: <span className="text-zinc-200">{leverage}x</span></div>
      </div>

      {/* Amount (opsional pada Limit/Scaled) */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs text-zinc-400">Amount</label>
          <span className="text-[11px] text-zinc-500">Auto-convert by unit</span>
        </div>
        <input
          placeholder="e.g. 5"
          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      {/* Balance */}
      <div className="text-xs text-zinc-400 mb-3">
        Avail. Balance <span className="text-zinc-200">{quote}</span>
        <div className="text-zinc-200">{formatNumber(balance)} {quote}</div>
        <div className="mt-1 text-[11px] text-zinc-500">
          Est. Margin: <span className="text-zinc-300">{formatNumber(estMargin)}</span> {quote}
        </div>
      </div>

      <button
        className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500/90 hover:bg-amber-500 text-black font-semibold py-2 transition"
        onClick={() => alert("Connect wallet coming soon")}
      >
        <span className="inline-block">⟲</span> Connect Wallet
      </button>
    </div>
  );
}
