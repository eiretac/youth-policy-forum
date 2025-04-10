import fetch from 'node-fetch';

// MongoDB Atlas Data API credentials from environment variables
const DATA_API_APP_ID = process.env.MONGODB_DATA_API_APP_ID || 'mdb_sa_id_67f70514bc9ca7721076990b';
const DATA_API_API_KEY = process.env.MONGODB_DATA_API_KEY || 'mdb_sa_sk_b8LlIAC2qcdnxO7KUlRyrpLZRLphAm1IfcQ89mIK';
const DATA_API_BASE_URL = `https://data.mongodb-api.com/app/${DATA_API_APP_ID}/endpoint/data/v1`;
const CLUSTER_NAME = 'Cluster0';
const DATABASE_NAME = 'ypf_database';

// Log the configuration (with sensitive data redacted)
console.log('MongoDB Atlas Data API Configuration:', {
  hasAppId: !!DATA_API_APP_ID,
  hasApiKey: !!DATA_API_API_KEY,
  appId: DATA_API_APP_ID.substring(0, 5) + '...',
  baseUrl: DATA_API_BASE_URL.replace(DATA_API_APP_ID, DATA_API_APP_ID.substring(0, 5) + '...'),
  cluster: CLUSTER_NAME,
  database: DATABASE_NAME
});

interface AtlasApiResponse {
  success: boolean;
  error?: string;
  data?: any;
}

/**
 * Find documents in a collection using MongoDB Data API
 */
export async function findDocuments(
  collection: string, 
  filter = {}, 
  projection = {}, 
  limit = 100
): Promise<AtlasApiResponse> {
  try {
    console.log(`Finding documents in collection: ${collection} with filter:`, filter);
    
    const response = await fetch(`${DATA_API_BASE_URL}/action/find`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': DATA_API_API_KEY,
      },
      body: JSON.stringify({
        dataSource: CLUSTER_NAME,
        database: DATABASE_NAME,
        collection,
        filter,
        projection,
        limit
      }),
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { error: `HTTP error ${response.status}: ${response.statusText}` };
      }
      console.error(`MongoDB Data API error (${response.status}):`, errorData);
      return {
        success: false,
        error: errorData.error || `HTTP error ${response.status}: ${response.statusText}`,
      };
    }

    const data = await response.json();
    console.log(`Found ${data.documents?.length || 0} documents in collection: ${collection}`);
    
    return {
      success: true,
      data: data.documents,
    };
  } catch (error: any) {
    console.error('MongoDB Data API request failed:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Insert a document in a collection using MongoDB Data API
 */
export async function insertDocument(
  collection: string,
  document: any
): Promise<AtlasApiResponse> {
  try {
    console.log(`Inserting document into collection: ${collection}`);
    
    const response = await fetch(`${DATA_API_BASE_URL}/action/insertOne`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': DATA_API_API_KEY,
      },
      body: JSON.stringify({
        dataSource: CLUSTER_NAME,
        database: DATABASE_NAME,
        collection,
        document,
      }),
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { error: `HTTP error ${response.status}: ${response.statusText}` };
      }
      console.error(`MongoDB Data API error (${response.status}):`, errorData);
      return {
        success: false,
        error: errorData.error || `HTTP error ${response.status}: ${response.statusText}`,
      };
    }

    const data = await response.json();
    console.log(`Document inserted successfully into ${collection} with ID:`, data.insertedId);
    
    return {
      success: true,
      data: data.insertedId,
    };
  } catch (error: any) {
    console.error('MongoDB Data API request failed:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Test the Atlas Data API connection
 */
export async function testConnection(): Promise<AtlasApiResponse> {
  try {
    console.log('Testing MongoDB Atlas Data API connection...');
    
    // Try to ping the system by getting the databases
    const response = await fetch(`${DATA_API_BASE_URL}/action/listDatabases`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': DATA_API_API_KEY,
      },
      body: JSON.stringify({
        dataSource: CLUSTER_NAME,
      }),
    });
    
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { error: `HTTP error ${response.status}: ${response.statusText}` };
      }
      console.error(`MongoDB Atlas Data API connection test failed (${response.status}):`, errorData);
      return {
        success: false,
        error: errorData.error || `HTTP error ${response.status}: ${response.statusText}`,
      };
    }

    const data = await response.json();
    console.log('MongoDB Atlas Data API connection successful:', data);
    
    return {
      success: true,
      data: {
        databases: data.databases,
        message: 'Connection to MongoDB Atlas Data API successful'
      },
    };
  } catch (error: any) {
    console.error('MongoDB Data API connection test failed:', error);
    return {
      success: false,
      error: error.message,
    };
  }
} 