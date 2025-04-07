import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';

interface PuzzlePiece {
  id: string;
  text: string;
  category: 'goal' | 'action' | 'outcome';
  isCorrect?: boolean;
}

const pieces: PuzzlePiece[] = [
  { id: 'g1', text: 'Improve Education Access', category: 'goal' },
  { id: 'g2', text: 'Reduce Youth Unemployment', category: 'goal' },
  { id: 'g3', text: 'Promote Digital Literacy', category: 'goal' },
  
  { id: 'a1', text: 'Increase School Funding', category: 'action' },
  { id: 'a2', text: 'Create Job Training Programs', category: 'action' },
  { id: 'a3', text: 'Provide Free Coding Bootcamps', category: 'action' },
  
  { id: 'o1', text: 'Better Educational Resources', category: 'outcome' },
  { id: 'o2', text: 'More Youth Employment', category: 'outcome' },
  { id: 'o3', text: 'Enhanced Tech Skills', category: 'outcome' },
];

const correctCombinations = [
  ['g1', 'a1', 'o1'],
  ['g2', 'a2', 'o2'],
  ['g3', 'a3', 'o3'],
];

const PolicyPuzzle: NextPage = () => {
  const [selectedPieces, setSelectedPieces] = useState<PuzzlePiece[]>([]);
  const [availablePieces, setAvailablePieces] = useState<PuzzlePiece[]>([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Shuffle pieces at start
    setAvailablePieces([...pieces].sort(() => Math.random() - 0.5));
  }, []);

  const handlePieceClick = (piece: PuzzlePiece) => {
    if (selectedPieces.length < 3 && !selectedPieces.some(p => p.category === piece.category)) {
      setSelectedPieces([...selectedPieces, piece]);
      setAvailablePieces(availablePieces.filter(p => p.id !== piece.id));
    }
  };

  const handleRemovePiece = (piece: PuzzlePiece) => {
    setSelectedPieces(selectedPieces.filter(p => p.id !== piece.id));
    setAvailablePieces([...availablePieces, piece]);
  };

  const checkCombination = () => {
    if (selectedPieces.length !== 3) {
      setMessage('Select one piece from each category to complete the policy.');
      return;
    }

    const selectedIds = selectedPieces.map(p => p.id);
    const isCorrect = correctCombinations.some(combo =>
      combo.every(id => selectedIds.includes(id))
    );

    if (isCorrect) {
      setScore(score + 1);
      setMessage('Correct! This policy combination makes sense.');
      if (score + 1 === 3) {
        setIsComplete(true);
      }
    } else {
      setMessage('Try again! Think about how these pieces connect.');
    }
  };

  const resetSelection = () => {
    setAvailablePieces([...availablePieces, ...selectedPieces].sort(() => Math.random() - 0.5));
    setSelectedPieces([]);
    setMessage('');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-primary via-primary-800 to-primary-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">Policy Puzzle</h1>
            <p className="text-xl text-gray-200 drop-shadow">
              Connect policy goals with actions and outcomes to create effective solutions.
            </p>
          </div>

          {/* Game Area */}
          <div className="bg-white rounded-xl shadow-2xl p-8 mb-8">
            {/* Score */}
            <div className="flex justify-between items-center mb-8">
              <div className="text-xl text-primary-900 font-bold">Score: {score}/3</div>
              <button
                onClick={resetSelection}
                className="px-4 py-2 text-white bg-secondary rounded-lg hover:bg-secondary-700 transition-colors duration-200 shadow-md"
              >
                Reset Selection
              </button>
            </div>

            {/* Selected Pieces */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {['goal', 'action', 'outcome'].map((category) => (
                <div
                  key={category}
                  className="bg-gray-50 p-6 rounded-xl shadow-md min-h-[140px] flex items-center justify-center text-center border-2 border-gray-100"
                >
                  {selectedPieces.find(p => p.category === category) ? (
                    <div
                      onClick={() => handleRemovePiece(selectedPieces.find(p => p.category === category)!)}
                      className="cursor-pointer p-4 bg-primary-800 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 shadow-md font-medium w-full"
                    >
                      {selectedPieces.find(p => p.category === category)?.text}
                    </div>
                  ) : (
                    <span className="text-gray-500 font-medium">
                      Select a {category.charAt(0).toUpperCase() + category.slice(1)}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Available Pieces */}
            <div className="space-y-6">
              {['goal', 'action', 'outcome'].map((category) => (
                <div key={category} className="space-y-3">
                  <h3 className="text-lg font-bold text-primary-900 capitalize">{category}s</h3>
                  <div className="flex flex-wrap gap-3">
                    {availablePieces
                      .filter(piece => piece.category === category)
                      .map(piece => (
                        <button
                          key={piece.id}
                          onClick={() => handlePieceClick(piece)}
                          className="px-5 py-3 bg-gray-100 text-primary-800 rounded-lg hover:bg-secondary hover:text-white transition-all duration-200 shadow-sm font-medium"
                        >
                          {piece.text}
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Message */}
            {message && (
              <div className={`mt-8 p-5 rounded-xl text-center font-medium shadow-md ${
                message.includes('Correct') 
                  ? 'bg-green-50 text-green-800 border-2 border-green-200' 
                  : 'bg-yellow-50 text-yellow-800 border-2 border-yellow-200'
              }`}>
                {message}
              </div>
            )}

            {/* Check Button */}
            <div className="mt-8 text-center">
              <button
                onClick={checkCombination}
                disabled={selectedPieces.length !== 3}
                className={`px-8 py-4 rounded-xl font-bold text-lg shadow-lg ${
                  selectedPieces.length === 3
                    ? 'bg-secondary text-white hover:bg-secondary-700 transform hover:-translate-y-1'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                } transition-all duration-200`}
              >
                Check Policy
              </button>
            </div>
          </div>

          {/* Game Complete */}
          {isComplete && (
            <div className="text-center bg-green-50 p-8 rounded-xl shadow-2xl border-2 border-green-200">
              <h2 className="text-3xl font-bold text-green-800 mb-4">
                Congratulations! You've completed the Policy Puzzle!
              </h2>
              <p className="text-green-700 text-lg mb-6">
                You've demonstrated a great understanding of how policy goals, actions, and outcomes connect.
              </p>
              <Link
                href="/arcade"
                className="inline-block px-8 py-4 bg-secondary text-white rounded-xl hover:bg-secondary-700 transition-all duration-200 shadow-lg transform hover:-translate-y-1 font-bold text-lg"
              >
                Try Another Game
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PolicyPuzzle; 