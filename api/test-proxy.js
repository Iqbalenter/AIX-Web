// api/test-proxy.js - Test endpoint untuk debug proxy
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Test simple Binance API call
    const testUrl = 'https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT';
    
    console.log('Test - Trying to fetch:', testUrl);
    
    const response = await fetch(testUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Vercel-Test/1.0)',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    return res.status(200).json({
      success: true,
      message: 'Proxy connection works!',
      testUrl,
      dataReceived: {
        symbol: data.symbol,
        price: data.lastPrice,
        change: data.priceChangePercent
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Test - Error:', error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
