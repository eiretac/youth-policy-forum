import bcrypt from 'bcryptjs';

// User interface
export interface IAtlasUser {
  _id?: string;
  email: string;
  password: string;
  name: string;
  role: 'member' | 'admin';
  createdAt: Date;
}

// These are the fields we want to use when creating a new user
export interface CreateUserInput {
  email: string;
  password: string;
  name: string;
  role?: 'member' | 'admin';
}

// User schema fields - this mirrors the mongoose schema
export const userSchemaFields = {
  email: { type: 'string', required: true },
  password: { type: 'string', required: true },
  name: { type: 'string', required: true },
  role: { type: 'string', enum: ['member', 'admin'], default: 'member' },
  createdAt: { type: 'date', default: new Date() }
};

/**
 * Find a user by email
 */
export async function findUserByEmail(email: string): Promise<IAtlasUser | null> {
  try {
    // Import here to avoid circular dependencies
    const { findDocuments } = await import('../lib/mongoAtlasApi');
    
    const result = await findDocuments(
      'users', 
      { email: email.toLowerCase() }
    );

    if (!result.success || !result.data || result.data.length === 0) {
      return null;
    }

    return result.data[0] as IAtlasUser;
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  }
}

/**
 * Create a new user
 */
export async function createUser(userData: CreateUserInput): Promise<IAtlasUser> {
  try {
    // Import here to avoid circular dependencies
    const { insertDocument } = await import('../lib/mongoAtlasApi');
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    
    // Create the user document
    const newUser = {
      email: userData.email.toLowerCase(),
      password: hashedPassword,
      name: userData.name,
      role: userData.role || 'member',
      createdAt: new Date()
    };
    
    const result = await insertDocument('users', newUser);
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to create user');
    }
    
    // Return the user without the password
    const { password, ...userWithoutPassword } = newUser;
    return {
      ...userWithoutPassword,
      _id: result.data,
      password: '[REDACTED]'
    } as IAtlasUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

/**
 * Compare a plaintext password with a user's hashed password
 */
export async function comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw error;
  }
} 