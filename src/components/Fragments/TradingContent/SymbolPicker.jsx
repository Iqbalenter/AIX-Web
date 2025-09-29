// src/components/Fragments/TradingContent/SymbolPicker.jsx
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { getBase, getIconUrl, formatCurrency, formatNumber } from "../../../lib/binance";

// Helper untuk proxy (sama seperti di binance.js)
const USE_PROXY = typeof window !== 'undefined' && window.location.hostname !== 'localhost';
const PROXY_BASE = '/api/proxy';

function getApiUrl(binanceUrl, params = {}) {
  if (!USE_PROXY) {
    return { url: binanceUrl, params };
  } else {
    return { 
      url: PROXY_BASE, 
      params: { 
        url: encodeURIComponent(binanceUrl), 
        ...params 
      } 
    };
  }
}

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
        const binanceUrl = "https://api.binance.com/api/v3/ticker/24hr";
        const { url, params } = getApiUrl(binanceUrl);
        
        const { data } = await axios.get(url, { params, timeout: 15000 });
        if (!active) return;

        const items = data
          .filter((t) => /USDT$/.test(t.symbol))
          .filter((t) => !/(UP|DOWN|BULL|BEAR)USDT$/.test(t.symbol))
          .map((t) => ({
            symbol: t.symbol,                    // BTCUSDT
            base: getBase(t.symbol),             // BTC
            pair: t.symbol.replace("USDT", "/USDT"),
            price: Number(t.lastPrice),
            volume24h: Number(t.quoteVolume),
            change24h: Number(t.priceChangePercent),
          }))
          .sort((a, b) => b.volume24h - a.volume24h); // urut top volume

        setList(items);
      } catch (e) {
        console.error('SymbolPicker API Error:', e);
        
        // Fallback: Gunakan daftar koin populer yang hardcoded
        console.log('SymbolPicker - Using fallback coin list');
        const fallbackCoins = [
          { symbol: 'BTCUSDT', price: 65000, change: 2.5, volume: 15000000000 },
          { symbol: 'ETHUSDT', price: 3500, change: 1.8, volume: 8000000000 },
          { symbol: 'BNBUSDT', price: 600, change: -0.5, volume: 1200000000 },
          { symbol: 'ADAUSDT', price: 0.5, change: 3.2, volume: 800000000 },
          { symbol: 'SOLUSDT', price: 140, change: 5.1, volume: 2500000000 },
          { symbol: 'DOTUSDT', price: 7, change: -1.2, volume: 400000000 },
          { symbol: 'LINKUSDT', price: 15, change: 2.8, volume: 600000000 },
          { symbol: 'LTCUSDT', price: 70, change: 1.5, volume: 300000000 },
          { symbol: 'AVAXUSDT', price: 35, change: 4.2, volume: 700000000 },
          { symbol: 'MATICUSDT', price: 0.8, change: -2.1, volume: 350000000 },
          { symbol: 'UNIUSDT', price: 8, change: 3.5, volume: 200000000 },
          { symbol: 'ATOMUSDT', price: 12, change: -0.8, volume: 150000000 }
        ];
        
        const items = fallbackCoins.map((coin) => ({
          symbol: coin.symbol,
          base: getBase(coin.symbol),
          pair: coin.symbol.replace("USDT", "/USDT"),
          price: coin.price,
          volume24h: coin.volume,
          change24h: coin.change,
        }));
        
        setList(items);
        setErr("Menggunakan daftar koin demo. API tidak tersedia.");
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
