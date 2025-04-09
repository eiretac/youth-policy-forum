import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '../../lib/db';
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
    hasNextAuth: !!process.env.NEXTAUTH_SECRET && !!process.env.NEXTAUTH_URL,
  };
  
  console.log('DB Test API called', debugInfo);
  
  try {
    // Test MongoDB connection
    console.log('Testing MongoDB connection...');
    const startTime = Date.now();
    await dbConnect();
    const connectionTime = Date.now() - startTime;
    
    // Get MongoDB stats
    const stats = {
      isConnected: mongoose.connection.readyState === 1,
      connectionTime: `${connectionTime}ms`,
      dbName: mongoose.connection.db?.databaseName,
      models: Object.keys(mongoose.models),
    };
    
    // Return success with debug info
    return res.status(200).json({
      success: true,
      message: 'Database connection successful',
      debug: debugInfo,
      stats,
    });
  } catch (error: any) {
    // Detailed error logging
    console.error('Database connection test failed:', error);
    console.error('Error stack:', error.stack);
    
    // Return error with detailed information
    return res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: error.message,
      errorName: error.name,
      errorCode: error.code,
      debug: debugInfo,
    });
  }
} 