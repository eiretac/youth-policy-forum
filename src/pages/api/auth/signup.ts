import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '@/lib/db';
import User from '@/models/User';
import { hash } from 'bcryptjs';

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
  console.log('Signup API called with method:', req.method);
  
  // Debug environment variables
  console.log('Environment variables check:', {
    nodeEnv: process.env.NODE_ENV,
    hasMongoDB: !!process.env.MONGODB_URI,
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
    console.log('Connecting to database with URI:', process.env.MONGODB_URI ? 'URI exists' : 'URI is missing');
    
    // Add timing information to diagnose slowness
    const dbStartTime = Date.now();
    try {
      await dbConnect();
      console.log(`Database connected successfully in ${Date.now() - dbStartTime}ms`);
    } catch (error: any) {
      console.error('Database connection failed:', error);
      console.error('Database error stack:', error.stack);
      return safeResponse(res, 503, {
        success: false,
        error: 'Database service unavailable. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }

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
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.error('User already exists:', email);
      return safeResponse(res, 400, { success: false, error: 'User with this email already exists' });
    }

    // Hash password
    console.log('Hashing password...');
    const hashedPassword = await hash(password, 10);
    console.log('Password hashed successfully');

    // Create new user
    console.log('Creating new user...');
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
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

    if (error.message?.includes('database') || error.name === 'MongoError' || error.name === 'MongooseError') {
      return safeResponse(res, 503, { 
        success: false,
        error: 'Database service unavailable. Please try again later.' 
      });
    }

    // Generic error response
    return safeResponse(res, 500, { 
      success: false,
      error: 'An error occurred while creating your account. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
} 