import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { sanityClient } from '@/lib/sanity'; // Assuming correct path

// Define a generic search result type
interface SearchResult {
  _id: string;
  _type: string; 
  title?: string; 
  name?: string; 
  slug?: { current: string };
  excerpt?: string; // For posts
  description?: string; // For resources
  role?: string; // For team members
}

export const getServerSideProps: GetServerSideProps<{
  query: string;
  results: SearchResult[];
}> = async (context) => {
  const queryParam = context.query.q;
  const query = typeof queryParam === 'string' ? queryParam : '';
  let results: SearchResult[] = [];
  console.log(`Search Query Received: ${query}`); // Log received query

  if (query.trim()) {
    // Alternative GROQ Query using boost()
    const sanityQuery = `
      *[
        _type in ['post', 'teamMember', 'resource'] &&
        // Use boost for weighted keyword matching
        (
          boost(title match $query, 3) ||
          boost(name match $query, 3) || 
          boost(role match $query, 1) ||
          boost(excerpt match $query, 2) || 
          boost(description match $query, 2) || // Add resource description
          boost(pt::text(body) match $query, 1) ||
          boost(pt::text(bio) match $query, 1)
        )
      ]
      | score( 
          boost(title match $query, 3),
          boost(name match $query, 3),
          boost(role match $query, 1),
          boost(excerpt match $query, 2),
          boost(description match $query, 2), // Add resource description to score
          boost(pt::text(body) match $query, 1),
          boost(pt::text(bio) match $query, 1)
        )
      | order(_score desc) {
        _id,
        _type,
        _score, 
        _type == 'post' => {
          title,
          slug,
          excerpt
        },
        _type == 'teamMember' => {
          name,
          role
        },
        // Add projection for resource type
        _type == 'resource' => {
          title,
          slug,
          description
        }
      }[0...20]
    `;

    try {
      console.log('Executing Sanity Query (Boosted)...');
      // @ts-ignore - Keep ignoring for now, focus on functionality
      results = await sanityClient.fetch(sanityQuery, { query });
      console.log('Sanity Query Results:', results); // Log fetched results
    } catch (error) {
      console.error('Sanity search fetch error:', error);
      results = []; // Ensure results is empty on error
    }
  }

  return {
    props: { 
      query,
      results 
    },
  };
};

const SearchPage = ({ query, results }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const [currentQuery, setCurrentQuery] = useState(query);

  // Update state if query prop changes (e.g., from direct navigation)
  useEffect(() => {
    setCurrentQuery(query);
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(currentQuery.trim())}`);
    }
  };

  const getResultLink = (result: SearchResult): string => {
    switch (result._type) {
      case 'post':
        return `/insights/${result.slug?.current || result._id}`;
      case 'teamMember':
        return '/team'; 
      // Add case for resource
      case 'resource':
        return `/resources/${result.slug?.current || result._id}`; // Assuming resource pages exist
      default:
        return '/'; 
    }
  };

  const getResultTitle = (result: SearchResult): string => {
    // Title exists on post and resource
    return result.title || result.name || 'Untitled';
  };

  const getResultExcerpt = (result: SearchResult): string | undefined => {
    // Use excerpt for post, description for resource
    return result.excerpt || result.description;
  };

  return (
    <Layout>
      <Head>
        <title>{query ? `Search Results for "${query}"` : 'Search'} - Youth Policy Forum</title>
        <meta name="description" content={`Search results for Youth Policy Forum content${query ? ` related to "${query}"` : ''}.`} />
      </Head>

      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-primary mb-6">Search Results</h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="mb-8">
            <div className="relative">
              <input
                type="search"
                placeholder="Search the site..."
                value={currentQuery}
                onChange={(e) => setCurrentQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-lg text-gray-900"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 bottom-0 px-6 py-3 bg-secondary text-white rounded-r-lg hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1"
              >
                Search
              </button>
            </div>
          </form>

          {/* Results Area */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            {query && (
              <p className="text-gray-600 mb-6">
                Showing results for: <span className="font-semibold">"{query}"</span>
              </p>
            )}

            {results.length > 0 ? (
              <ul className="space-y-6">
                {results.map((result) => (
                  <li key={result._id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                    <Link href={getResultLink(result)} className="group">
                      <span className="text-xs uppercase font-semibold text-secondary tracking-wider mb-1 block group-hover:underline">
                        {/* Display type name */}
                        {result._type === 'teamMember' ? 'Team Member' : 
                         result._type === 'post' ? 'Insight' : 
                         result._type === 'resource' ? 'Resource' : result._type}
                      </span>
                      <h2 className="text-xl font-semibold text-primary mb-2 group-hover:underline">
                        {getResultTitle(result)}
                      </h2>
                      {getResultExcerpt(result) && (
                        <p className="text-gray-700 line-clamp-2">
                          {getResultExcerpt(result)}
                        </p>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : query ? (
              <p className="text-center text-gray-500 py-8">No results found for "{query}". Try a different search term.</p>
            ) : (
              <p className="text-center text-gray-500 py-8">Enter a term above to search the site.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage; 