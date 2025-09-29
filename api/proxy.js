// api/proxy.js - Simple proxy untuk Binance API
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
    const { url, ...params } = req.query;
    
    if (!url) {
      return res.status(400).json({ error: 'URL parameter required' });
    }

    // Decode URL
    const binanceUrl = decodeURIComponent(url);
    
    // Build query string
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = queryString ? `${binanceUrl}?${queryString}` : binanceUrl;

    console.log('Proxying to:', fullUrl);

    // Fetch from Binance
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Vercel-Proxy/1.0)',
      },
      signal: AbortSignal.timeout(15000)
    });

    if (!response.ok) {
      throw new Error(`API responded with ${response.status}`);
    }

    const data = await response.json();
    
    // Return the exact same data format as Binance
    return res.status(200).json(data);

  } catch (error) {
    console.error('Proxy error:', error.message);
    return res.status(500).json({ 
      error: 'Proxy failed',
      message: error.message 
    });
  }
}
