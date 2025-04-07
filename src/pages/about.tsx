import React from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About Us - Youth Policy Forum</title>
        <meta name="description" content="Learn about the Youth Policy Forum's vision, mission, and values." />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary to-accent text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center"
          >
            About Us
          </motion.h1>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <h2 className="text-3xl font-bold mb-6 text-primary">Our Vision</h2>
              <p className="text-lg text-gray-600">
                A world where young people are actively engaged in shaping policies that affect their lives
                and communities, creating a more inclusive and sustainable future for all.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <h2 className="text-3xl font-bold mb-6 text-primary">Our Mission</h2>
              <p className="text-lg text-gray-600">
                To empower young people to participate meaningfully in policy-making processes,
                ensuring that youth perspectives are represented in decisions that shape our future.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-center mb-12 text-primary"
          >
            Our Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Inclusivity',
                description: 'We believe in creating spaces where all young people, regardless of background, can participate and contribute to policy discussions.'
              },
              {
                title: 'Innovation',
                description: 'We encourage creative thinking and new approaches to solving complex policy challenges.'
              },
              {
                title: 'Impact',
                description: 'We are committed to creating tangible change through our policy work and advocacy efforts.'
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold mb-4 text-secondary">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-center mb-12 text-primary"
          >
            Our Team
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Jane Doe', role: 'Executive Director' },
              { name: 'John Smith', role: 'Policy Director' },
              { name: 'Sarah Johnson', role: 'Program Manager' }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="text-center bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-secondary to-accent rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-primary">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
} 