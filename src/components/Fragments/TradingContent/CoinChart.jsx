// src/components/CoinChart.jsx
import { useEffect, useRef, useState } from "react";
import axios from "axios";
// ✅ v5 API: impor class seri yang ingin dipakai
import { createChart, CandlestickSeries } from "lightweight-charts";

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

// Daftar timeframe (interval Binance)
const TF_LIST = [
  { key: "5m", label: "5m" },
  { key: "15m", label: "15m" },
  { key: "30m", label: "30m" },
  { key: "1h", label: "1H" },
  { key: "4h", label: "4H" },
  { key: "1d", label: "1D" },
  { key: "1w", label: "1W" },
];

// Helper: ambil klines dengan multiple fallbacks
async function fetchKlines(symbol, interval, limit = 500) {
  const binanceUrl = "https://api.binance.com/api/v3/klines";
  
  try {
    // Strategy 1: Try proxy/direct based on environment
    const { url, params } = getApiUrl(binanceUrl, { symbol, interval, limit });
    console.log('fetchKlines - Trying primary method:', url);
    
    const { data } = await axios.get(url, {
      params,
      timeout: 15000,
    });
    
    console.log('fetchKlines - Primary method successful');
    return data.map((k) => ({
      time: Math.floor(k[0] / 1000),
      open: Number(k[1]),
      high: Number(k[2]),
      low: Number(k[3]),
      close: Number(k[4]),
    }));
    
  } catch (error) {
    console.warn('fetchKlines - Primary method failed:', error.message);
    
    // Strategy 2: Try direct Binance (if was using proxy)
    if (USE_PROXY) {
      try {
        console.log('fetchKlines - Trying direct Binance fallback...');
        const { data } = await axios.get(binanceUrl, {
          params: { symbol, interval, limit },
          timeout: 15000,
        });
        
        console.log('fetchKlines - Direct fallback successful');
        return data.map((k) => ({
          time: Math.floor(k[0] / 1000),
          open: Number(k[1]),
          high: Number(k[2]),
          low: Number(k[3]),
          close: Number(k[4]),
        }));
        
      } catch (directError) {
        console.warn('fetchKlines - Direct fallback also failed:', directError.message);
      }
    }
    
    // Strategy 3: Try klines fallback API (server-generated dummy data)
    if (USE_PROXY) {
      try {
        console.log('fetchKlines - Trying klines fallback API...');
        const { data } = await axios.get('/api/klines-fallback', {
          params: { symbol, interval, limit },
          timeout: 10000,
        });
        
        console.log('fetchKlines - Klines fallback successful');
        return data.map((k) => ({
          time: Math.floor(k[0] / 1000),
          open: Number(k[1]),
          high: Number(k[2]),
          low: Number(k[3]),
          close: Number(k[4]),
        }));
        
      } catch (fallbackError) {
        console.warn('fetchKlines - Klines fallback also failed:', fallbackError.message);
      }
    }
    
    // Strategy 4: Generate client-side dummy data (last resort)
    console.log('fetchKlines - All APIs failed, generating client-side dummy data');
    return generateDummyKlines(symbol, interval, limit);
  }
}

// Generate realistic dummy klines data
function generateDummyKlines(symbol, interval, limit = 500) {
  const now = Math.floor(Date.now() / 1000);
  const intervalMs = getIntervalMs(interval);
  const dummyData = [];
  
  // Base price untuk different coins
  const basePrices = {
    'BTCUSDT': 65000,
    'ETHUSDT': 3500,
    'BNBUSDT': 600,
    'ADAUSDT': 0.5,
    'SOLUSDT': 140,
    'DOTUSDT': 7,
    'LINKUSDT': 15,
    'LTCUSDT': 70,
    'AVAXUSDT': 35,
    'MATICUSDT': 0.8
  };
  
  let basePrice = basePrices[symbol] || 100;
  
  for (let i = limit - 1; i >= 0; i--) {
    const time = now - (i * intervalMs / 1000);
    
    // Generate realistic price movement
    const volatility = 0.02; // 2% volatility
    const priceChange = (Math.random() - 0.5) * volatility * basePrice;
    basePrice = Math.max(basePrice + priceChange, basePrice * 0.8); // Prevent too low
    
    const open = basePrice;
    const close = open + (Math.random() - 0.5) * volatility * open;
    const high = Math.max(open, close) + Math.random() * 0.01 * Math.max(open, close);
    const low = Math.min(open, close) - Math.random() * 0.01 * Math.min(open, close);
    
    dummyData.push({
      time,
      open: Number(open.toFixed(4)),
      high: Number(high.toFixed(4)),
      low: Number(low.toFixed(4)),
      close: Number(close.toFixed(4)),
    });
    
    basePrice = close; // Update base for next candle
  }
  
  return dummyData;
}

