import React from 'react';
import Head from 'next/head';
import { useTheme } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Head>
        <title>Privacy Policy - Youth Policy Forum</title>
        <meta name="description" content="GDPR-compliant Privacy Policy for Youth Policy Forum" />
      </Head>

      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8`}>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Privacy Policy</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">1. Introduction</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                At Youth Policy Forum, we are committed to protecting your privacy and ensuring the security of your personal data in compliance with the General Data Protection Regulation (GDPR) and other applicable data protection laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">2. Data Controller</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Youth Policy Forum is the data controller for the personal data we collect and process. Our contact details are:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                <li>Email: privacy@youthpolicyforum.org</li>
                <li>Address: [Your Registered Address]</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">3. Personal Data We Collect</h2>
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-200 mb-2">3.1 Information You Provide</h3>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                <li>Name and contact information</li>
                <li>Email address</li>
                <li>Account credentials</li>
                <li>Communication preferences</li>
                <li>Any other information you choose to provide</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-200 mb-2">3.2 Automatically Collected Information</h3>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Usage data and analytics</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">4. Legal Basis for Processing</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We process your personal data based on the following legal grounds:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                <li>Your consent (where applicable)</li>
                <li>Performance of a contract</li>
                <li>Compliance with legal obligations</li>
                <li>Legitimate interests pursued by us</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">5. Your Rights Under GDPR</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You have the following rights regarding your personal data:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                <li>Right to access your personal data</li>
                <li>Right to rectification of inaccurate data</li>
                <li>Right to erasure (right to be forgotten)</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
                <li>Right to withdraw consent</li>
                <li>Right to lodge a complaint with a supervisory authority</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">6. Data Security</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication</li>
                <li>Secure data storage practices</li>
                <li>Regular staff training on data protection</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">7. Data Retention</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, including legal, accounting, or reporting requirements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">8. International Data Transfers</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We ensure that any international transfers of personal data are protected by appropriate safeguards, such as Standard Contractual Clauses or other mechanisms approved by the European Commission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">9. Cookies and Tracking</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We use cookies and similar tracking technologies in compliance with the ePrivacy Directive. Our website implements a cookie consent banner that allows you to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                <li>Accept all cookies and tracking technologies</li>
                <li>Decline non-essential cookies</li>
                <li>View detailed information about the cookies we use</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The cookie consent banner appears when you first visit our website and stores your preferences in your browser's local storage. You can change your cookie preferences at any time by clearing your browser's local storage or using the browser's cookie settings.
              </p>
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-200 mb-2">Types of Cookies We Use</h3>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">10. Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                If you have any questions about this Privacy Policy or wish to exercise your rights, please contact our Data Protection Officer at:
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Email: dpo@youthpolicyforum.org
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 