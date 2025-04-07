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
}

const initialState: GameState = {
  environment: 50,
  economy: 50,
  society: 50,
  turn: 1,
  history: [],
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
    if (value >= 75) return 'text-green-500';
    if (value >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">Policy Impact Simulator</h1>
          
          <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold">Environment</h3>
                <p className={`text-2xl font-bold ${getScoreColor(gameState.environment)}`}>
                  {gameState.environment}%
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold">Economy</h3>
                <p className={`text-2xl font-bold ${getScoreColor(gameState.economy)}`}>
                  {gameState.economy}%
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold">Society</h3>
                <p className={`text-2xl font-bold ${getScoreColor(gameState.society)}`}>
                  {gameState.society}%
                </p>
              </div>
            </div>

            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-gray-100 rounded-lg text-center"
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
              <div>
                <h2 className="text-2xl font-bold mb-4">{currentEvent.title}</h2>
                <p className="mb-6">{currentEvent.description}</p>
                <div className="space-y-4">
                  {currentEvent.choices.map((choice) => (
                    <button
                      key={choice.id}
                      onClick={() => handleChoice(choice)}
                      className="w-full text-left p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {choice.text}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <p>Loading...</p>
            )}

            <div className="mt-6 text-center">
              <p className="text-gray-600">Turn {gameState.turn} of 10</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 