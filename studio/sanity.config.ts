import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

// Get environment variables with fallbacks
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || 'brt6o49p';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'production';
const apiToken = process.env.SANITY_API_TOKEN;

// Debug environment variables
console.log('Environment Variables Debug:');
console.log('NEXT_PUBLIC_SANITY_PROJECT_ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
console.log('SANITY_PROJECT_ID:', process.env.SANITY_PROJECT_ID);
console.log('Using projectId:', projectId);
console.log('Using dataset:', dataset);
console.log('API Token present:', !!apiToken);

// Validate required environment variables
if (!projectId) {
  console.error('Missing Sanity project ID. Please set SANITY_PROJECT_ID environment variable.');
  throw new Error('Missing Sanity project ID');
}

const config = defineConfig({
  name: 'default',
  title: 'Youth Policy Forum CMS',
  projectId,
  dataset,
  basePath: '/studio',
  useCdn: false,
  apiVersion: '2021-06-07',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
  // Add token for authenticated requests
  token: apiToken,
});

export default config; 