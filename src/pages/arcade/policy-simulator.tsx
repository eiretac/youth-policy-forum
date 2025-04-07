import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';

interface Event {
  id: string;
  title: string;
  description: string;
  choices: Choice[];
}

interface Choice {
  id: string;
  text: string;
  consequences: {
    environment: number;
    economy: number;
    society: number;
    description: string;
  };
}

interface GameState {
  environment: number;
  economy: number;
  society: number;
  turn: number;
  history: string[];
  score: number;
}

const initialState: GameState = {
  environment: 50,
  economy: 50,
  society: 50,
  turn: 1,
  history: [],
  score: 0,
};

const events: Event[] = [
  {
    id: 'urban-transport',
    title: 'Urban Transport Crisis',
    description: 'The city is facing increasing traffic congestion and air pollution. What policy will you implement?',
    choices: [
      {
        id: 'public-transport',
        text: 'Invest heavily in public transportation',
        consequences: {
          environment: 15,
          economy: -5,
          society: 10,
          description: 'Public transport reduced emissions but required significant investment'
        }
      },
      {
        id: 'electric-vehicles',
        text: 'Subsidize electric vehicles',
        consequences: {
          environment: 10,
          economy: -10,
          society: 5,
          description: 'EV adoption increased but proved costly for the budget'
        }
      },
      {
        id: 'road-pricing',
        text: 'Implement congestion pricing',
        consequences: {
          environment: 8,
          economy: 12,
          society: -8,
          description: 'Generated revenue but faced public resistance'
        }
      }
    ]
  },
  {
    id: 'education-tech',
    title: 'Digital Education Gap',
    description: 'Many students lack access to digital learning tools. How will you address this?',
    choices: [
      {
        id: 'provide-devices',
        text: 'Provide free devices to all students',
        consequences: {
          environment: -5,
          economy: -10,
          society: 15,
          description: 'Improved access but strained budget resources'
        }
      },
      {
        id: 'public-private',
        text: 'Partner with tech companies',
        consequences: {
          environment: -2,
          economy: 8,
          society: 5,
          description: 'Cost-effective but raised data privacy concerns'
        }
      },
      {
        id: 'community-hubs',
        text: 'Create community tech hubs',
        consequences: {
          environment: 0,
          economy: -5,
          society: 12,
          description: 'Built community engagement but limited reach'
        }
      }
    ]
  },
  // Add more events here
];

const getRandomEvent = (usedEvents: string[]) => {
  const availableEvents = events.filter(event => !usedEvents.includes(event.id));
  if (availableEvents.length === 0) return events[Math.floor(Math.random() * events.length)];
  return availableEvents[Math.floor(Math.random() * availableEvents.length)];
};

export default function PolicySimulator() {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [usedEvents, setUsedEvents] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState<string>('');

  useEffect(() => {
    setCurrentEvent(getRandomEvent(usedEvents));
  }, [usedEvents]);

  const handleChoice = (choice: Choice) => {
    const newState = { ...gameState };
    newState.environment = Math.min(100, Math.max(0, newState.environment + choice.consequences.environment));
    newState.economy = Math.min(100, Math.max(0, newState.economy + choice.consequences.economy));
    newState.society = Math.min(100, Math.max(0, newState.society + choice.consequences.society));
    newState.turn += 1;
    newState.history.push(choice.consequences.description);

    setGameState(newState);
    setFeedback(choice.consequences.description);
    setUsedEvents([...usedEvents, currentEvent!.id]);

    if (newState.turn > 10 || 
        newState.environment <= 0 || 
        newState.economy <= 0 || 
        newState.society <= 0) {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setGameState(initialState);
    setUsedEvents([]);
    setGameOver(false);
    setFeedback('');
  };

  const getScoreColor = (value: number) => {
    if (value >= 75) return 'text-green-600 font-bold';
    if (value >= 50) return 'text-yellow-600 font-bold';
    return 'text-red-600 font-bold';
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">Policy Impact Simulator</h1>
          
          <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 border rounded-lg bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Environment</h3>
                <p className={`text-3xl ${getScoreColor(gameState.environment)}`}>
                  {gameState.environment}%
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Economy</h3>
                <p className={`text-3xl ${getScoreColor(gameState.economy)}`}>
                  {gameState.economy}%
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Society</h3>
                <p className={`text-3xl ${getScoreColor(gameState.society)}`}>
                  {gameState.society}%
                </p>
              </div>
            </div>

            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-gray-50 border rounded-lg text-center text-gray-800"
              >
                {feedback}
              </motion.div>
            )}

            {gameOver ? (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
                <p className="mb-4">You made it through {gameState.turn - 1} turns!</p>
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Policy Impact History:</h3>
                  <ul className="text-left list-disc pl-6">
                    {gameState.history.map((event, index) => (
                      <li key={index} className="mb-1">{event}</li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={resetGame}
                  className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
                >
                  Play Again
                </button>
              </div>
            ) : currentEvent ? (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">{currentEvent.title}</h2>
                <p className="text-gray-600 mb-6">{currentEvent.description}</p>
                <div className="space-y-4">
                  {currentEvent.choices.map((choice) => (
                    <button
                      key={choice.id}
                      onClick={() => handleChoice(choice)}
                      className="w-full text-left p-4 border rounded-lg hover:bg-gray-50 transition-colors bg-white"
                    >
                      <p className="text-gray-800 font-medium mb-2">{choice.text}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <p className="font-semibold">Impact:</p>
                          <ul className="list-disc list-inside">
                            {Object.entries(choice.consequences).map(([key, value]) => (
                              <li key={key} className={typeof value === 'number' && value > 0 ? 'text-green-600' : 'text-red-600'}>
                                {key.charAt(0).toUpperCase() + key.slice(1)}: {typeof value === 'number' && value > 0 ? '+' : ''}{value}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <p>Loading...</p>
            )}

            <div className="mt-6 flex justify-between items-center border-t pt-4">
              <p className="text-gray-600">Turn {gameState.turn} of 10</p>
              <p className="text-xl font-bold text-gray-800">Total Impact: {gameState.score}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 