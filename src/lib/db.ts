import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Log the connection string (with sensitive info redacted)
const redactedUri = MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@');
console.log('MongoDB connection string:', redactedUri);

interface GlobalWithMongoose {
  mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

declare const global: GlobalWithMongoose;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

export async function dbConnect() {
  if (cached.conn) {
    console.log('Using cached database connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 15000, // Increased from 10000
      socketTimeoutMS: 60000, // Increased from 45000
      connectTimeoutMS: 15000, // Increased from 10000
      maxPoolSize: 10,
      minPoolSize: 5,
      retryWrites: true,
      retryReads: true,
      // Add keepAlive to prevent connection closing
      keepAlive: true,
      keepAliveInitialDelay: 300000, // 5 minutes
    };

    console.log('Creating new database connection with options:', JSON.stringify(opts));
    
    try {
      cached.promise = mongoose.connect(MONGODB_URI as string, opts)
        .then((mongoose) => {
          console.log('Database connection established successfully');
          
          // Handle connection events
          mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
          });
          
          mongoose.connection.on('disconnected', () => {
            console.warn('MongoDB disconnected, attempting to reconnect');
            cached.promise = null; // Reset promise to attempt reconnection on next request
          });
          
          return mongoose;
        });
    } catch (initError) {
      console.error('Failed to initialize database connection:', initError);
      cached.promise = null;
      throw initError;
    }
  }

  try {
    cached.conn = await cached.promise;
  } catch (e: any) {
    console.error('Failed to establish database connection:', e);
    console.error('Connection error details:', e.name, e.message);
    if (e.name === 'MongoServerSelectionError') {
      console.error('MongoDB server selection failed. Check network connectivity and MongoDB Atlas settings.');
    }
    cached.promise = null;
    throw new Error(`Failed to connect to database: ${e.message}`);
  }

  return cached.conn;
} 