import { createClient } from '@sanity/client';

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
  withCredentials: true,
  token: process.env.SANITY_API_TOKEN,
};

export const client = createClient(config);

export const previewClient = createClient({
  ...config,
  perspective: 'previewDrafts',
});

export const getClient = (usePreview = false) => (usePreview ? previewClient : client); 