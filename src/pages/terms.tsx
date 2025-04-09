import React from 'react';
import Head from 'next/head';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>Terms of Service - Youth Policy Forum</title>
        <meta name="description" content="Terms of Service for Youth Policy Forum" />
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Terms of Service</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              By accessing and using the Youth Policy Forum website, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">2. User Accounts</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              To access certain features of our website, you may be required to create an account. You agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Be responsible for all activities under your account</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">3. User Conduct</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You agree not to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
              <li>Violate any applicable laws or regulations</li>
              <li>Post or transmit harmful or offensive content</li>
              <li>Impersonate others or misrepresent your identity</li>
              <li>Interfere with the proper functioning of the website</li>
              <li>Attempt to gain unauthorized access to our systems</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">4. Intellectual Property</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              All content on this website, including but not limited to text, graphics, logos, and software, is the property of Youth Policy Forum or its content suppliers and is protected by intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">5. User Content</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              By posting content on our website, you:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
              <li>Grant us a license to use, modify, and distribute your content</li>
              <li>Warrant that you have the right to post the content</li>
              <li>Agree that your content complies with our guidelines</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">6. Disclaimer of Warranties</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Our services are provided "as is" without warranties of any kind, either express or implied. We do not guarantee that our services will be uninterrupted or error-free.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">7. Limitation of Liability</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Youth Policy Forum shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">8. Termination</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We reserve the right to terminate or suspend your account and access to our services at our sole discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">9. Changes to Terms</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We may modify these Terms of Service at any time. We will notify you of any changes by posting the new terms on this page. Your continued use of our services after such changes constitutes your acceptance of the new terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">10. Governing Law</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which Youth Policy Forum is established, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">11. Contact Information</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Email: legal@youthpolicyforum.org
            </p>
          </section>
        </div>
      </main>
    </div>
  );
} 