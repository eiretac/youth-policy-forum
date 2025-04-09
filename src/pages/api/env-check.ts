import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set proper headers
  res.setHeader('Content-Type', 'application/json');
  
  // Return environment variable documentation
  return res.status(200).json({
    success: true,
    message: 'Environment variable reference guide',
    mongodbHelp: {
      description: 'MongoDB connection string format',
      example: 'mongodb+srv://username:password@hostname/database?retryWrites=true&w=majority',
      commonIssues: [
        'Extra characters at the beginning (like an = sign)',
        'Using directConnection=true with SRV format',
        'Special characters in password not properly URL-encoded',
        'IP access restriction in MongoDB Atlas'
      ],
      correctFormat: 'Make sure your MONGODB_URI starts with exactly "mongodb+srv://" with no extra characters'
    },
    nextAuthHelp: {
      description: 'NextAuth configuration',
      requiredVars: [
        'NEXTAUTH_URL - should match your deployment URL',
        'NEXTAUTH_SECRET - secure random string for authentication'
      ],
      note: 'Changes to environment variables require redeployment in Vercel'
    }
  });
} 