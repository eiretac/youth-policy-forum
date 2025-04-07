import React, { useEffect } from 'react';
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from '../schemas';

const Studio = () => {
  useEffect(() => {
    // Dynamically import and initialize the Studio
    const loadStudio = async () => {
      try {
        const { renderStudio } = await import('sanity');
        
        // Use our global client config if available, or fall back to defaults
        const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'btt6o49p';
        const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
        
        const config = defineConfig({
          name: 'youth-policy-forum',
          title: 'Youth Policy Forum',
          projectId,
          dataset,
          plugins: [deskTool(), visionTool()],
          schema: {
            types: schemaTypes,
          },
          // Use token from our global client if available
          token: (window as any).sanityClient?.config?.token,
        });
        
        // Render the studio
        renderStudio(
          document.getElementById('sanity') || document.body,
          config
        );
        
        console.log('Sanity Studio rendered successfully');
      } catch (error) {
        console.error('Failed to load Sanity Studio:', error);
      }
    };
    
    loadStudio();
  }, []);
  
  return null; // The studio will replace this component's DOM node
};

export default Studio; 