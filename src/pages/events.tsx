import React from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';

const upcomingEvents = [
  {
    title: 'Youth Policy Summit 2024',
    date: 'June 15-17, 2024',
    location: 'Virtual & In-Person (New York)',
    description: 'Join us for our annual summit bringing together young policy-makers from around the world.',
  },
  {
    title: 'Climate Policy Workshop',
    date: 'July 5, 2024',
    location: 'Virtual',
    description: 'Learn about climate policy development and advocacy strategies.',
  },
  {
    title: 'Human Rights Forum',
    date: 'August 12, 2024',
    location: 'Virtual',
    description: 'Discussion on current human rights issues and policy solutions.',
  },
];

const pastEvents = [
  {
    title: 'Education Policy Roundtable',
    date: 'March 20, 2024',
    location: 'Virtual',
    description: 'Discussion on improving education policies for youth.',
  },
  {
    title: 'Health Policy Webinar',
    date: 'February 10, 2024',
    location: 'Virtual',
    description: 'Exploring healthcare access and policy solutions.',
  },
];

export default function Events() {
  return (
    <Layout>
      <Head>
        <title>Events - Youth Policy Forum</title>
        <meta name="description" content="Upcoming and past events organized by the Youth Policy Forum." />
      </Head>

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center">Events</h1>
          <p className="text-xl text-center mt-4 max-w-3xl mx-auto">
            Join our events to learn, network, and contribute to policy discussions
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div
                key={event.title}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Date:</span> {event.date}
                </p>
                <p className="text-gray-600 mb-4">
                  <span className="font-medium">Location:</span> {event.location}
                </p>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Register Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pastEvents.map((event) => (
              <div
                key={event.title}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Date:</span> {event.date}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Location:</span> {event.location}
                </p>
                <p className="text-gray-600">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Want to Host an Event?</h2>
          <p className="text-xl text-gray-600 mb-8">
            We're always looking for partners to collaborate on events and initiatives.
          </p>
          <a
            href="/contact"
            className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </Layout>
  );
} 