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
  _type: string; // To identify the type (post, teamMember, etc.)
  title?: string; // Common field
  name?: string; // For team members
  slug?: { current: string };
  excerpt?: string;
  // Add other relevant fields you might want to display
}

export const getServerSideProps: GetServerSideProps<{
  query: string;
  results: SearchResult[];
}> = async (context) => {
  const queryParam = context.query.q;
  const query = typeof queryParam === 'string' ? queryParam : '';
  let results: SearchResult[] = [];

  if (query.trim()) {
    // GROQ query to search across multiple types and fields
    // Adjust types and fields based on your schemas
    const sanityQuery = `
      *[
        _type in ['post', 'teamMember'] && 
        ( 
          title match $query + '*' || 
          (name match $query + '*') || 
          (role match $query + '*') || 
          (excerpt match $query + '*') || 
          (pt::text(bio) match $query + '*') || 
          (pt::text(body) match $query + '*') 
        ) | score( 
          title match $query + '*', 
          name match $query + '*', 
          excerpt match $query + '*',
          pt::text(body) match $query + '*', 
          pt::text(bio) match $query + '*' 
        ) | order(_score desc) {
        _id,
        _type,
        // Projections for different types
        _type == 'post' => {
          title,
          slug,
          excerpt
        },
        _type == 'teamMember' => {
          name,
          role
          // Don't need slug for team page usually
        }
        // Add projections for other searchable types
      }[0...20] // Limit results
    `;

    try {
      // @ts-ignore - Temporarily ignore type error to commit base structure
      results = await sanityClient.fetch(sanityQuery, { query });
    } catch (error) {
      console.error('Sanity search fetch error:', error);
      // Handle error appropriately, maybe return an error prop
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
        return '/team'; // Link to the main team page
      // Add cases for other types
      default:
        return '/'; // Fallback link
    }
  };

  const getResultTitle = (result: SearchResult): string => {
    return result.title || result.name || 'Untitled';
  };

  const getResultExcerpt = (result: SearchResult): string | undefined => {
    return result.excerpt; // Add logic for other types if needed
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
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-lg"
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
                        {result._type === 'teamMember' ? 'Team Member' : result._type} 
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