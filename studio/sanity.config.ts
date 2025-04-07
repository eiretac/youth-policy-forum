import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

// Get environment variables with fallbacks
const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

// Validate required environment variables
if (!projectId) {
  console.error('Missing Sanity project ID. Please set either SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID environment variable.');
  throw new Error('Missing Sanity project ID');
}

if (!dataset) {
  console.error('Missing Sanity dataset. Please set either SANITY_DATASET or NEXT_PUBLIC_SANITY_DATASET environment variable.');
  throw new Error('Missing Sanity dataset');
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