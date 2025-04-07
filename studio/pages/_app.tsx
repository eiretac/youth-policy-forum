import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { initSanityClient } from '../sanityClientSetup';

// This initializes the Sanity Studio with our auth
function MyApp({ Component, pageProps }: AppProps) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize Sanity client on the client side
    if (typeof window !== 'undefined') {
      console.log('Initializing Sanity client...');
      initSanityClient()
        .then(client => {
          console.log('Sanity client initialized successfully');
          // Make the client available globally
          (window as any).sanityClient = client;
          setIsInitialized(true);
        })
        .catch(err => {
          console.error('Failed to initialize Sanity client:', err);
          setIsInitialized(true); // Still render the app even if auth fails
        });
    }
  }, []);

  // Show loading state while initializing
  if (!isInitialized && typeof window !== 'undefined') {
    return <div>Loading Sanity Studio...</div>;
  }

  return <Component {...pageProps} />;
}

export default MyApp; 