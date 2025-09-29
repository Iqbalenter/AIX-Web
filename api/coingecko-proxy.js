// api/coingecko-proxy.js - Alternative API using CoinGecko
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('CoinGecko - Starting request...');
    
    // Get top coins with USDT pairs
    const coinsUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h';
    
    const response = await fetch(coinsUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Vercel-CoinGecko/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`CoinGecko API responded with ${response.status}`);
    }

    const coins = await response.json();
    console.log('CoinGecko - Received coins:', coins.length);

    // Convert to Binance-like format
    const binanceFormat = coins.map(coin => {
      const symbol = `${coin.symbol.toUpperCase()}USDT`;
      return {
        symbol,
        lastPrice: coin.current_price.toString(),
        priceChangePercent: (coin.price_change_percentage_24h || 0).toFixed(2),
        quoteVolume: (coin.total_volume || 0).toString(),
        count: 1,
        // Additional data for compatibility
        openTime: Date.now() - 24 * 60 * 60 * 1000,
        closeTime: Date.now(),
        firstId: 1,
        lastId: 1,
        source: 'coingecko'
      };
    });

    console.log('CoinGecko - Converted to Binance format:', binanceFormat.length);
    
    return res.status(200).json(binanceFormat);

  } catch (error) {
    console.error('CoinGecko - Error:', error.message);
    return res.status(500).json({ 
      error: 'CoinGecko proxy failed',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
