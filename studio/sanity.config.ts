import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

const projectId = process.env.SANITY_PROJECT_ID!;
const dataset = process.env.SANITY_DATASET!;

if (!projectId) {
  throw new Error('Missing SANITY_PROJECT_ID environment variable');
}

if (!dataset) {
  throw new Error('Missing SANITY_DATASET environment variable');
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