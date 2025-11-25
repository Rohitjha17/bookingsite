/**
 * Vercel Serverless Function
 * Acts as a proxy to forward requests to HTTP backend
 * This solves Mixed Content issue (HTTPS → HTTP)
 */

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Backend API base URL
  const BACKEND_URL = 'http://212.132.99.95:8081';

  try {
    // Extract the API path from query
    const apiPath = req.query.path || '';
    const targetUrl = `${BACKEND_URL}${apiPath}`;

    console.log(`📡 Proxying ${req.method} request to: ${targetUrl}`);

    // Forward the request to backend
    const backendResponse = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...(req.headers.authorization && { Authorization: req.headers.authorization }),
      },
      ...(req.method !== 'GET' && req.method !== 'HEAD' && { body: JSON.stringify(req.body) }),
    });

    // Get response data
    const data = await backendResponse.json();

    // Forward the response
    return res.status(backendResponse.status).json(data);
  } catch (error) {
    console.error('❌ Proxy error:', error);
    return res.status(500).json({
      success: false,
      message: 'Proxy server error',
      error: error.message,
    });
  }
}

