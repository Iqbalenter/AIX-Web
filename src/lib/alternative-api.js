// Alternative API menggunakan CoinGecko (tidak diblokir)
import axios from "axios";

const COINGECKO_API = "https://api.coingecko.com/api/v3";

// Map Binance symbols ke CoinGecko IDs
const SYMBOL_MAP = {
  "BTCUSDT": "bitcoin",
  "ETHUSDT": "ethereum",
  "BNBUSDT": "binancecoin",
  "ADAUSDT": "cardano",
  "DOTUSDT": "polkadot",
  "LINKUSDT": "chainlink",
  "LTCUSDT": "litecoin",
  "SOLUSDT": "solana",
  "AVAXUSDT": "avalanche-2",
  "MATICUSDT": "matic-network"
};

export async function getCoinGeckoData() {
  try {
    const coinIds = Object.values(SYMBOL_MAP).join(',');
    const { data } = await axios.get(`${COINGECKO_API}/simple/price`, {
      params: {
        ids: coinIds,
        vs_currencies: 'usd',
        include_24hr_change: true,
        include_24hr_vol: true
      },
      timeout: 10000
    });

    // Convert ke format Binance-like
    const result = [];
    for (const [symbol, coinId] of Object.entries(SYMBOL_MAP)) {
      const coinData = data[coinId];
      if (coinData) {
        result.push({
          symbol,
          lastPrice: coinData.usd.toString(),
          priceChangePercent: (coinData.usd_24h_change || 0).toString(),
          quoteVolume: (coinData.usd_24h_vol || 0).toString(),
          count: 1
        });
      }
    }

    return result;
  } catch (error) {
    console.error('CoinGecko API Error:', error);
    throw error;
  }
}
