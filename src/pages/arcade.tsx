import { NextPage } from 'next';
import Layout from '../components/Layout';
import Link from 'next/link';
import { useState } from 'react';

interface Game {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  path: string;
}

const games: Game[] = [
  {
    id: 'policy-puzzle',
    title: 'Policy Puzzle',
    description: 'Piece together effective policies by connecting different elements and understanding their impacts.',
    image: '/images/games/puzzle.svg',
    category: 'Education',
    difficulty: 'Easy',
    path: '/arcade/policy-puzzle'
  },
  {
    id: 'budget-hero',
    title: 'Budget Hero',
    description: 'Balance the budget while maintaining social services and managing resources effectively.',
    image: '/images/games/budget.svg',
    category: 'Economics',
    difficulty: 'Medium',
    path: '/arcade/budget-hero'
  },
  {
    id: 'climate-quest',
    title: 'Climate Quest',
    description: 'Navigate environmental challenges and create sustainable solutions for a better future.',
    image: '/images/games/climate.svg',
    category: 'Environment',
    difficulty: 'Medium',
    path: '/arcade/climate-quest'
  }
];

const ArcadePage: NextPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const filteredGames = games.filter(game => {
    const categoryMatch = selectedCategory === 'all' || game.category.toLowerCase() === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || game.difficulty.toLowerCase() === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const categories = ['all', ...Array.from(new Set(games.map(game => game.category.toLowerCase())))];
  const difficulties = ['all', 'easy', 'medium', 'hard'];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-primary to-primary-dark">
        {/* Hero Section */}
        <section className="pt-16 pb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Policy Arcade
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Learn about policy-making through interactive games and challenges.
            Have fun while understanding how policies shape our world!
          </p>
        </section>

        {/* Filters */}
        <section className="pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="space-y-2">
                <label className="text-white text-sm font-medium">Category:</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="ml-2 bg-primary-800 text-white rounded-md px-3 py-1 border border-primary-600 focus:outline-none focus:ring-2 focus:ring-secondary"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-white text-sm font-medium">Difficulty:</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="ml-2 bg-primary-800 text-white rounded-md px-3 py-1 border border-primary-600 focus:outline-none focus:ring-2 focus:ring-secondary"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Games Grid */}
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGames.map((game) => (
                <Link
                  key={game.id}
                  href={game.path}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                    <div className="p-4 flex items-center justify-center">
                      {/* Placeholder for game image */}
                      <div className="w-full h-48 bg-primary-800 rounded-lg flex items-center justify-center">
                        <span className="text-white text-lg">Game Preview</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-primary">{game.title}</h3>
                      <span className={`px-2 py-1 rounded text-sm font-medium ${
                        game.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                        game.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {game.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{game.description}</p>
                    <div className="flex items-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary">
                        {game.category}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ArcadePage; 