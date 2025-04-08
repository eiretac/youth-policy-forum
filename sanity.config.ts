import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
  name: 'default',
  title: 'Youth Policy Forum CMS',
  projectId: 'btt6o49p',
  dataset: 'production',
  basePath: '/admin',
  useCdn: false,
  apiVersion: '2021-06-07',
  api: {
    cors: {
      credentials: true,
      origin: [
        'http://localhost:3000',
        'http://localhost:3333',
        'https://ypf-studio.vercel.app',
        'https://youth-policy-forum.vercel.app'
      ]
    }
  },
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
}); 