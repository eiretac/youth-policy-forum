import { GetStaticProps, GetStaticPaths } from 'next';
import { sanityClient } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';
import { Post } from '@/types';
import Layout from '@/components/Layout';
import { PortableText } from '@portabletext/react';

interface BlogPostProps {
  post: Post;
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <Layout>
      <article className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center mb-8">
            <img
              src={urlFor(post.author.image).url()}
              alt={post.author.name}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <p className="font-semibold">{post.author.name}</p>
              <p className="text-gray-600">
                {new Date(post.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          {post.mainImage && (
            <img
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              className="w-full h-96 object-cover rounded-lg mb-8"
            />
          )}
          <div className="prose max-w-none">
            <PortableText value={post.body} />
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
    body,
    author->{
      name,
      image
    },
    categories[]->{
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