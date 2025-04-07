import { NextPage } from 'next';
import Layout from '../../components/Layout';

const HealthPolicy: NextPage = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-primary via-primary-800 to-primary-900 py-16 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">Health Policy</h1>
            <p className="text-xl text-gray-200 drop-shadow max-w-3xl mx-auto">
              Advocating for better healthcare access and improved health outcomes for young people.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Current Initiatives */}
            <div className="bg-white rounded-xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-primary-900 mb-4">Current Initiatives</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-secondary mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-primary-800">Mental Health Access</h3>
                    <p className="text-gray-600">Improving access to mental health services for young people.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-secondary mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-primary-800">Digital Health</h3>
                    <p className="text-gray-600">Leveraging technology for better healthcare delivery.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-secondary mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-primary-800">Health Equity</h3>
                    <p className="text-gray-600">Addressing healthcare disparities in underserved communities.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Research and Publications */}
            <div className="bg-white rounded-xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-primary-900 mb-4">Research & Publications</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-primary-800">Latest Report</h3>
                  <p className="text-gray-600 mb-2">Youth Mental Health: A Policy Framework</p>
                  <button className="text-secondary hover:text-secondary-700 font-medium">
                    Download PDF →
                  </button>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-primary-800">Policy Brief</h3>
                  <p className="text-gray-600 mb-2">Digital Health Innovation for Youth</p>
                  <button className="text-secondary hover:text-secondary-700 font-medium">
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Get Involved Section */}
          <div className="bg-white rounded-xl shadow-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-primary-900 mb-6 text-center">Get Involved</h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Join our health policy initiatives and help improve healthcare access and outcomes for young people.
            </p>
            <div className="flex justify-center">
              <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-secondary hover:bg-secondary-700 transition-colors duration-200 shadow-lg">
                Join Health Working Group
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HealthPolicy; 