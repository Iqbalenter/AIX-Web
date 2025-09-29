// src/lib/binance.js
import axios from "axios";

export const ICON_BASE = "https://unpkg.com/cryptocurrency-icons@0.18.1/svg/color";

// Simple proxy untuk bypass blocking
const USE_PROXY = typeof window !== 'undefined' && window.location.hostname !== 'localhost';
const PROXY_BASE = '/api/proxy';

// Helper function untuk get URL (proxy atau direct)
function getApiUrl(binanceUrl, params = {}) {
  if (!USE_PROXY) {
    // Development: langsung ke Binance
    return { url: binanceUrl, params };
  } else {
    // Production: via proxy
    return { 
      url: PROXY_BASE, 
      params: { 
        url: encodeURIComponent(binanceUrl), 
        ...params 
      } 
    };
  }
}
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
  const binanceUrl = "https://api.binance.com/api/v3/ticker/24hr";
  const symbolParams = symbol ? { symbol } : {};
  
  try {
    // Coba dengan proxy/direct sesuai environment
    const { url, params } = getApiUrl(binanceUrl, symbolParams);
    console.log('get24h - Using URL:', url, 'with params:', params);
    
    const { data } = await axios.get(url, {
      params,
      timeout: 15000,
    });
    
    console.log('get24h - Success via', USE_PROXY ? 'proxy' : 'direct');
    return data;
    
  } catch (error) {
    console.warn('get24h - Primary method failed:', error.message);
    
    // Check if it's a blocking error (451)
    const isBlocked = error.message.includes('451') || error.message.includes('blocked');
    
    // Multiple fallback strategies
    if (USE_PROXY) {
      // Fallback 1: Try direct Binance (only if not blocked)
      if (!isBlocked) {
        try {
          console.log('get24h - Trying direct Binance fallback...');
          const { data } = await axios.get(binanceUrl, {
            params: symbolParams,
            timeout: 15000,
          });
          console.log('get24h - Direct Binance fallback successful');
          return data;
        } catch (directError) {
          console.warn('get24h - Direct Binance also failed:', directError.message);
        }
      } else {
        console.log('get24h - Skipping direct Binance (API blocked)');
      }
      
      // Fallback 2: Try CoinGecko proxy
      try {
        console.log('get24h - Trying CoinGecko fallback...');
        const { data } = await axios.get('/api/coingecko-proxy', {
          params: symbol ? { symbol } : {},
          timeout: 15000,
        });
        console.log('get24h - CoinGecko fallback successful');
        return symbol ? [data] : data; // Ensure array format consistency
      } catch (coinGeckoError) {
        console.warn('get24h - CoinGecko fallback also failed:', coinGeckoError.message);
      }
    }
    
    // If all fallbacks fail, throw the original error
    throw error;
  }
}

// Mark price & funding (Futures). Tidak semua pair spot punya data futures.
// Jika tidak ada di futures, kita fallback ke lastPrice 24h ticker.
export async function getPremiumIndex(symbol) {
  try {
    const binanceUrl = "https://fapi.binance.com/fapi/v1/premiumIndex";
    const { url, params } = getApiUrl(binanceUrl, { symbol });
    
    const { data } = await axios.get(url, { params, timeout: 12000 });
    // data: { markPrice, lastFundingRate, nextFundingTime, ... }
    return {
      ok: true,
      markPrice: Number(data.markPrice),
      lastFundingRate: Number(data.lastFundingRate ?? 0),
      nextFundingTime: Number(data.nextFundingTime ?? 0),
      raw: data,
    };
  } catch (error) {
    console.warn('getPremiumIndex failed:', error.message);
    
    // Fallback: Try direct Binance if was using proxy
    if (USE_PROXY) {
      try {
        const { data } = await axios.get("https://fapi.binance.com/fapi/v1/premiumIndex", {
          params: { symbol },
          timeout: 12000
        });
        return {
          ok: true,
          markPrice: Number(data.markPrice),
          lastFundingRate: Number(data.lastFundingRate ?? 0),
          nextFundingTime: Number(data.nextFundingTime ?? 0),
          raw: data,
        };
      } catch (fallbackError) {
        console.warn('getPremiumIndex direct fallback also failed:', fallbackError.message);
      }
    }
    
    return { ok: false };
  }
}
