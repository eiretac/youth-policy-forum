import { NextPage } from 'next';
import Layout from '../components/Layout';

const PartnershipsPage: NextPage = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-primary via-primary-800 to-primary-900 py-16 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">Partnerships</h1>
            <p className="text-xl text-gray-200 drop-shadow max-w-3xl mx-auto">
              Join forces with Youth Policy Forum to create meaningful impact and shape the future of policy-making.
            </p>
          </div>

          {/* Partnership Types */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Academic Partnerships */}
            <div className="bg-white rounded-xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-primary-900 mb-4">Academic Partnerships</h2>
              <p className="text-gray-600 mb-6">
                Collaborate with universities and research institutions to enhance policy research and development.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-secondary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Research collaborations
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-secondary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Student internships
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-secondary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Joint publications
                </li>
              </ul>
            </div>

            {/* Corporate Partnerships */}
            <div className="bg-white rounded-xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-primary-900 mb-4">Corporate Partnerships</h2>
              <p className="text-gray-600 mb-6">
                Work with businesses to implement youth-focused initiatives and create employment opportunities.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-secondary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Mentorship programs
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-secondary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Job placements
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-secondary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Sponsored initiatives
                </li>
              </ul>
            </div>

            {/* NGO Partnerships */}
            <div className="bg-white rounded-xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-primary-900 mb-4">NGO Partnerships</h2>
              <p className="text-gray-600 mb-6">
                Partner with other organizations to amplify impact and reach more youth communities.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-secondary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Joint programs
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-secondary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Resource sharing
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-secondary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Community outreach
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-white rounded-xl shadow-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-primary-900 mb-6 text-center">Get in Touch</h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Interested in partnering with Youth Policy Forum? We'd love to hear from you and explore how we can work together to create positive change.
            </p>
            <div className="max-w-xl mx-auto">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary"
                  />
                </div>
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-gray-700">Organization</label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary"
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="inline-flex justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-secondary hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary shadow-lg transform hover:-translate-y-1 transition-all duration-200"
                  >
                    Submit Inquiry
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PartnershipsPage; 