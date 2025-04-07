/**
 * This file provides setup for client-side authentication with Sanity
 */
import { createClient } from '@sanity/client';

// Initialize with default values
let clientConfig: any = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'btt6o49p',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
};

// Function to initialize Sanity client
export const initSanityClient = async () => {
  try {
    // Fetch auth info from our API
    const response = await fetch('/api/auth');
    const data = await response.json();
    
    // Update with fresh data from API
    clientConfig = {
      ...clientConfig,
      projectId: data.projectId,
      dataset: data.dataset,
      token: data.apiToken,
    };
    
    // Log authentication status
    console.log('Sanity authentication status:', data.authenticated ? 'Authenticated' : 'Not authenticated');
    
    return createClient(clientConfig);
  } catch (error) {
    console.error('Failed to initialize Sanity client:', error);
    return createClient(clientConfig);
  }
}; 