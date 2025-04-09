import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  role: 'member' | 'admin';
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Check if model already exists to prevent duplicate model errors
// This is crucial for hot-reloading in development and serverless environments
const userSchema = 
  mongoose.models.User?.schema ||
  new mongoose.Schema({
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [8, 'Password must be at least 8 characters long'],
      select: false,
    },
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    role: {
      type: String,
      enum: ['member', 'admin'],
      default: 'member',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

// Only add methods and hooks if we're creating a new schema
if (!mongoose.models.User) {
  // Hash password before saving
  userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password as string, salt);
      next();
    } catch (error: any) {
      next(error);
    }
  });

  // Method to compare password
  userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
      throw error;
    }
  };
}

// Create or retrieve existing model
// Using function to create dynamic model name
// in case we need to test different connection strings
const getUserModel = () => {
  try {
    return mongoose.models.User || mongoose.model<IUser>('User', userSchema);
  } catch (error) {
    console.error('Error getting User model:', error);
    // Even if there's an error, still try to return existing model
    return mongoose.models.User;
  }
};

export default getUserModel(); 