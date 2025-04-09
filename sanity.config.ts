import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';

const config = defineConfig({
  name: 'default',
  title: 'Youth Policy Forum CMS',
  projectId: 'brt6o49p',
  dataset: 'production',
  basePath: '/studio',
  useCdn: false,
  apiVersion: '2021-06-07',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});

export default config; 