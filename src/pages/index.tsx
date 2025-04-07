import Head from 'next/head';
import Layout from '@/components/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Youth Policy Forum - Shaping the Future Through Policy</title>
        <meta name="description" content="Join the Youth Policy Forum to shape policy and create positive change in society." />
      </Head>

      {/* Hero Section */}
      <section className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Shaping Policy, Creating Change
            </h1>
            <p className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto">
              Join the Youth Policy Forum to make your voice heard and shape the future of policy-making.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/get-involved"
                className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-blue-50 transition-colors"
              >
                Get Involved
              </Link>
              <Link
                href="/policy-areas"
                className="bg-transparent border-2 border-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To empower young people to actively participate in policy-making processes,
              ensuring that youth perspectives are represented in decisions that shape our future.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Policy Research</h3>
              <p className="text-gray-600">
                Conducting in-depth research on key policy issues affecting youth and society.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Advocacy</h3>
              <p className="text-gray-600">
                Advocating for youth-friendly policies at local, national, and international levels.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Capacity Building</h3>
              <p className="text-gray-600">
                Providing training and resources to develop youth leadership in policy-making.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join our community of young policy-makers and start creating change today.
          </p>
          <Link
            href="/get-involved"
            className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
          >
            Join Us Now
          </Link>
        </div>
      </section>
    </Layout>
  );
} 