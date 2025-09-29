// src/components/Fragments/TradingContent/SymbolPicker.jsx
import { useEffect, useMemo, useState } from "react";
import { getBase, getIconUrl, formatCurrency, formatNumber, get24h } from "../../../lib/binance";


/**
 * Dialog pencari simbol dari Binance 24h ticker (spot).
 * Props:
 * - open: boolean
 * - onClose(): void
 * - onSelect(symbol: string): void   // contoh "BTCUSDT"
 */
export default function SymbolPicker({ open, onClose, onSelect }) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [list, setList] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!open) return;
    let active = true;

    async function load() {
      try {
        setErr(""); setLoading(true);
        
        // Gunakan get24h() yang sama seperti ListCoin.jsx
        const data = await get24h(); // tanpa symbol = ambil semua
        if (!active) return;

        const items = data
          .filter((t) => /USDT$/.test(t.symbol))
          .filter((t) => !/(UP|DOWN|BULL|BEAR)USDT$/.test(t.symbol))
          .map((t) => ({
            symbol: t.symbol,                    // BTCUSDT
            base: getBase(t.symbol),             // BTC
            pair: t.symbol.replace("USDT", "/USDT"),
            price: Number(t.lastPrice),
            volume24h: Number(t.quoteVolume || t.volume || 0),
            change24h: Number(t.priceChangePercent),
          }))
          .sort((a, b) => b.volume24h - a.volume24h); // urut top volume

        setList(items);
        console.log('SymbolPicker - Loaded coins:', items.length);
      } catch (e) {
        console.error('SymbolPicker API Error:', e);
        setErr("Gagal memuat daftar koin. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => { active = false; };
  }, [open]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return list.slice(0, 200); // batasi agar cepat
    return list.filter(
      (c) =>
        c.symbol.toLowerCase().includes(s) ||
        c.base.toLowerCase().includes(s) ||
        c.pair.toLowerCase().includes(s)
    );
  }, [list, q]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      {/* panel */}
      <div className="absolute left-1/2 top-20 -translate-x-1/2 w-[min(920px,92vw)] rounded-2xl border border-zinc-800 bg-zinc-950 p-4 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Select Market</h3>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg border border-zinc-700 text-sm hover:bg-zinc-800"
          >
            Close
          </button>
        </div>

        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search symbol, e.g. BTC, ETH, SOL…"
          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 mb-3"
        />

        {loading ? (
          <div className="text-sm text-zinc-400 px-2 py-8">Loading markets…</div>
        ) : err ? (
          <div className="text-sm text-rose-300 px-2 py-8">{err}</div>
        ) : filtered.length === 0 ? (
          <div className="text-sm text-zinc-400 px-2 py-8">No results.</div>
        ) : (
          <div className="max-h-[60vh] overflow-auto rounded-xl border border-zinc-800">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-zinc-900/80 backdrop-blur">
                <tr className="text-left">
                  <th className="px-4 py-2 font-medium">Pair</th>
                  <th className="px-4 py-2 font-medium">Price</th>
                  <th className="px-4 py-2 font-medium">24h Volume (USDT)</th>
                  <th className="px-4 py-2 font-medium">24h</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => {
                  const pos = c.change24h >= 0;
                  return (
                    <tr
                      key={c.symbol}
                      className="border-t border-zinc-800 hover:bg-zinc-900/60 cursor-pointer"
                      onClick={() => { onSelect?.(c.symbol); onClose?.(); }}
                    >
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-3">
                          <img
                            src={getIconUrl(c.symbol)}
                            alt={`${c.base} icon`}
                            className="w-6 h-6 rounded-full bg-zinc-800 ring-1 ring-zinc-700 object-contain"
                            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = getIconUrl("generic"); }}
                          />
                          <div className="flex flex-col leading-tight">
                            <span className="font-medium">{c.pair}</span>
                            <span className="text-[11px] text-zinc-500">{c.base}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2">{formatCurrency(c.price)}</td>
                      <td className="px-4 py-2">{formatNumber(c.volume24h)}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded-md text-xs ${pos ? "bg-emerald-600/20 text-emerald-300" : "bg-rose-600/20 text-rose-300"}`}>
                          {pos ? "+" : ""}{c.change24h.toFixed(2)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
