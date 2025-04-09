import { useState } from 'react';
import Head from 'next/head';

export default function MongoDBTest() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testConnection = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/db-cred-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      setResult(data);
      
      if (!data.success) {
        setError(data.error || 'Connection failed');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      console.error('Error testing connection:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>MongoDB Credential Tester</title>
        <meta name="description" content="Test MongoDB credentials" />
      </Head>

      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">MongoDB Credential Tester</h1>
        
        <form onSubmit={testConnection} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              MongoDB Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Enter MongoDB username"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              MongoDB Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Enter MongoDB password"
            />
          </div>
          
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Testing...' : 'Test Connection'}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 bg-red-50 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Connection Failed</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {result && (
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-900">
              {result.success ? 'Connection Successful! ✅' : 'Connection Failed ❌'}
            </h3>
            
            {result.success && (
              <div className="mt-2 p-3 bg-green-50 rounded-md">
                <p className="text-sm text-green-700">
                  <strong>Instructions:</strong> {result.instruction}
                </p>
                <pre className="mt-2 p-2 bg-gray-800 text-green-400 rounded text-xs overflow-auto">
                  {`mongodb+srv://${result.debug.username}:******@${result.debug.host}/${result.debug.database}?retryWrites=true&w=majority`}
                </pre>
                <div className="mt-2">
                  <p className="text-xs text-gray-500">Connection time: {result.connection?.connectionTime}</p>
                </div>
              </div>
            )}
            
            {!result.success && (
              <div className="mt-2 p-3 bg-red-50 rounded-md">
                <p className="text-sm text-red-700">
                  <strong>Error:</strong> {result.error}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  <strong>Error type:</strong> {result.errorName}
                </p>
              </div>
            )}
          </div>
        )}
        
        <div className="mt-6 border-t border-gray-200 pt-4">
          <h3 className="text-sm font-medium text-gray-500">How to get MongoDB credentials:</h3>
          <ol className="mt-2 text-xs text-gray-500 list-decimal pl-5 space-y-1">
            <li>Log in to MongoDB Atlas (https://cloud.mongodb.com)</li>
            <li>Go to Database Access under Security</li>
            <li>Find your user or create a new one</li>
            <li>Reset the password if needed</li>
            <li>Make sure your user has the appropriate permissions</li>
            <li>Ensure your IP is allowed in the Network Access settings</li>
          </ol>
        </div>
      </div>
    </div>
  );
} 