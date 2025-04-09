import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests for security
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed. Use POST to test credentials.' 
    });
  }
  
  // Set proper headers
  res.setHeader('Content-Type', 'application/json');
  
  // Get credentials from request body
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Missing username or password in request body',
      required: {
        username: 'MongoDB username',
        password: 'MongoDB password'
      }
    });
  }
  
  // Build connection string using provided credentials
  const host = 'cluster0.uxdqspq.mongodb.net';
  const database = 'Project0';
  const connectionString = `mongodb+srv://${username}:${password}@${host}/${database}?retryWrites=true&w=majority`;
  
  // Debug info
  const debugInfo = {
    nodeEnv: process.env.NODE_ENV,
    nodeVersion: process.version,
    platform: process.platform,
    mongooseVersion: mongoose.version,
    host,
    database,
    username,
    passwordLength: password.length,
  };
  
  console.log('Testing MongoDB credentials:', {
    username,
    passwordLength: password.length,
    host,
    database
  });
  
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
    console.log('Attempting MongoDB connection with provided credentials...');
    const startTime = Date.now();
    
    const conn = await mongoose.connect(connectionString, opts);
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
      message: 'MongoDB connection successful with provided credentials',
      debug: debugInfo,
      connection: dbInfo,
      instruction: 'Update your MONGODB_URI environment variable in Vercel with these working credentials'
    });
  } catch (error: any) {
    console.error('MongoDB connection failed with provided credentials:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
    });
    
    // Return error information
    return res.status(500).json({
      success: false,
      message: 'MongoDB connection failed with provided credentials',
      error: error.message,
      errorName: error.name,
      errorCode: error.code,
      debug: debugInfo,
    });
  }
} 