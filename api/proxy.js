/**
 * Vercel Serverless Function
 * Acts as a proxy to forward requests to HTTP backend
 * This solves Mixed Content issue (HTTPS → HTTP)
 */

import fetch from 'node-fetch';

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
    console.log('📦 Request body:', req.body);

    // Prepare request options
    const fetchOptions = {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...(req.headers.authorization && { Authorization: req.headers.authorization }),
      },
    };

    // Add body for POST, PUT, PATCH requests
    if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body) {
      fetchOptions.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    }

    // Forward the request to backend
    const backendResponse = await fetch(targetUrl, fetchOptions);

    // Get response text first
    const responseText = await backendResponse.text();
    
    // Try to parse as JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      data = { message: responseText };
    }

    console.log('✅ Backend response:', backendResponse.status, data);

    // Forward the response
    return res.status(backendResponse.status).json(data);
  } catch (error) {
    console.error('❌ Proxy error:', error);
    return res.status(500).json({
      success: false,
      message: 'Proxy server error',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
}

