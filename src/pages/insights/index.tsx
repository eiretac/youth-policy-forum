import { GetStaticProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { sanityClient, urlFor } from '@/lib/sanity';
import { Post, Category } from '@/types';
import Layout from '@/components/Layout';
import Head from 'next/head';
import { useState } from 'react';

interface InsightsProps {
  posts: Post[];
  categories: Category[];
}

export default function Insights({ posts, categories }: InferGetServerSidePropsType<typeof getStaticProps>) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const filteredPosts = selectedCategory === 'all' 
    ? posts
    : posts.filter(post => 
        post.categories && post.categories.some(cat => cat._id === selectedCategory)
      );

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

      {/* Filters and Posts Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter Buttons */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === 'all' 
                  ? 'bg-secondary text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => setSelectedCategory(category._id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category._id 
                    ? 'bg-secondary text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>

          {/* Posts Grid - Use filteredPosts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
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
              ))
            ) : (
              <p className="text-center text-gray-500 md:col-span-2 lg:col-span-3 py-8">No insights found for this category.</p>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<InsightsProps> = async () => {
  const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    excerpt,
    categories[]->{
      _id,
      title
    }
  }`;

  const categoriesQuery = `*[_type == "category"] | order(title asc) {
    _id,
    title
  }`;

  const [posts, categories] = await Promise.all([
    sanityClient.fetch(postsQuery),
    sanityClient.fetch(categoriesQuery)
  ]);

  return {
    props: {
      posts,
      categories,
    },
    revalidate: 60,
  };
}; 