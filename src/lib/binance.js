// src/lib/binance.js
import axios from "axios";

export const ICON_BASE = "https://unpkg.com/cryptocurrency-icons@0.18.1/svg/color";
const ICON_EXCEPTIONS = { IOTA: "miota" };

export const getBase = (symbol) => symbol?.replace("USDT", "") ?? "";
export const getIconUrl = (symbol) => {
  const base = getBase(symbol).toUpperCase();
  const name = (ICON_EXCEPTIONS[base] || base).toLowerCase();
  return `${ICON_BASE}/${name}.svg`;
};

export const formatNumber = (num) => {
  if (num === null || num === undefined || isNaN(num)) return "—";
  const n = Number(num);
  if (Math.abs(n) >= 1_000_000_000) return (n / 1_000_000_000).toFixed(2) + "B";
  if (Math.abs(n) >= 1_000_000) return (n / 1_000_000).toFixed(2) + "M";
  if (Math.abs(n) >= 1_000) return (n / 1_000).toFixed(2) + "K";
  return n.toLocaleString(undefined, { maximumFractionDigits: 6 });
};

export const formatCurrency = (num) => {
  if (num === null || num === undefined || isNaN(num)) return "—";
  const n = Number(num);
  const opts =
    n >= 1
      ? { style: "currency", currency: "USD", maximumFractionDigits: 2 }
      : { style: "currency", currency: "USD", maximumFractionDigits: 6 };
  return n.toLocaleString(undefined, opts);
};

// 24h ticker (spot) — sudah Anda pakai sebelumnya
export async function get24h(symbol) {
  // jika symbol diisi: hanya ambil 1, jika tidak: ambil semua
  const url = "https://api.binance.com/api/v3/ticker/24hr";
  const { data } = await axios.get(url, {
    params: symbol ? { symbol } : undefined,
    timeout: 15000,
  });
  return data;
}

// Mark price & funding (Futures). Tidak semua pair spot punya data futures.
// Jika tidak ada di futures, kita fallback ke lastPrice 24h ticker.
export async function getPremiumIndex(symbol) {
  try {
    const url = "https://fapi.binance.com/fapi/v1/premiumIndex";
    const { data } = await axios.get(url, { params: { symbol }, timeout: 12000 });
    // data: { markPrice, lastFundingRate, nextFundingTime, ... }
    return {
      ok: true,
      markPrice: Number(data.markPrice),
      lastFundingRate: Number(data.lastFundingRate ?? 0),
      nextFundingTime: Number(data.nextFundingTime ?? 0),
      raw: data,
    };
  } catch {
    return { ok: false };
  }
}
