import React from 'react';
import Head from 'next/head';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function TermsOfService() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Head>
        <title>Terms of Service - Youth Policy Forum</title>
        <meta name="description" content="Terms of Service for Youth Policy Forum" />
      </Head>

      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8`}>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Terms of Service</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                By accessing and using the Youth Policy Forum website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">2. User Accounts</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                To access certain features of the service, you may be required to create an account. You are responsible for:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Providing accurate and complete information</li>
                <li>Notifying us immediately of any unauthorized use</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">3. User Conduct</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You agree not to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Upload or transmit harmful or malicious content</li>
                <li>Interfere with the proper functioning of the service</li>
                <li>Attempt to gain unauthorized access to any portion of the service</li>
                <li>Use the service for any illegal or unauthorized purpose</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">4. Intellectual Property</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                All content, features, and functionality of the service are owned by Youth Policy Forum and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">5. User Content</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                By submitting content to the service, you:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                <li>Grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and distribute your content</li>
                <li>Represent that you have the necessary rights to submit the content</li>
                <li>Agree that your content does not violate any third-party rights</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">6. Data Protection and Privacy</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We process your personal data in accordance with our Privacy Policy and applicable data protection laws, including the GDPR. By using our service, you consent to such processing.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">7. Disclaimer of Warranties</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The service is provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not warrant that the service will be uninterrupted, timely, secure, or error-free.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                To the maximum extent permitted by law, Youth Policy Forum shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">9. Termination</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We may terminate or suspend your access to the service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">10. Changes to Terms</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We reserve the right to modify or replace these Terms at any time. We will provide notice of any material changes. Your continued use of the service after any changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">11. Governing Law</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the European Union, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">12. Contact Information</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Email: legal@youthpolicyforum.org
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 