import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';

// Import the Studio component dynamically to avoid SSR issues
const StudioComponent = dynamic(
  () => import('../components/Studio').then((mod) => mod.default),
  { ssr: false }
);

const StudioPage: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Give the Sanity client a chance to initialize
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      <Head>
        <title>Sanity Studio | Youth Policy Forum</title>
        <meta name="description" content="Sanity Studio for Youth Policy Forum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div id="sanity">
        {isLoading ? (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100vh', 
            width: '100vw',
            flexDirection: 'column'
          }}>
            <h1>Loading Sanity Studio...</h1>
            <p>Initializing connection to Sanity API</p>
          </div>
        ) : (
          <StudioComponent />
        )}
      </div>
    </>
  );
};

export default StudioPage; 