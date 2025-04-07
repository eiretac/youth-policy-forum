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
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">Policy Debate Challenge</h1>
          
          <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
            {currentTopic && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">{currentTopic.title}</h2>
                <p className="text-gray-600 mb-4">{currentTopic.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h3 className="font-semibold mb-2">Pro Arguments</h3>
                    <ul className="list-disc pl-5">
                      {currentTopic.proArguments.map((arg, index) => (
                        <li key={index} className="text-sm text-gray-600">{arg}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Con Arguments</h3>
                    <ul className="list-disc pl-5">
                      {currentTopic.conArguments.map((arg, index) => (
                        <li key={index} className="text-sm text-gray-600">{arg}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {message && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-gray-100 rounded-lg text-center"
              >
                {message}
              </motion.div>
            )}
            
            <div className="mb-8">
              <h3 className="font-semibold mb-4">Played Cards</h3>
              <div className="grid grid-cols-3 gap-4">
                {playedCards.map((card) => (
                  <div
                    key={card.id}
                    className="p-4 border rounded-lg bg-gray-50"
                  >
                    <p className="text-sm font-semibold text-gray-600 mb-2">
                      {card.type.replace('_', ' ')}
                    </p>
                    <p className="text-sm">{card.content}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Your Hand</h3>
              <div className="grid grid-cols-2 gap-4">
                {playerHand.map((card) => (
                  <button
                    key={card.id}
                    onClick={() => playCard(card)}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <p className="text-sm font-semibold text-gray-600 mb-2">
                      {card.type.replace('_', ' ')}
                    </p>
                    <p className="text-sm">{card.content}</p>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mt-6 flex justify-between items-center">
              <p className="text-gray-600">Round {round} of 3</p>
              <p className="text-xl font-bold">Score: {score}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 