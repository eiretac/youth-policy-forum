import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';

interface EvidenceCard {
  id: string;
  type: 'statistic' | 'research' | 'case_study' | 'expert_opinion';
  content: string;
  strength: number;
  topic: string;
}

interface DebateTopicType {
  id: string;
  title: string;
  description: string;
  proArguments: string[];
  conArguments: string[];
}

const debateTopics: DebateTopicType[] = [
  {
    id: 'universal-basic-income',
    title: 'Universal Basic Income',
    description: 'Should the government provide a universal basic income to all citizens?',
    proArguments: [
      'Reduces poverty and inequality',
      'Provides economic security',
      'Supports entrepreneurship',
      'Simplifies welfare systems'
    ],
    conArguments: [
      'High cost to implement',
      'May reduce work incentive',
      'Could increase inflation',
      'Tax burden concerns'
    ]
  },
  {
    id: 'carbon-tax',
    title: 'Carbon Tax Policy',
    description: 'Should we implement a carbon tax to combat climate change?',
    proArguments: [
      'Reduces emissions effectively',
      'Creates market incentives',
      'Generates revenue',
      'Encourages innovation'
    ],
    conArguments: [
      'Increases consumer costs',
      'Affects low-income households',
      'International competition',
      'Implementation challenges'
    ]
  }
];

const evidenceCards: EvidenceCard[] = [
  {
    id: 'stat1',
    type: 'statistic',
    content: '78% reduction in poverty rates observed in UBI pilot programs',
    strength: 8,
    topic: 'universal-basic-income'
  },
  {
    id: 'research1',
    type: 'research',
    content: 'Study shows 15% increase in entrepreneurship in areas with basic income',
    strength: 7,
    topic: 'universal-basic-income'
  },
  {
    id: 'case1',
    type: 'case_study',
    content: 'Carbon tax led to 25% emissions reduction in Country X',
    strength: 9,
    topic: 'carbon-tax'
  },
  // Add more evidence cards
];

export default function PolicyDebate() {
  const [currentTopic, setCurrentTopic] = useState<DebateTopicType | null>(null);
  const [playerHand, setPlayerHand] = useState<EvidenceCard[]>([]);
  const [playedCards, setPlayedCards] = useState<EvidenceCard[]>([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Start with a random topic
    const randomTopic = debateTopics[Math.floor(Math.random() * debateTopics.length)];
    setCurrentTopic(randomTopic);
    
    // Deal initial cards
    const topicCards = evidenceCards.filter(card => card.topic === randomTopic.id);
    const initialHand = shuffleArray(topicCards).slice(0, 4);
    setPlayerHand(initialHand);
  }, []);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const playCard = (card: EvidenceCard) => {
    // Remove card from hand
    setPlayerHand(playerHand.filter(c => c.id !== card.id));
    
    // Add to played cards
    setPlayedCards([...playedCards, card]);
    
    // Calculate impact
    const impact = calculateCardImpact(card);
    setScore(score + impact);
    
    // Show feedback
    setMessage(`${card.type.replace('_', ' ')} played! Impact: ${impact} points`);
    
    // Deal new card if available
    const availableCards = evidenceCards.filter(
      c => c.topic === currentTopic?.id && 
      !playedCards.includes(c) && 
      !playerHand.includes(c)
    );
    
    if (availableCards.length > 0) {
      const newCard = availableCards[Math.floor(Math.random() * availableCards.length)];
      setPlayerHand([...playerHand.filter(c => c.id !== card.id), newCard]);
    }
    
    // Check if round should end
    if (playedCards.length + 1 >= 3) {
      endRound();
    }
  };

  const calculateCardImpact = (card: EvidenceCard): number => {
    // Base impact from card strength
    let impact = card.strength;
    
    // Bonus for combining different types of evidence
    const playedTypes = new Set(playedCards.map(c => c.type));
    if (!playedTypes.has(card.type)) {
      impact += 2; // Bonus for diversity
    }
    
    // Bonus for building on previous cards
    if (playedCards.length > 0) {
      const lastCard = playedCards[playedCards.length - 1];
      if (isGoodCombination(lastCard, card)) {
        impact += 3; // Bonus for good combination
      }
    }
    
    return impact;
  };

  const isGoodCombination = (card1: EvidenceCard, card2: EvidenceCard): boolean => {
    // Example combinations that work well together
    const goodPairs = {
      'statistic': ['research', 'expert_opinion'],
      'research': ['case_study', 'statistic'],
      'case_study': ['expert_opinion', 'research'],
      'expert_opinion': ['case_study', 'statistic']
    };
    
    return goodPairs[card1.type as keyof typeof goodPairs].includes(card2.type);
  };

  const endRound = () => {
    setRound(round + 1);
    setPlayedCards([]);
    
    if (round >= 3) {
      // Game over
      setMessage(`Game Over! Final Score: ${score}`);
    } else {
      // New round
      const newTopic = debateTopics.find(t => t.id !== currentTopic?.id) || debateTopics[0];
      setCurrentTopic(newTopic);
      
      // Deal new hand
      const topicCards = evidenceCards.filter(card => card.topic === newTopic.id);
      const newHand = shuffleArray(topicCards).slice(0, 4);
      setPlayerHand(newHand);
      
      setMessage(`Round ${round + 1} begins!`);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-8 text-primary"
          >
            Policy Debate Challenge
          </motion.h1>

          {currentTopic && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 mb-8"
            >
              <h2 className="text-2xl font-bold mb-4 text-primary">{currentTopic.title}</h2>
              <p className="text-lg text-gray-700 mb-6">{currentTopic.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-green-700">Supporting Arguments</h3>
                  <ul className="space-y-2">
                    {currentTopic.proArguments.map((arg, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-green-600"
                      >
                        • {arg}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-red-700">Counter Arguments</h3>
                  <ul className="space-y-2">
                    {currentTopic.conArguments.map((arg, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-red-600"
                      >
                        • {arg}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {/* Game Status */}
          <div className="flex justify-between items-center mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-md p-4"
            >
              <p className="text-lg font-semibold text-primary">Round {round} of 3</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-md p-4"
            >
              <p className="text-lg font-semibold text-secondary">Score: {score}</p>
            </motion.div>
          </div>

          {/* Player's Hand */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary mb-4">Your Evidence Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {playerHand.map((card, index) => (
                <motion.button
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => playCard(card)}
                  className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all text-left border-2 border-secondary"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-semibold text-secondary capitalize">
                      {card.type.replace('_', ' ')}
                    </h4>
                    <span className="bg-secondary text-white px-2 py-1 rounded-full text-sm">
                      Strength: {card.strength}
                    </span>
                  </div>
                  <p className="text-gray-700">{card.content}</p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Played Cards */}
          {playedCards.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-primary mb-4">Played Cards</h3>
              <div className="space-y-4">
                {playedCards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="text-lg font-semibold text-gray-700 capitalize">
                        {card.type.replace('_', ' ')}
                      </h4>
                      <span className="text-gray-500">Impact: {calculateCardImpact(card)}</span>
                    </div>
                    <p className="text-gray-600 mt-2">{card.content}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Game Message */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-4 bg-accent bg-opacity-10 rounded-lg text-center"
            >
              <p className="text-accent font-semibold">{message}</p>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
} 