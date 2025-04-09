import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set proper headers
  res.setHeader('Content-Type', 'application/json');
  
  // Debug info
  const debugInfo = {
    nodeEnv: process.env.NODE_ENV,
    nodeVersion: process.version,
    platform: process.platform,
    mongooseVersion: mongoose.version,
    hasMongoDB: !!process.env.MONGODB_URI,
    mongoDbUri: process.env.MONGODB_URI ? 
      process.env.MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@') : 
      'Not configured',
  };
  
  console.log('DB Test Direct API called', debugInfo);
  
  try {
    // Disconnect any existing connection
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log('Disconnected from existing MongoDB connection');
    }
    
    // Basic connection options
    const opts = {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 15000,
    };
    
    // Direct connect without using the shared connection
    console.log('Attempting direct MongoDB connection...');
    const startTime = Date.now();
    
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set');
    }
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, opts);
    const connectionTime = Date.now() - startTime;
    
    // Get connection info
    const dbInfo = {
      host: conn.connection.host,
      port: conn.connection.port,
      name: conn.connection.name,
      connectionTime: `${connectionTime}ms`,
      readyState: conn.connection.readyState,
    };
    
    // Clean up - disconnect after test
    await mongoose.disconnect();
    console.log('Test complete, disconnected from MongoDB');
    
    // Return success
    return res.status(200).json({
      success: true,
      message: 'Direct MongoDB connection successful',
      debug: debugInfo,
      connection: dbInfo,
    });
  } catch (error: any) {
    console.error('Direct MongoDB connection failed:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
    });
    
    // Return error information
    return res.status(500).json({
      success: false,
      message: 'MongoDB connection failed',
      error: error.message,
      errorName: error.name,
      errorCode: error.code,
      debug: debugInfo,
    });
  }
} 