/**
 * This file provides setup for client-side authentication with Sanity
 */
import { createClient } from '@sanity/client';

const defaultConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'brt6o49p',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2021-06-07',
  useCdn: false,
  withCredentials: true,
  token: process.env.SANITY_API_TOKEN,
};

let client = createClient(defaultConfig);

export const getClient = async () => {
  try {
    const response = await fetch('/api/auth');
    const data = await response.json();

    if (data.authenticated) {
      client = createClient({
        ...defaultConfig,
        projectId: data.projectId,
        dataset: data.dataset,
        token: data.apiToken,
      });
    }

    return client;
  } catch (error) {
    console.error('Failed to initialize Sanity client:', error);
    return client;
  }
}; 