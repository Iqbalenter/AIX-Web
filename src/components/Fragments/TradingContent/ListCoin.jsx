// src/pages/ListCoin.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CoinChart from "./CoinChart";
import OrderBook from "./OrderBook";
import { get24h } from "../../../lib/binance";

// Helper untuk proxy (sama seperti di binance.js)
const USE_PROXY = false; // Force direct Binance untuk test
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

// Test function untuk debug
async function testApiConnection() {
  try {
    console.log('Testing API connection...');
    
    // Test 1: Direct Binance
    try {
      const directRes = await axios.get("https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT", {
        timeout: 10000,
      });
      console.log('✅ Direct Binance API works:', directRes.status);
    } catch (directErr) {
      console.log('❌ Direct Binance API failed:', directErr.message);
    }
    
    // Test 2: Proxy API
    try {
      const proxyRes = await axios.get("/api/proxy", {
        params: {
          url: encodeURIComponent("https://api.binance.com/api/v3/ticker/24hr"),
          symbol: "BTCUSDT"
        },
        timeout: 10000,
      });
      console.log('✅ Proxy API works:', proxyRes.status);
    } catch (proxyErr) {
      console.log('❌ Proxy API failed:', proxyErr.message);
    }
    
  } catch (err) {
    console.error('Test failed:', err);
  }
}

const PAGE_SIZE = 10;

const ICON_BASE = "https://unpkg.com/cryptocurrency-icons@0.18.1/svg/color";
const ICON_EXCEPTIONS = { IOTA: "miota" };

const formatNumber = (num) => {
  if (num === null || num === undefined || isNaN(num)) return "—";
  const n = Number(num);
  if (Math.abs(n) >= 1_000_000_000) return (n / 1_000_000_000).toFixed(2) + "B";
  if (Math.abs(n) >= 1_000_000) return (n / 1_000_000).toFixed(2) + "M";
  if (Math.abs(n) >= 1_000) return (n / 1_000).toFixed(2) + "K";
  return n.toLocaleString(undefined, { maximumFractionDigits: 6 });
};

const formatCurrency = (num) => {
  if (num === null || num === undefined || isNaN(num)) return "—";
  const n = Number(num);
  const opts =
    n >= 1
      ? { style: "currency", currency: "USD", maximumFractionDigits: 2 }
      : { style: "currency", currency: "USD", maximumFractionDigits: 6 };
  return n.toLocaleString(undefined, opts);
};

const getBase = (symbol) => symbol.replace("USDT", "");
const getIconUrl = (symbol) => {
  const base = getBase(symbol).toUpperCase();
  const name = (ICON_EXCEPTIONS[base] || base).toLowerCase();
  return `${ICON_BASE}/${name}.svg`;
};

