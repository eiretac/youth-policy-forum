import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

interface SearchResult {
  title: string;
  description: string;
  url: string;
  category: string;
}

export default function SearchPage() {
  const router = useRouter();
  const { q: query } = router.query;
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    // Simulated search results - replace with actual search implementation
    const demoResults: SearchResult[] = [
      {
        title: 'Education Policy',
        description: 'Our comprehensive approach to education reform and policy recommendations.',
        url: '/policy-areas#education',
        category: 'Policy Areas',
      },
      {
        title: 'Environmental Initiatives',
        description: 'Current environmental projects and policy proposals.',
        url: '/policy-areas#environment',
        category: 'Policy Areas',
      },
      {
        title: 'Get Involved',
        description: 'Ways to contribute to youth policy development.',
        url: '/get-involved#join',
        category: 'Volunteer',
      },
    ].filter(result => 
      result.title.toLowerCase().includes(query.toString().toLowerCase()) ||
      result.description.toLowerCase().includes(query.toString().toLowerCase())
    );

    // Simulate API call
    setTimeout(() => {
      setResults(demoResults);
      setLoading(false);
    }, 500);
  }, [query]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-white mb-8">
          Search Results for "{query}"
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-6">
            {results.map((result, index) => (
              <div
                key={index}
                className="bg-primary-800 rounded-lg p-6 hover:bg-primary-700 transition-colors cursor-pointer"
                onClick={() => router.push(result.url)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-2">
                      {result.title}
                    </h2>
                    <p className="text-gray-300 mb-2">{result.description}</p>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary text-white">
                      {result.category}
                    </span>
                  </div>
                  <svg
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              No results found
            </h2>
            <p className="text-gray-300">
              Try adjusting your search terms or browse our{' '}
              <button
                onClick={() => router.push('/policy-areas')}
                className="text-secondary hover:underline"
              >
                policy areas
              </button>
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
} 