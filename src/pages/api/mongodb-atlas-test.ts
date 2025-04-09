import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  success: boolean;
  message: string;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed. Only POST requests are accepted.'
    });
  }

  // Validate required parameters
  const { clientId, clientSecret } = req.body;
  
  if (!clientId || !clientSecret) {
    return res.status(400).json({ 
      success: false, 
      message: 'Missing required parameters: clientId and clientSecret are required'
    });
  }

  try {
    // MongoDB Atlas Data API endpoint
    // Replace YOUR_APP_ID with your actual Data API App ID or use an environment variable
    const apiUrl = `https://data.mongodb-api.com/app/YOUR_APP_ID/endpoint/data/v1/action/find`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': clientSecret,
      },
      body: JSON.stringify({
        dataSource: 'Cluster0', // Replace with your cluster name
        database: 'ypf_database', // Replace with your database name
        collection: 'posts', // Replace with your collection name
        filter: {}, // Simple filter to fetch a few documents
        limit: 3,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return res.status(response.status).json({
        success: false,
        message: `MongoDB Atlas API Error: ${response.statusText}`,
        data: errorData,
      });
    }

    const data = await response.json();

    return res.status(200).json({
      success: true,
      message: 'Successfully connected to MongoDB Atlas Data API',
      data,
    });
  } catch (error) {
    console.error('MongoDB Atlas test error:', error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to connect to MongoDB Atlas Data API',
    });
  }
} 