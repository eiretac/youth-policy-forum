import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { sanityClient } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';
import { Post, Category } from '@/types';
import Layout from '@/components/Layout';

interface CategoryPageProps {
  posts: Post[];
  category: Category;
}

export default function CategoryPage({ posts, category }: CategoryPageProps) {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Category: {category.title}</h1>
        {category.description && (
          <p className="text-lg text-gray-600 mb-8">{category.description}</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post._id} href={`/insights/${post.slug.current}`}>
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
                  <p className="text-gray-700">{post.excerpt}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == "category" && defined(slug.current)] {
    slug {
      current
    }
  }`;

  const categories = await sanityClient.fetch(query);
  
  // Filter out any categories that might still lack a slug or have a null slug
  const paths = categories
    .filter((category: { slug?: { current?: string } } | null) => 
      category && category.slug && category.slug.current
    )
    .map((category: { slug: { current: string } }) => ({
      params: { slug: category.slug.current },
    }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categoryQuery = `*[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    description
  }`;

  const postsQuery = `*[_type == "post" && references(*[_type == "category" && slug.current == $slug]._id)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    excerpt
  }`;

  const category = await sanityClient.fetch(categoryQuery, { slug: params?.slug });
  const posts = await sanityClient.fetch(postsQuery, { slug: params?.slug });

  if (!category) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      posts,
      category,
    },
    revalidate: 60,
  };
}; 