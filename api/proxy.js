// api/proxy.js - Vercel-optimized proxy untuk Binance API
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
    
    console.log('Proxy - Query params:', { url, ...params });
    
    if (!url) {
      console.error('Proxy - Missing URL parameter');
      return res.status(400).json({ error: 'URL parameter required' });
    }

    // Decode URL
    const binanceUrl = decodeURIComponent(url);
    console.log('Proxy - Decoded URL:', binanceUrl);
    
    // Build query string for additional params
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = queryString ? `${binanceUrl}?${queryString}` : binanceUrl;

    console.log('Proxy - Full URL:', fullUrl);

    // Vercel-optimized fetch with simple retry
    let response;
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      try {
        attempts++;
        console.log(`Proxy - Attempt ${attempts}/${maxAttempts} for:`, fullUrl);
        
        // Simple fetch optimized for Vercel
        response = await fetch(fullUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Vercel-Proxy/1.0'
          },
          redirect: 'follow',
          cache: 'no-cache'
        });

        if (response.ok) {
          console.log(`Proxy - Success on attempt ${attempts}`);
          break;
        } else {
          const errorText = await response.text();
          console.log(`Proxy - HTTP ${response.status} on attempt ${attempts}:`, errorText.substring(0, 200));
          
          if (attempts === maxAttempts) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
        }
      } catch (error) {
        console.log(`Proxy - Error on attempt ${attempts}:`, error.message);
        
        if (attempts === maxAttempts) {
          throw error;
        }
        
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
      }
    }

    console.log('Proxy - Response status:', response.status);
    
    const data = await response.json();
    console.log('Proxy - Data length:', Array.isArray(data) ? data.length : 'Not array');
    
    // Return the exact same data format as Binance
    return res.status(200).json(data);

  } catch (error) {
    console.error('Proxy - Final error:', error.message, error.stack);
    return res.status(500).json({ 
      error: 'Proxy failed',
      message: error.message,
      url: req.query.url,
      timestamp: new Date().toISOString()
    });
  }
}
