import React, { useState } from 'react';
import Link from 'next/link'; // Import Link for the disclaimer

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // IMPORTANT: Using the CONTACT form ID for newsletter signups.
    // Consider creating a separate Formspree form for newsletters later
    // to avoid mixing contact messages and subscribers.
    const formId = process.env.NEXT_PUBLIC_CONTACT_FORM_ID;
    if (!formId) {
      console.error('Formspree Contact Form ID is not configured.');
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Send only the email, perhaps add a hidden field to identify source
        body: JSON.stringify({ 
          email: email,
          _subject: 'New Newsletter Subscription',
          formSource: 'Homepage Newsletter Signup' // Hidden field
         }), 
      });

      if (response.ok) {
        setSubmitStatus('success');
        setEmail(''); // Clear input on success
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Formspree submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-blue-50 py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Receive the latest updates, important news, and exclusive content directly to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow px-5 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="Enter your email"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              className="sm:w-auto px-5 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting || submitStatus === 'success'}
            >
              {isSubmitting ? 'Subscribing...' : submitStatus === 'success' ? 'Subscribed!' : 'Subscribe'}
            </button>
          </div>
          {submitStatus === 'success' && (
            <p className="mt-3 text-sm text-green-600">
              Success! Thanks for subscribing.
            </p>
          )}
          {submitStatus === 'error' && (
            <p className="mt-3 text-sm text-red-600">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
        
        <p className="mt-4 text-sm text-gray-500">
          By clicking Sign Up you're confirming that you agree with our 
          <Link href="/terms" className="underline hover:text-gray-700 transition-colors ml-1">
             Terms and Conditions.
          </Link>
        </p>
      </div>
    </section>
  );
} 