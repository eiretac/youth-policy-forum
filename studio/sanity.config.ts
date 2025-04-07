import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

// Get environment variables
const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || 'production';

// Debug environment variables
console.log('Environment Variables Debug:');
console.log('SANITY_PROJECT_ID:', projectId);
console.log('SANITY_DATASET:', dataset);

// Validate required environment variables
if (!projectId) {
  console.error('Missing Sanity project ID. Please set SANITY_PROJECT_ID environment variable.');
  throw new Error('Missing Sanity project ID');
}

export default defineConfig({
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