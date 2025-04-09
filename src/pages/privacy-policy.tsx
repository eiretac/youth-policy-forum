import React from 'react';
import Head from 'next/head';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>Privacy Policy - Youth Policy Forum</title>
        <meta name="description" content="Privacy Policy for Youth Policy Forum" />
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Privacy Policy</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">1. Introduction</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Welcome to Youth Policy Forum. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-200 mb-2">2.1 Personal Information</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We may collect the following personal information:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
              <li>Name and contact information</li>
              <li>Email address</li>
              <li>Account credentials</li>
              <li>Usage data and preferences</li>
              <li>Communication preferences</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-200 mb-2">2.2 Non-Personal Information</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We also collect non-personal information such as:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>IP address</li>
              <li>Website usage statistics</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We use your information for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
              <li>To provide and maintain our services</li>
              <li>To communicate with you about our services</li>
              <li>To improve our website and user experience</li>
              <li>To ensure the security of our platform</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">4. Data Protection</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We implement appropriate security measures to protect your personal information, including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication</li>
              <li>Secure data storage practices</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">5. Your Rights</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">6. Cookies and Tracking</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We use cookies and similar tracking technologies to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
              <li>Remember your preferences</li>
              <li>Analyze website usage</li>
              <li>Improve our services</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You can control cookies through your browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">7. Third-Party Services</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We may use third-party services that collect, monitor, and analyze information. These services have their own privacy policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">8. Children's Privacy</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Our services are not directed to individuals under 13. We do not knowingly collect personal information from children under 13.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">9. Changes to This Policy</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">10. Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Email: privacy@youthpolicyforum.org
            </p>
          </section>
        </div>
      </main>
    </div>
  );
} 