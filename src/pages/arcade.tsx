import React from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface GameCard {
  title: string;
  description: string;
  image: string;
  href: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  skills: string[];
}

const games: GameCard[] = [
  {
    title: 'Policy Impact Simulator',
    description: 'Make critical policy decisions and see their cascading effects on society, economy, and environment. Can you maintain the delicate balance?',
    image: '/images/policy-simulator.svg',
    href: '/arcade/policy-simulator',
    difficulty: 'Medium',
    duration: '10-15 mins',
    skills: ['Decision Making', 'Resource Management', 'Impact Analysis']
  },
  {
    title: 'Policy Debate Challenge',
    description: 'Build compelling arguments using evidence cards. Combine statistics, research, and expert opinions to win policy debates!',
    image: '/images/policy-debate.svg',
    href: '/arcade/policy-debate',
    difficulty: 'Hard',
    duration: '15-20 mins',
    skills: ['Critical Thinking', 'Argumentation', 'Evidence Analysis']
  },
  {
    title: 'Priority Puzzle',
    description: 'Balance limited resources while implementing crucial policies. Master the art of prioritization and strategic planning!',
    image: '/images/priority-puzzle.svg',
    href: '/arcade/priority-puzzle',
    difficulty: 'Medium',
    duration: '10-15 mins',
    skills: ['Resource Management', 'Strategic Planning', 'Time Management']
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy':
      return 'bg-green-100 text-green-800';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'Hard':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function Arcade() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.h1 
              className="text-4xl font-bold text-primary mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Policy Arcade
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Learn about policy-making through interactive games and challenges
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game, index) => (
              <motion.div
                key={game.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={game.href} className="block">
                  <div className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      {/* Placeholder for game image */}
                      <span className="text-4xl text-gray-400">🎮</span>
                    </div>
                    <div className="p-6">
                      <h2 className="text-2xl font-bold mb-2 text-primary">{game.title}</h2>
                      <p className="text-gray-600 mb-4">{game.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(game.difficulty)}`}>
                          {game.difficulty}
                        </span>
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                          {game.duration}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-gray-500">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {game.skills.map(skill => (
                            <span 
                              key={skill}
                              className="px-2 py-1 bg-primary/10 text-primary text-sm rounded"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600">
              More games coming soon! Check back regularly for new challenges.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
} 