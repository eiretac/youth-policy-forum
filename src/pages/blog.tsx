import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { sanityClient, urlFor } from '@/sanity/client';
import { Post, Category } from '@/types';
import Layout from '@/components/Layout';

interface BlogProps {
  posts: Post[];
  categories: Category[];
}

type SortOption = 'newest' | 'oldest' | 'title-asc' | 'title-desc';

export default function Blog({ posts, categories }: BlogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('newest');

  const filteredPosts = posts
    .filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.excerpt?.toLowerCase() || '').includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || 
        post.categories.some(cat => cat.slug.current === selectedCategory);
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case 'newest':
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case 'oldest':
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        
        {/* Search, Filter, and Sort Section */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category.slug.current}>
                  {category.title}
                </option>
              ))}
            </select>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
            </select>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Link key={post._id} href={`/blog/${post.slug.current}`}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {post.mainImage && (
                  <img
                    src={urlFor(post.mainImage).url()}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-600 mb-4">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.categories.map((category) => (
                      <Link
                        key={category._id}
                        href={`/categories/${category.slug.current}`}
                        className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200"
                      >
                        {category.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    excerpt,
    categories[]->{
      _id,
      title,
      slug
    }
  }`;

  const categoriesQuery = `*[_type == "category"] {
    _id,
    title,
    slug
  }`;

  const posts = await sanityClient.fetch(postsQuery);
  const categories = await sanityClient.fetch(categoriesQuery);

  return {
    props: {
      posts,
      categories,
    },
    revalidate: 60,
  };
}; 