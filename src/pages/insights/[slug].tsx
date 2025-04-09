import { GetStaticProps, GetStaticPaths } from 'next';
import { sanityClient } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';
import { Post } from '@/types';
import Layout from '@/components/Layout';
import Comments from '@/components/Comments';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import Head from 'next/head';

interface BlogPostProps {
  post: Post;
}

// Custom components for PortableText
const customComponents: PortableTextComponents = {
  block: {
    // Ex. 1: customizing common block types
    h1: ({children}) => <h1 className="text-primary text-4xl font-bold my-6">{children}</h1>,
    h2: ({children}) => <h2 className="text-primary text-3xl font-bold my-5">{children}</h2>,
    h3: ({children}) => <h3 className="text-primary text-2xl font-bold my-4">{children}</h3>,
    h4: ({children}) => <h4 className="text-primary text-xl font-bold my-3">{children}</h4>,
    normal: ({children}) => <p className="text-black text-lg my-4">{children}</p>,
    blockquote: ({children}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic text-black my-6">{children}</blockquote>,
  },
  list: {
    // Ex. 1: customizing common list types
    bullet: ({children}) => <ul className="list-disc list-inside text-black my-4 pl-4">{children}</ul>,
    number: ({children}) => <ol className="list-decimal list-inside text-black my-4 pl-4">{children}</ol>,
  },
  listItem: {
    // Ex. 1: customizing common list item types
    bullet: ({children}) => <li className="text-black my-2">{children}</li>,
    number: ({children}) => <li className="text-black my-2">{children}</li>,
  },
  marks: {
    link: ({children, value}) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a href={value.href} rel={rel} className="text-primary hover:underline">
          {children}
        </a>
      )
    },
    strong: ({children}) => <strong className="font-bold text-black">{children}</strong>,
    em: ({children}) => <em className="italic text-black">{children}</em>,
  },
  // You can add custom types if needed, e.g., for images or code blocks
  // types: {
  //   image: SampleImageComponent,
  // },
}

export default function InsightPost({ post }: BlogPostProps) {
  return (
    <Layout>
      <Head>
        <title>{post.title} - Youth Policy Forum Insights</title>
        <meta name="description" content={post.excerpt || `Read ${post.title} on Youth Policy Forum Insights`} />
      </Head>

      <article className="bg-white">
        {/* Hero Section */}
        <div className="relative w-full h-[60vh] bg-gray-900">
          {post.mainImage ? (
            <div className="absolute inset-0">
              <img
                src={urlFor(post.mainImage).url()}
                alt={post.title}
                className="w-full h-full object-cover opacity-60"
              />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-80" />
          )}
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl">
              {post.title}
            </h1>
            <div className="flex items-center text-white">
              {post.author.image ? (
                <img
                  src={urlFor(post.author.image).url()}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full mr-4 border-2 border-white"
                />
              ) : (
                <div className="w-12 h-12 rounded-full mr-4 bg-white/20 border-2 border-white flex items-center justify-center">
                  <span className="text-white text-xl">{post.author.name.charAt(0)}</span>
                </div>
              )}
              <div>
                <p className="font-semibold">{post.author.name}</p>
                <p className="text-white/80">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-none">
            <PortableText value={post.body} components={customComponents} />
          </div>

          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="mt-12 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <span
                    key={category._id}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary/10 text-secondary"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Comments Section */}
          <div className="mt-12 pt-6 border-t border-gray-200">
            <Comments postId={post._id} />
          </div>
        </div>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == "post"] {
    slug {
      current
    }
  }`;

  const posts = await sanityClient.fetch(query);
  const paths = posts.map((post: { slug: { current: string } }) => ({
    params: { slug: post.slug.current },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    excerpt,
    body,
    author->{
      name,
      image
    },
    categories[]->{
      _id,
      title
    }
  }`;

  const post = await sanityClient.fetch(query, { slug: params?.slug });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
}; 