// api/klines-fallback.js - Fallback untuk klines data
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
    const { symbol = 'BTCUSDT', interval = '1h', limit = 500 } = req.query;
    
    console.log('Klines Fallback - Generating data for:', { symbol, interval, limit });
    
    // Generate realistic dummy klines
    const now = Date.now();
    const intervalMs = getIntervalMs(interval);
    const data = [];
    
    // Base prices for different coins
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
    
    for (let i = Number(limit) - 1; i >= 0; i--) {
      const openTime = now - (i * intervalMs);
      const closeTime = openTime + intervalMs - 1;
      
      // Generate realistic price movement
      const volatility = 0.015; // 1.5% volatility
      const priceChange = (Math.random() - 0.5) * volatility * basePrice;
      basePrice = Math.max(basePrice + priceChange, basePrice * 0.9);
      
      const open = basePrice;
      const close = open + (Math.random() - 0.5) * volatility * open;
      const high = Math.max(open, close) + Math.random() * 0.005 * Math.max(open, close);
      const low = Math.min(open, close) - Math.random() * 0.005 * Math.min(open, close);
      const volume = Math.random() * 1000 + 100;
      
      // Binance klines format
      data.push([
        openTime,                    // Open time
        open.toFixed(8),            // Open
        high.toFixed(8),            // High
        low.toFixed(8),             // Low
        close.toFixed(8),           // Close
        volume.toFixed(8),          // Volume
        closeTime,                  // Close time
        (volume * (open + close) / 2).toFixed(8), // Quote asset volume
        Math.floor(Math.random() * 100) + 50,     // Number of trades
        (volume * 0.6).toFixed(8),  // Taker buy base asset volume
        (volume * 0.6 * (open + close) / 2).toFixed(8), // Taker buy quote asset volume
        "0"                         // Ignore
      ]);
      
      basePrice = Number(close);
    }
    
    console.log('Klines Fallback - Generated', data.length, 'candles');
    
    return res.status(200).json(data);

  } catch (error) {
    console.error('Klines Fallback - Error:', error.message);
    return res.status(500).json({ 
      error: 'Klines fallback failed',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
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
