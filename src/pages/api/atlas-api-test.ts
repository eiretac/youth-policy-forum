import type { NextApiRequest, NextApiResponse } from 'next';
import { testConnection } from '../../lib/mongoAtlasApi';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set proper headers
  res.setHeader('Content-Type', 'application/json');
  
  try {
    console.log('Testing MongoDB Atlas Data API connection...');
    const result = await testConnection();
    
    if (result.success) {
      console.log('MongoDB Atlas Data API connection successful');
      return res.status(200).json({
        success: true,
        message: 'MongoDB Atlas Data API connection successful',
        data: result.data
      });
    } else {
      console.error('MongoDB Atlas Data API connection failed:', result.error);
      return res.status(500).json({
        success: false,
        message: 'MongoDB Atlas Data API connection failed',
        error: result.error
      });
    }
  } catch (error: any) {
    console.error('Error testing MongoDB Atlas Data API connection:', error);
    return res.status(500).json({
      success: false,
      message: 'Error testing MongoDB Atlas Data API connection',
      error: error.message
    });
  }
} 