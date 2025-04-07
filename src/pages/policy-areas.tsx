import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';

const policyAreas = [
  {
    title: 'Human Rights & Equality',
    description: 'Advocating for policies that promote human rights, social justice, and equal opportunities for all.',
    icon: '👥',
    category: 'social',
  },
  {
    title: 'Foreign Policy',
    description: 'Engaging in international relations and global policy discussions to promote peace and cooperation.',
    icon: '🌍',
    category: 'international',
  },
  {
    title: 'Law & Justice',
    description: 'Working towards fair and equitable legal systems that protect the rights of young people.',
    icon: '⚖️',
    category: 'social',
  },
  {
    title: 'Education',
    description: 'Promoting policies that ensure quality education and lifelong learning opportunities for all.',
    icon: '📚',
    category: 'social',
  },
  {
    title: 'Environment & Sustainability',
    description: 'Advocating for policies that address climate change and promote sustainable development.',
    icon: '🌱',
    category: 'environment',
  },
  {
    title: 'Health & Well-being',
    description: 'Supporting policies that improve access to healthcare and promote mental and physical well-being.',
    icon: '💊',
    category: 'social',
  },
];

const categories = [
  { id: 'all', label: 'All Areas' },
  { id: 'social', label: 'Social Issues' },
  { id: 'international', label: 'International Relations' },
  { id: 'environment', label: 'Environment' },
];

export default function PolicyAreas() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  const filteredAreas = selectedCategory === 'all'
    ? policyAreas
    : policyAreas.filter(area => area.category === selectedCategory);

  return (
    <Layout>
      <Head>
        <title>Policy Areas - Youth Policy Forum</title>
        <meta name="description" content="Explore the policy areas we focus on at the Youth Policy Forum." />
      </Head>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-extrabold text-center tracking-tight mb-6">
            Our Policy Areas
          </h1>
          <p className="text-xl text-center mt-4 max-w-3xl mx-auto text-blue-100">
            Explore the key policy areas where we work to create meaningful change
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Policy Areas Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAreas.map((area) => (
              <div
                key={area.title}
                className={`bg-white p-8 rounded-xl shadow-md transition-all duration-300 transform hover:shadow-xl ${
                  hoveredArea === area.title ? 'scale-105 shadow-xl' : ''
                }`}
                onMouseEnter={() => setHoveredArea(area.title)}
                onMouseLeave={() => setHoveredArea(null)}
              >
                <div className="text-5xl mb-6 transform transition-transform duration-300 hover:scale-110">
                  {area.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{area.title}</h3>
                <p className="text-gray-600 leading-relaxed">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Want to Get Involved?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join our working groups and contribute to policy development in your area of interest.
          </p>
          <a
            href="/get-involved"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform"
          >
            Join a Working Group
          </a>
        </div>
      </section>
    </Layout>
  );
} 