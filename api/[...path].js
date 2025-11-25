/**
 * Vercel Serverless Function - Catch-All API Proxy
 * Forwards all /api/* requests to HTTP backend
 */

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const backendUrl = process.env.BACKEND_API_URL || 'http://212.132.99.95:8081';
    
    // Get the path from query (Vercel passes dynamic route segments as query params)
    const pathSegments = req.query.path || [];
    const targetPath = Array.isArray(pathSegments) ? `/${pathSegments.join('/')}` : `/${pathSegments}`;
    
    // Preserve query string if any (excluding the 'path' param)
    const queryParams = { ...req.query };
    delete queryParams.path;
    const queryString = new URLSearchParams(queryParams).toString();
    const fullPath = queryString ? `${targetPath}?${queryString}` : targetPath;
    
    const targetUrl = `${backendUrl}${fullPath}`;

    console.log(`[Proxy] ${req.method} ${targetPath}`);
    console.log(`[Proxy] Target: ${targetUrl}`);
    console.log(`[Proxy] Body:`, req.body);

    // Prepare fetch options
    const fetchOptions = {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Add body for non-GET requests
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      fetchOptions.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    }

    // Forward request to backend
    const response = await fetch(targetUrl, fetchOptions);

    // Get response text first to handle both JSON and non-JSON responses
    const responseText = await response.text();
    
    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = { message: responseText };
    }

    console.log(`[Proxy] Response: ${response.status}`, data);

    // Forward response back to frontend
    res.status(response.status).json(data);
  } catch (error) {
    console.error('[Proxy] Error:', error);
    res.status(500).json({
      success: false,
      message: 'Proxy error: ' + error.message,
    });
  }
}

