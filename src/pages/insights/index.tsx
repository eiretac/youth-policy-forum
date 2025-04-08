import { GetStaticProps } from 'next';
import Link from 'next/link';
import { sanityClient } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';
import { Post } from '@/types';
import Layout from '@/components/Layout';
import Head from 'next/head';

interface InsightsProps {
  posts: Post[];
}

export default function Insights({ posts }: InsightsProps) {
  return (
    <Layout>
      <Head>
        <title>Insights - Youth Policy Forum</title>
        <meta 
          name="description" 
          content="Explore our latest insights on youth policy, research, and advocacy." 
        />
      </Head>

      {/* Hero Section */}
      <section className="relative bg-gray-900 py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Insights & Analysis
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              In-depth analysis and perspectives on youth policy issues, research findings, and advocacy initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link 
                key={post._id} 
                href={`/insights/${post.slug.current}`}
                className="block transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
                  {post.mainImage ? (
                    <div className="relative h-48">
                      <img
                        src={urlFor(post.mainImage).url()}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <span className="text-primary/40 text-4xl font-bold">YPF</span>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="text-sm text-secondary font-medium mb-2">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-gray-600 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    excerpt
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
    revalidate: 60,
  };
}; 