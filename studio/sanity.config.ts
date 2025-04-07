import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

// Get environment variables with fallbacks
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || 'btt6o49p';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'production';

// Debug environment variables
console.log('Environment Variables Debug:');
console.log('NEXT_PUBLIC_SANITY_PROJECT_ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
console.log('SANITY_PROJECT_ID:', process.env.SANITY_PROJECT_ID);
console.log('Using projectId:', projectId);
console.log('Using dataset:', dataset);

// Validate required environment variables
if (!projectId) {
  console.error('Missing Sanity project ID. Please set SANITY_PROJECT_ID environment variable.');
  throw new Error('Missing Sanity project ID');
}

const config = defineConfig({
  name: 'youth-policy-forum',
  title: 'Youth Policy Forum',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});

export default config; 