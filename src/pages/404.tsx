import type { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';

const Custom404: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>404 - Page Not Found | Youth Policy Forum</title>
        <meta name="description" content="The page you're looking for cannot be found." />
      </Head>

      <main className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Oops! The page you're looking for seems to have gone missing.
          </p>
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
            >
              Return Home
            </Link>
            <p className="text-gray-500 dark:text-gray-400 mt-4">
              If you believe this is an error, please{' '}
              <Link
                href="/contact"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
              >
                contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Custom404; 