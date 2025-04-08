import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
  name: 'default',
  title: 'Youth Policy Forum CMS',
  projectId: 'your-project-id',
  dataset: 'production',
  basePath: '/admin',
  api: {
    cors: {
      credentials: true,
      origin: ['https://ypf-studio.vercel.app']
    }
  },
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
}); 