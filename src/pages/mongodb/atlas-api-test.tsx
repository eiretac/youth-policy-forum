import React, { useState } from 'react';
import Head from 'next/head';
import { useTheme } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MongoDBAtlasAPITest() {
  const { isDarkMode } = useTheme();
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testConnection = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/mongodb-atlas-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clientId, clientSecret }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to connect to MongoDB Atlas. Please check your credentials.');
      } else {
        setResult(data);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again later.');
      console.error('Error testing MongoDB connection:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Head>
        <title>MongoDB Atlas API Connection Test | Youth Policy Forum</title>
        <meta name="description" content="Test your MongoDB Atlas Data API connection" />
      </Head>

      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <div className={`rounded-lg shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h1 className="text-2xl font-bold mb-6">MongoDB Atlas Data API Connection Test</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Connection Instructions</h2>
            <ol className={`list-decimal pl-5 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li className="mb-2">Log in to your <a href="https://cloud.mongodb.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">MongoDB Atlas account</a></li>
              <li className="mb-2">Navigate to "Data API" in the left sidebar</li>
              <li className="mb-2">Create a new API Key (or use an existing one)</li>
              <li className="mb-2">Copy your "API Key" and paste it in the "Client Secret" field below</li>
              <li className="mb-2">Copy your "App ID" and paste it in the "Client ID" field below</li>
            </ol>
          </div>

          <form onSubmit={testConnection} className="mb-6 space-y-4">
            <div>
              <label htmlFor="clientId" className="block mb-1 font-medium">
                Client ID (App ID)
              </label>
              <input
                id="clientId"
                type="text"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                placeholder="Enter your MongoDB Atlas App ID"
                required
              />
            </div>

            <div>
              <label htmlFor="clientSecret" className="block mb-1 font-medium">
                Client Secret (API Key)
              </label>
              <input
                id="clientSecret"
                type="password"
                value={clientSecret}
                onChange={(e) => setClientSecret(e.target.value)}
                className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                placeholder="Enter your MongoDB Atlas API Key"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded font-medium ${
                loading
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
            >
              {loading ? 'Testing Connection...' : 'Test Connection'}
            </button>
          </form>

          {error && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-red-500 mb-2">Connection Error</h3>
              <div className={`p-4 rounded ${isDarkMode ? 'bg-red-900/30' : 'bg-red-100'} border ${isDarkMode ? 'border-red-800' : 'border-red-300'}`}>
                <p className="text-red-600">{error}</p>
              </div>
            </div>
          )}

          {result && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-green-500 mb-2">Connection Successful</h3>
              <div className={`p-4 rounded ${isDarkMode ? 'bg-green-900/30' : 'bg-green-100'} border ${isDarkMode ? 'border-green-800' : 'border-green-300'}`}>
                <p className="mb-2">{result.message}</p>
                {result.data && (
                  <div>
                    <p className="font-medium mb-1">Response Data:</p>
                    <pre className={`overflow-auto p-2 rounded ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="mt-8 pt-4 border-t border-gray-300">
            <h3 className="text-lg font-semibold mb-2">Important Notes</h3>
            <ul className={`list-disc pl-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li className="mb-2">Make sure your MongoDB Atlas Data API is enabled for your project</li>
              <li className="mb-2">Check that CORS settings include your application domain</li>
              <li className="mb-2">Verify that your IP address is whitelisted in the MongoDB Atlas network settings</li>
              <li className="mb-2">The API endpoint in this test is configured to query the "posts" collection. Update the API route if needed</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 