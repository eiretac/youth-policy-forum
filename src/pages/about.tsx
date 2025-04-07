import React from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About Us - Youth Policy Forum</title>
        <meta name="description" content="Learn about the Youth Policy Forum's vision, mission, and values." />
      </Head>

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center">About Us</h1>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600">
                A world where young people are actively engaged in shaping policies that affect their lives
                and communities, creating a more inclusive and sustainable future for all.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600">
                To empower young people to participate meaningfully in policy-making processes,
                ensuring that youth perspectives are represented in decisions that shape our future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Inclusivity</h3>
              <p className="text-gray-600">
                We believe in creating spaces where all young people, regardless of background,
                can participate and contribute to policy discussions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-gray-600">
                We encourage creative thinking and new approaches to solving complex policy challenges.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Impact</h3>
              <p className="text-gray-600">
                We are committed to creating tangible change through our policy work and advocacy efforts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Jane Doe</h3>
              <p className="text-gray-600">Executive Director</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">John Smith</h3>
              <p className="text-gray-600">Policy Director</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Sarah Johnson</h3>
              <p className="text-gray-600">Program Manager</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 