export default function ListCoin() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setErrMsg("");
      setLoading(true);
      
      console.log('ListCoin - Fetching data...');
      console.log('ListCoin - USE_PROXY:', USE_PROXY);
      
      // Gunakan function dari binance.js yang sudah handle proxy
      const data = await get24h(); // tanpa symbol = ambil semua
      
      console.log('ListCoin - Data received:', Array.isArray(data), data?.length);

      const filtered = data
        .filter((t) => /USDT$/.test(t.symbol))
        .filter((t) => !/(UP|DOWN|BULL|BEAR)USDT$/.test(t.symbol))
        .map((t) => {
          const lastPrice = Number(t.lastPrice);
          const quoteVolume = Number(t.quoteVolume);
          const priceChangePct = Number(t.priceChangePercent);
          return {
            symbol: t.symbol,
            base: getBase(t.symbol),
            pair: t.symbol.replace("USDT", "/USDT"),
            price: lastPrice,
            volume24h: quoteVolume,
            change24h: priceChangePct,
          };
        })
        .sort((a, b) => b.volume24h - a.volume24h);

      setCoins(filtered);
      console.log('ListCoin - Filtered coins:', filtered.length);

      // jika ada selected, sinkronkan harga/volume terbarunya
      if (selected) {
        const s = filtered.find((c) => c.symbol === selected.symbol);
        if (s) setSelected(s);
      }
    } catch (err) {
      console.error('ListCoin API Error:', err);
      setErrMsg(`Gagal memuat data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 15000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredCoins = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return coins;
    return coins.filter(
      (c) =>
        c.symbol.toLowerCase().includes(q) ||
        c.pair.toLowerCase().includes(q) ||
        c.base.toLowerCase().includes(q)
    );
  }, [coins, search]);

  const totalPages = Math.max(1, Math.ceil(filteredCoins.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageData = filteredCoins.slice(start, start + PAGE_SIZE);

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="listcoin-container min-h-screen p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold">Markets</h1>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search"
              className="listcoin-search border border-[#E7CE45] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E7CE45] w-full sm:w-auto"
            />
            <button
              onClick={fetchData}
              className="listcoin-refresh-btn bg-[#E7CE45] hover:bg-[#c6b23f] transition px-4 py-2 rounded-lg text-sm font-semibold text-black whitespace-nowrap"
            >
              Refresh
            </button>
          </div>
        </div>

        {errMsg && (
          <div className="mb-4 rounded-lg border border-red-700 bg-red-900/30 text-red-300 px-4 py-3">
            <div>{errMsg}</div>
            <div className="text-xs mt-2 opacity-70">
              Environment: {process.env.NODE_ENV || 'development'} | Using Proxy: {USE_PROXY ? 'Yes' : 'No'}
            </div>
          </div>
        )}

        <div className="overflow-x-auto rounded-lg border border-gray-800">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-800/60">
              <tr className="text-left text-xs sm:text-sm">
                <th className="px-2 sm:px-4 py-3 font-semibold">#</th>
                <th className="px-2 sm:px-4 py-3 font-semibold">Trading Pair</th>
                <th className="px-2 sm:px-4 py-3 font-semibold">Price</th>
                <th className="px-2 sm:px-4 py-3 font-semibold hidden sm:table-cell">24h Volume (USDT)</th>
                <th className="px-2 sm:px-4 py-3 font-semibold">24h</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="px-2 sm:px-4 py-10 text-center text-gray-400">Loading data...</td></tr>
              ) : pageData.length === 0 ? (
                <tr><td colSpan={7} className="px-2 sm:px-4 py-10 text-center text-gray-400">No matching data.</td></tr>
              ) : (
                pageData.map((coin, idx) => {
                  const iconUrl = getIconUrl(coin.symbol);
                  const pos = coin.change24h >= 0;
                  return (
                    <tr
                        key={coin.symbol}
                        onClick={() => navigate(`/charts/${coin.symbol}`)} // <-- pindah ke halaman baru
                        className="cursor-pointer border-t border-gray-800 hover:bg-gray-800/40 transition"
                    >
                      <td className="px-2 sm:px-4 py-3 text-xs sm:text-sm text-gray-400">{start + idx + 1}</td>
                      <td className="px-2 sm:px-4 py-3">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <img
                            src={iconUrl}
                            alt={`${coin.base} icon`}
                            width={24}
                            height={24}
                            loading="lazy"
                            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-800/70 ring-1 ring-gray-700 object-contain flex-shrink-0"
                            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `${ICON_BASE}/generic.svg`; }}
                          />
                          <div className="flex flex-col leading-tight min-w-0">
                            <span className="font-medium text-xs sm:text-sm truncate">{coin.pair}</span>
                            <span className="text-[10px] sm:text-xs text-gray-400 truncate">{coin.base}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-2 sm:px-4 py-3 text-xs sm:text-sm font-medium">{formatCurrency(coin.price)}</td>
                      <td className="px-2 sm:px-4 py-3 text-xs sm:text-sm hidden sm:table-cell">{formatNumber(coin.volume24h)}</td>
                      <td className="px-2 sm:px-4 py-3">
                        <span className={`px-1.5 sm:px-2 py-1 rounded text-[10px] sm:text-xs font-medium ${pos ? "bg-green-900/40 text-green-300" : "bg-red-900/40 text-red-300"}`}>
                          {pos ? "+" : ""}{coin.change24h?.toFixed(2)}%
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <span className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
            Page <span className="text-gray-200">{currentPage}</span> from{" "}
            <span className="text-gray-200">{totalPages}</span> • Displaying{" "}
            <span className="text-gray-200">{pageData.length}</span> from{" "}
            <span className="text-gray-200">{filteredCoins.length}</span> coin
          </span>
          <div className="flex items-center justify-center gap-1 sm:gap-2">
            <button className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-gray-700 text-xs sm:text-sm hover:bg-gray-800 disabled:opacity-50 transition"
              onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => { 
                const w = window.innerWidth < 640 ? 1 : 3; // Smaller window on mobile
                return p === 1 || p === totalPages || (p >= currentPage - w && p <= currentPage + w); 
              })
              .map((p, i, arr) => {
                const prev = arr[i - 1]; const needDots = prev && p - prev > 1;
                return (
                  <span key={p} className="flex items-center">
                    {needDots && <span className="px-1 text-gray-500 select-none hidden sm:inline">…</span>}
                    <button
                      className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm border transition ${
                        p === currentPage 
                          ? 'border-[#E7CE45] bg-[#E7CE45]/10 text-[#E7CE45]' 
                          : 'border-gray-700 hover:bg-gray-800'
                      }`}
                      onClick={() => goToPage(p)}
                    >
                      {p}
                    </button>
                  </span>
                );
              })}
            <button className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-gray-700 text-xs sm:text-sm hover:bg-gray-800 disabled:opacity-50 transition"
              onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
          </div>
        </div>

        {/* ======= PANEL DETAIL (Chart + Order Book) ======= */}
        {selected && (
          <div className="mt-6 sm:mt-8 rounded-xl sm:rounded-2xl border border-slate-800 bg-slate-900/60 p-3 sm:p-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <img
                  src={getIconUrl(selected.symbol)}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `${ICON_BASE}/generic.svg`; }}
                  alt={`${selected.base} icon`}
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-800 ring-1 ring-slate-700 object-contain flex-shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                    <h2 className="text-base sm:text-lg font-semibold">{selected.pair}</h2>
                    <span className="text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-600/30">PERP</span>
                    <span className="text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-600/30">USDT</span>
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-400">Spot · Binance</div>
                </div>
              </div>
              
              {/* Stats - Mobile: Grid, Desktop: Flex */}
              <div className="grid grid-cols-3 sm:flex sm:items-center gap-3 sm:gap-6 text-center sm:text-right">
                <div>
                  <div className="text-[10px] sm:text-xs text-slate-400">Last Price</div>
                  <div className="text-xs sm:text-base font-semibold">{formatCurrency(selected.price)}</div>
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs text-slate-400">24H Volume</div>
                  <div className="text-xs sm:text-base font-semibold">{formatNumber(selected.volume24h)}</div>
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs text-slate-400">24H Change</div>
                  <div className={`text-xs sm:text-base font-semibold ${selected.change24h >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    {selected.change24h >= 0 ? "+" : ""}{selected.change24h?.toFixed(2)}%
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setSelected(null)}
                className="px-3 py-2 rounded-lg border border-slate-700 text-xs sm:text-sm hover:bg-slate-800 transition self-start sm:self-auto"
                title="Tutup"
              >
                Close
              </button>
            </div>

            {/* Body: Chart + Order Book */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 sm:gap-4">
              <div className="xl:col-span-9">
                <CoinChart symbol={selected.symbol} />
              </div>
              <div className="xl:col-span-3">
                <OrderBook symbol={selected.symbol} />
              </div>
            </div>
          </div>
        )}
        {/* ======= END PANEL DETAIL ======= */}
      </div>
    </div>
  );
}
