// src/components/CoinChart.jsx
import { useEffect, useRef, useState } from "react";
import axios from "axios";
// ✅ v5 API: impor class seri yang ingin dipakai
import { createChart, CandlestickSeries } from "lightweight-charts";

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

// Helper: ambil klines Binance lalu map ke format lightweight-charts
async function fetchKlines(symbol, interval, limit = 500) {
  const url = "https://api.binance.com/api/v3/klines";
  const { data } = await axios.get(url, {
    params: { symbol, interval, limit },
    timeout: 15000,
  });
  // Binance candle: [openTime, open, high, low, close, volume, closeTime, ...]
  // Lightweight-charts butuh { time: seconds, open, high, low, close }
  return data.map((k) => ({
    time: Math.floor(k[0] / 1000),
    open: Number(k[1]),
    high: Number(k[2]),
    low: Number(k[3]),
    close: Number(k[4]),
  }));
}

/**
 * CoinChart v5
 * Props:
 * - symbol: string (contoh: "BTCUSDT")
 * - height?: number (default 420)
 * - refreshMs?: number (default 15000)
 */
export default function CoinChart({ symbol, height = 420, refreshMs = 15000 }) {
  const containerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  const [interval, setIntervalKey] = useState("1h");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // Inisialisasi chart sekali (mount)
  useEffect(() => {
    if (!containerRef.current) return;

    // Buat chart
    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height,
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
      chart.applyOptions({ width: containerRef.current.clientWidth, height });
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
        console.error(e);
        if (!active) return;
        setErr("Gagal memuat data chart. Coba interval lain atau refresh.");
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
      <div className="flex items-center gap-2">
        {TF_LIST.map((tf) => (
          <button
            key={tf.key}
            onClick={() => setIntervalKey(tf.key)}
            className={`px-3 py-1.5 text-sm rounded-lg border transition ${
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
        style={{ minHeight: height }}
      />

      {/* Status */}
      {loading && (
        <div className="text-sm text-slate-400">Memuat candlestick…</div>
      )}
      {err && (
        <div className="text-sm text-red-300 border border-red-800/60 bg-red-900/30 rounded-lg px-3 py-2">
          {err}
        </div>
      )}
    </div>
  );
}
