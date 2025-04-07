import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('Connecting to database...');
    await dbConnect();
    console.log('Database connected successfully');

    // Parse the request body
    let body;
    try {
      body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      console.log('Request body:', { ...body, password: '[REDACTED]' });
    } catch (e) {
      console.error('Failed to parse request body:', e);
      return res.status(400).json({ message: 'Invalid request body' });
    }

    const { name, email, password } = body;

    // Validate input
    if (!name || !email || !password) {
      console.error('Missing required fields:', { name, email, password: password ? '[REDACTED]' : undefined });
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error('Invalid email format:', email);
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    // Validate password length
    if (password.length < 8) {
      console.error('Password too short');
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    // Check if user already exists
    console.log('Checking for existing user...');
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.error('User already exists:', email);
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Create new user
    console.log('Creating new user...');
    const user = await User.create({
      name,
      email,
      password, // Password will be hashed by the model's pre-save hook
    });
    console.log('User created successfully');

    // Remove password from response
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return res.status(201).json(userResponse);
  } catch (error: any) {
    console.error('Signup error:', error);
    
    // Handle specific error cases
    if (error.message.includes('timeout')) {
      return res.status(504).json({ 
        message: 'Request timed out. Please try again.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }

    if (error.message.includes('database')) {
      return res.status(503).json({ 
        message: 'Database service unavailable. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }

    // Log the full error object in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Full error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });
    }

    return res.status(500).json({ 
      message: 'An error occurred while creating your account. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
} 