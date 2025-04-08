import { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';
import NewsletterSignup from '@/components/NewsletterSignup';

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Youth Policy Forum - Shaping the Future</title>
        <meta name="description" content="Join the conversation on youth policy. Explore insights, connect with experts, and get involved." />
      </Head>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Join the Youth Policy Forum to make your voice heard and shape the future of policy-making.
          </h1>
          <div className="flex justify-center gap-4 mt-8">
            <Link href="/get-involved" className="btn-primary">
              Get Involved
            </Link>
            <Link href="/about" className="btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6 text-primary">Our Mission</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              To empower young people to actively participate in policy-making processes, ensuring 
              that youth perspectives are represented in decisions that shape our future.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Research Feature */}
            <div className="bg-white rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105">
              <h3 className="text-xl font-bold mb-4 text-primary">Research</h3>
              <p className="text-gray-700">
                Conducting in-depth research on key policy issues affecting youth and society.
              </p>
            </div>

            {/* Advocacy Feature */}
            <div className="bg-white rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105">
              <h3 className="text-xl font-bold mb-4 text-primary">Advocacy</h3>
              <p className="text-gray-700">
                Advocating for youth-friendly policies at local, national, and international levels.
              </p>
            </div>

            {/* Training Feature */}
            <div className="bg-white rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105">
              <h3 className="text-xl font-bold mb-4 text-primary">Training</h3>
              <p className="text-gray-700">
                Providing training and resources to develop youth leadership in policy-making.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            Join our community of young policy advocates and help shape the future.
          </p>
          <Link href="/get-involved" className="btn-primary bg-white text-secondary hover:bg-gray-100">
            Get Started Today
          </Link>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <NewsletterSignup />
    </Layout>
  );
};

export default Home; 