import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';

export default function AuthError() {
  const router = useRouter();
  const { error } = router.query;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10"
          >
            <h2 className="text-center text-3xl font-bold text-red-600 mb-4">
              Authentication Error
            </h2>
            <p className="text-center text-gray-600 mb-6">
              {error || 'An error occurred during authentication'}
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => router.push('/auth/signin')}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                Return to Sign In
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
} 