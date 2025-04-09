import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MongoDBAtlasTest() {
  const { isDarkMode } = useTheme();
  const [testResult, setTestResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTestConnection = async () => {
    setIsLoading(true);
    setError('');
    setTestResult(null);
    
    try {
      const response = await fetch('/api/atlas-api-test');
      const data = await response.json();
      
      if (data.success) {
        setTestResult(data);
      } else {
        setError(data.error || 'Unknown error occurred');
      }
    } catch (err) {
      setError('Failed to test connection: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <div className="container mx-auto p-8">
          <h1 className="text-3xl font-bold mb-6">MongoDB Atlas Data API Test</h1>
          
          <div className="mb-8">
            <button
              onClick={handleTestConnection}
              disabled={isLoading}
              className={`${
                isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
              } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out`}
            >
              {isLoading ? 'Testing...' : 'Test Atlas Data API Connection'}
            </button>
          </div>
          
          {error && (
            <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              <p className="font-bold">Error:</p>
              <p>{error}</p>
            </div>
          )}
          
          {testResult && (
            <div className={`mb-8 p-4 rounded ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <h2 className="text-xl font-bold mb-4">Connection Result:</h2>
              <pre className={`p-4 rounded overflow-auto ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                {JSON.stringify(testResult, null, 2)}
              </pre>
            </div>
          )}
          
          <div className={`mb-8 p-4 rounded ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <h2 className="text-xl font-bold mb-4">Environment Information</h2>
            <p>This page tests the connection to MongoDB Atlas using the Data API.</p>
            <p className="mt-2">Make sure the following environment variables are set in your Vercel project:</p>
            <ul className="list-disc list-inside mt-2 ml-4">
              <li><code>MONGODB_DATA_API_APP_ID</code></li>
              <li><code>MONGODB_DATA_API_KEY</code></li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 