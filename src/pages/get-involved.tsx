import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';

export default function GetInvolved() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    interests: '',
    experience: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(`https://formspree.io/f/${process.env.NEXT_PUBLIC_GET_INVOLVED_FORM_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          age: '',
          interests: '',
          experience: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Layout>
      <Head>
        <title>Get Involved - Youth Policy Forum</title>
        <meta name="description" content="Join the Youth Policy Forum and make a difference in policy-making." />
      </Head>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-extrabold text-center tracking-tight mb-6">
            Get Involved
          </h1>
          <p className="text-xl text-center mt-4 max-w-3xl mx-auto text-blue-100">
            Join our community of young policy-makers and start creating change today
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Why Join Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-4xl mb-6">🤝</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Networking</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with like-minded young people and policy experts from around the world.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-4xl mb-6">📚</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Skill Development</h3>
              <p className="text-gray-600 leading-relaxed">
                Gain valuable skills in policy research, advocacy, and leadership.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-4xl mb-6">✨</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Impact</h3>
              <p className="text-gray-600 leading-relaxed">
                Make a real difference by contributing to policy development and implementation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-8">Join Our Community</h2>
            {submitStatus === 'success' ? (
              <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg mb-6">
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline"> Thank you for your application. We'll be in touch soon.</span>
              </div>
            ) : submitStatus === 'error' ? (
              <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg mb-6">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> Something went wrong. Please try again later.</span>
              </div>
            ) : null}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-1">
                  Policy Areas of Interest
                </label>
                <textarea
                  id="interests"
                  name="interests"
                  value={formData.interests}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                  placeholder="List the policy areas you're most interested in"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                  Relevant Experience
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                  placeholder="Tell us about your experience in policy or related fields"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
} 