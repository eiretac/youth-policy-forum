import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Log the connection string (with sensitive info redacted)
console.log('Attempting to connect to MongoDB with URI:', MONGODB_URI.replace(/\/\/[^@]+@/, '//***:***@'));

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
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      maxPoolSize: 10,
      minPoolSize: 5,
      retryWrites: true,
      retryReads: true,
    };

    console.log('Creating new database connection with options:', opts);
    cached.promise = mongoose.connect(MONGODB_URI as string, opts)
      .then((mongoose) => {
        console.log('Database connection established successfully');
        return mongoose;
      })
      .catch((error) => {
        console.error('Database connection failed:', error);
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    console.error('Failed to establish database connection:', e);
    cached.promise = null;
    const errorMessage = e instanceof Error ? e.message : 'Unknown error occurred';
    throw new Error(`Failed to connect to database: ${errorMessage}`);
  }

  return cached.conn;
} 