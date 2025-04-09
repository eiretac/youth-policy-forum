import mongoose from 'mongoose';

// Set mongoose options globally
mongoose.set('strictQuery', false);

const MONGODB_URI = process.env.MONGODB_URI;

// Verify the MongoDB URI exists
if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in environment variables');
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Log the connection string (with sensitive info redacted)
const redactedUri = MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@');
console.log('MongoDB connection string:', redactedUri);

// Configure DNS caching to improve performance (Node.js DNS defaults can be problematic)
try {
  // Only run in production to avoid local dev issues
  if (process.env.NODE_ENV === 'production') {
    // This helps with DNS resolution issues in some environments
    const dns = require('dns');
    dns.setDefaultResultOrder('ipv4first');
    console.log('Set DNS resolution order to ipv4first');
  }
} catch (e) {
  console.warn('Could not configure DNS settings:', e);
}

interface GlobalWithMongoose {
  mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
    retryCount: number;
  };
}

declare const global: GlobalWithMongoose;

// Initialize the cached connection
if (!global.mongoose) {
  global.mongoose = {
    conn: null,
    promise: null,
    retryCount: 0
  };
}

let cached = global.mongoose;

// Maximum number of connection retries
const MAX_RETRIES = 3;

export async function dbConnect() {
  // If we already have a connection, use it
  if (cached.conn) {
    console.log('Using cached database connection');
    return cached.conn;
  }

  // If too many retries, wait longer between attempts
  const retryDelay = Math.min(1000 * Math.pow(2, cached.retryCount), 10000);
  
  if (cached.retryCount > 0) {
    console.log(`Connection retry #${cached.retryCount}, waiting ${retryDelay}ms before attempting...`);
    await new Promise(resolve => setTimeout(resolve, retryDelay));
  }

  // If retries exceeded, throw an error
  if (cached.retryCount >= MAX_RETRIES) {
    console.error(`Maximum connection retries (${MAX_RETRIES}) exceeded`);
    throw new Error(`Failed to connect to MongoDB after ${MAX_RETRIES} attempts`);
  }

  // Only create a new connection promise if one doesn't exist
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 30000, // Allow more time for server selection
      socketTimeoutMS: 60000,          // Allow longer socket timeouts
      connectTimeoutMS: 30000,         // Allow more time for initial connection
      maxPoolSize: 20,                 // Increase for better concurrency
      minPoolSize: 5,
      family: 4,                       // Force IPv4
      retryWrites: true,
      retryReads: true,
      keepAlive: true,
      keepAliveInitialDelay: 300000,   // 5 minutes
      autoIndex: process.env.NODE_ENV !== 'production', // Don't build indexes in production
    };

    console.log('Creating new database connection with options:', JSON.stringify(opts));
    
    try {
      // Store a reference to the connection promise
      cached.promise = mongoose.connect(MONGODB_URI as string, opts)
        .then((mongoose) => {
          console.log('Database connection established successfully');
          
          // Reset retry count on successful connection
          cached.retryCount = 0;
          
          // Handle connection events
          mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
          });
          
          mongoose.connection.on('disconnected', () => {
            console.warn('MongoDB disconnected, will reconnect on next request');
            cached.conn = null;
            cached.promise = null;
          });
          
          return mongoose;
        })
        .catch((error) => {
          console.error('MongoDB connection failed:', error);
          cached.promise = null; // Clear the promise for next attempt
          cached.retryCount++;   // Increment retry counter
          throw error;           // Re-throw the error
        });
    } catch (initError) {
      console.error('Failed to initialize database connection:', initError);
      cached.promise = null;
      cached.retryCount++;
      throw initError;
    }
  }

  try {
    cached.conn = await cached.promise;
  } catch (e: any) {
    console.error('Failed to establish database connection:', e);
    console.error('Connection error details:', e.name, e.message);
    
    if (e.name === 'MongoServerSelectionError') {
      console.error('MongoDB server selection failed. This could be due to network connectivity or MongoDB Atlas settings.');
    }
    
    // Reset promise but keep retry counter
    cached.promise = null;
    
    // Create a more helpful error message
    const errorMessage = `MongoDB connection error (attempt ${cached.retryCount}/${MAX_RETRIES}): ${e.message}`;
    throw new Error(errorMessage);
  }

  return cached.conn;
} 