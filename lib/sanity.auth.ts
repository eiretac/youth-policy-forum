import { createClient, type ClientPerspective } from '@sanity/client';

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
  withCredentials: true,
  token: process.env.SANITY_API_TOKEN,
  perspective: 'published' as ClientPerspective,
  stega: {
    enabled: false,
  },
  apiHost: 'https://btt6o49p.api.sanity.io',
  requestTagPrefix: 'sanity.studio',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
};

export const client = createClient(config);

export const previewClient = createClient({
  ...config,
  perspective: 'previewDrafts' as ClientPerspective,
});

export const getClient = (usePreview = false) => (usePreview ? previewClient : client); 