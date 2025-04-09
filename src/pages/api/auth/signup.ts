import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '@/lib/db';
import User from '@/models/User';
import { hash } from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
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
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const { name, email, password } = body;

    // Validate input
    if (!name || !email || !password) {
      console.error('Missing required fields:', { name, email, password: password ? '[REDACTED]' : undefined });
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error('Invalid email format:', email);
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    // Validate password length
    if (password.length < 8) {
      console.error('Password too short');
      return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    // Check if user already exists
    console.log('Checking for existing user...');
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.error('User already exists:', email);
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create new user
    console.log('Creating new user...');
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
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
      return res.status(504).json({ error: 'Request timed out. Please try again.' });
    }

    if (error.message.includes('database')) {
      return res.status(503).json({ error: 'Database service unavailable. Please try again later.' });
    }

    // Generic error response
    return res.status(500).json({ error: 'An error occurred while creating your account. Please try again.' });
  }
} 