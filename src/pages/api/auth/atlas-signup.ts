import type { NextApiRequest, NextApiResponse } from 'next';
import { findUserByEmail, createUser } from '../../../models/AtlasUser';
import { testConnection } from '../../../lib/mongoAtlasApi';

// Define a function to safely end the response
const safeResponse = (res: NextApiResponse, statusCode: number, data: any) => {
  try {
    // Always set proper content type
    res.setHeader('Content-Type', 'application/json');
    return res.status(statusCode).json(data);
  } catch (error) {
    console.error('Error sending response:', error);
    // If we can't send the detailed response, try a minimal one
    try {
      res.setHeader('Content-Type', 'application/json');
      return res.status(statusCode).json({ success: false, error: 'Server error' });
    } catch (e) {
      // Last resort - end the response without JSON
      console.error('Fatal error sending any response:', e);
      return res.status(500).end();
    }
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Atlas Signup API called with method:', req.method);
  
  // Debug environment variables
  console.log('Environment variables check:', {
    nodeEnv: process.env.NODE_ENV,
    hasAppId: !!process.env.MONGODB_DATA_API_APP_ID,
    hasApiKey: !!process.env.MONGODB_DATA_API_KEY,
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
  });
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Always set content type for all responses
  res.setHeader('Content-Type', 'application/json');

  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS preflight request');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    return safeResponse(res, 405, { success: false, error: 'Method not allowed' });
  }

  try {
    // Test MongoDB Atlas connection first
    console.log('Testing MongoDB Atlas connection...');
    const connectionTest = await testConnection();
    
    if (!connectionTest.success) {
      console.error('MongoDB Atlas connection test failed:', connectionTest.error);
      return safeResponse(res, 503, { 
        success: false, 
        error: 'Failed to connect to the database. Please try again later.' 
      });
    }
    
    console.log('MongoDB Atlas connection successful');

    // Parse the request body
    let body;
    try {
      body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      console.log('Request body parsed:', { ...body, password: body.password ? '[REDACTED]' : undefined });
    } catch (e) {
      console.error('Failed to parse request body:', e);
      return safeResponse(res, 400, { success: false, error: 'Invalid request body' });
    }

    const { name, email, password } = body;

    // Validate input
    if (!name || !email || !password) {
      console.error('Missing required fields:', { 
        hasName: !!name, 
        hasEmail: !!email, 
        hasPassword: !!password 
      });
      return safeResponse(res, 400, { success: false, error: 'Please provide all required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error('Invalid email format:', email);
      return safeResponse(res, 400, { success: false, error: 'Please provide a valid email address' });
    }

    // Validate password length
    if (password.length < 8) {
      console.error('Password too short');
      return safeResponse(res, 400, { success: false, error: 'Password must be at least 8 characters long' });
    }

    // Check if user already exists
    console.log('Checking for existing user...');
    let existingUser = null;
    try {
      existingUser = await findUserByEmail(email);
    } catch (findError) {
      console.error('Failed to check for existing user:', findError);
      return safeResponse(res, 503, { 
        success: false, 
        error: 'Database operation failed. Please try again later.' 
      });
    }
    
    if (existingUser) {
      console.error('User already exists:', email);
      return safeResponse(res, 400, { success: false, error: 'User with this email already exists' });
    }

    // Create new user
    console.log('Creating new user...');
    try {
      const user = await createUser({
        name,
        email,
        password,
        role: 'member', // Set default role
      });
      
      console.log('User created successfully with ID:', user._id);

      // Remove password from response
      const userResponse = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      // Return success response
      console.log('Sending success response');
      return safeResponse(res, 201, {
        success: true,
        user: userResponse,
        message: 'Account created successfully',
      });
    } catch (createError) {
      console.error('Failed to create user:', createError);
      return safeResponse(res, 503, { 
        success: false, 
        error: 'Failed to create user account. Please try again later.' 
      });
    }
  } catch (error: any) {
    console.error('Signup error:', error);
    console.error('Error stack:', error.stack);
    
    // Handle specific error cases
    if (error.message?.includes('timeout')) {
      return safeResponse(res, 504, { 
        success: false,
        error: 'Request timed out. Please try again.' 
      });
    }

    return safeResponse(res, 500, { 
      success: false,
      error: 'An unexpected error occurred. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
} 