// Helper to convert interval to milliseconds
function getIntervalMs(interval) {
  const intervals = {
    '1m': 60 * 1000,
    '5m': 5 * 60 * 1000,
    '15m': 15 * 60 * 1000,
    '30m': 30 * 60 * 1000,
    '1h': 60 * 60 * 1000,
    '4h': 4 * 60 * 60 * 1000,
    '1d': 24 * 60 * 60 * 1000,
    '1w': 7 * 24 * 60 * 60 * 1000,
  };
  return intervals[interval] || 3600 * 1000; // Default 1 hour
}

/**
 * CoinChart v5
 * Props:
 * - symbol: string (contoh: "BTCUSDT")
 * - height?: number (default 420)
 * - refreshMs?: number (default 15000)
 */
export default function CoinChart({ symbol, height = null, refreshMs = 15000 }) {
  const containerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  const [interval, setIntervalKey] = useState("1h");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [autoHeight, setAutoHeight] = useState(420);

  // Inisialisasi chart sekali (mount)
  useEffect(() => {
    if (!containerRef.current) return;

    // Buat chart
    const containerWidth = containerRef.current.clientWidth;
    // Hitung tinggi otomatis berdasarkan lebar container bila height tidak diberikan
    const initialHeight = typeof height === "number" && height > 0
      ? height
      : Math.max(260, Math.min(560, Math.round(containerWidth * 0.6)));
    setAutoHeight(initialHeight);

    const chart = createChart(containerRef.current, {
      width: containerWidth,
      height: initialHeight,
      layout: {
        background: { type: "solid", color: "#0f172a" }, // tailwind slate-900
        textColor: "#cbd5e1", // slate-300
      },
      grid: {
        vertLines: { color: "rgba(148,163,184,0.08)" },
        horzLines: { color: "rgba(148,163,184,0.08)" },
      },
      rightPriceScale: { borderColor: "rgba(148,163,184,0.18)" },
      timeScale: { borderColor: "rgba(148,163,184,0.18)" },
      crosshair: { mode: 1 },
      localization: {
        priceFormatter: (p) =>
          Number(p).toLocaleString(undefined, { maximumFractionDigits: 8 }),
      },
    });

    // ✅ v5: tambah seri via addSeries(CandlestickSeries, options)
    const series = chart.addSeries(CandlestickSeries, {
      upColor: "#16a34a",       // green-600
      downColor: "#dc2626",     // red-600
      wickUpColor: "#16a34a",
      wickDownColor: "#dc2626",
      borderVisible: false,
    });

    chartRef.current = chart;
    seriesRef.current = series;

    // Responsif
    const ro = new ResizeObserver(() => {
      const w = containerRef.current.clientWidth;
      const h = typeof height === "number" && height > 0
        ? height
        : Math.max(260, Math.min(560, Math.round(w * 0.6)));
      setAutoHeight(h);
      chart.applyOptions({ width: w, height: h });
    });
    ro.observe(containerRef.current);

    // Cleanup saat unmount
    return () => {
      ro.disconnect();
      chart.remove(); // otomatis remove semua series di v5
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, [height]);

  // Load data saat symbol/interval berubah (dan refresh berkala)
  useEffect(() => {
    let active = true;
    let timer;

    async function load() {
      if (!seriesRef.current) return;
      try {
        setErr("");
        setLoading(true);
        const rows = await fetchKlines(symbol, interval);
        if (!active) return;
        seriesRef.current.setData(rows);
        chartRef.current?.timeScale().fitContent();
      } catch (e) {
        console.error('CoinChart API Error:', e);
        if (!active) return;
        setErr("Gagal memuat data chart. Silakan coba lagi atau pilih interval lain.");
      } finally {
        if (active) setLoading(false);
      }
    }

    // Muat awal
    load();

    // Auto refresh (polling) agar aman dari CORS/WebSocket issues
    if (refreshMs > 0) {
      timer = setInterval(load, refreshMs);
    }

    return () => {
      active = false;
      if (timer) clearInterval(timer);
    };
  }, [symbol, interval, refreshMs]);

  return (
    <div className="flex flex-col gap-3">
      {/* Timeframe Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap no-scrollbar -mx-1 px-1">
        {TF_LIST.map((tf) => (
          <button
            key={tf.key}
            onClick={() => setIntervalKey(tf.key)}
            className={`shrink-0 px-3 py-1.5 text-sm rounded-lg border transition ${
              interval === tf.key
                ? " text-white"
                : "border-slate-700 text-slate-300 hover:bg-slate-800"
            }`}
          >
            {tf.label}
          </button>
        ))}
      </div>

      {/* Chart container */}
      <div
        ref={containerRef}
        className="w-full rounded-xl border border-slate-800"
        style={{ minHeight: typeof height === "number" && height > 0 ? height : autoHeight }}
      />

      {/* Status */}
      {loading && (
        <div className="text-sm text-slate-400">Memuat candlestick…</div>
      )}
      {err && (
        <div className="text-sm text-yellow-300 border border-yellow-800/60 bg-yellow-900/30 rounded-lg px-3 py-2">
          <div className="font-medium">⚠️ Menggunakan Data Demo</div>
          <div className="text-xs mt-1">API tidak tersedia, menampilkan data simulasi untuk demo chart.</div>
        </div>
      )}
    </div>
  );
}
