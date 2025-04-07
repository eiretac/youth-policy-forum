import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';

interface Resource {
  id: string;
  name: string;
  amount: number;
  maxAmount: number;
  regenerationRate: number;
}

interface Policy {
  id: string;
  name: string;
  description: string;
  cost: {
    [key: string]: number;  // resource id -> amount
  };
  benefits: {
    [key: string]: number;  // resource id -> amount
  };
  implemented: boolean;
}

const initialResources: Resource[] = [
  {
    id: 'budget',
    name: 'Budget',
    amount: 1000,
    maxAmount: 2000,
    regenerationRate: 100
  },
  {
    id: 'political_capital',
    name: 'Political Capital',
    amount: 50,
    maxAmount: 100,
    regenerationRate: 5
  },
  {
    id: 'public_support',
    name: 'Public Support',
    amount: 70,
    maxAmount: 100,
    regenerationRate: 2
  }
];

const availablePolicies: Policy[] = [
  {
    id: 'green_infrastructure',
    name: 'Green Infrastructure',
    description: 'Invest in sustainable infrastructure and renewable energy',
    cost: {
      budget: 400,
      political_capital: 20,
      public_support: 10
    },
    benefits: {
      public_support: 15,
      political_capital: 5
    },
    implemented: false
  },
  {
    id: 'education_reform',
    name: 'Education Reform',
    description: 'Modernize education system and improve access',
    cost: {
      budget: 300,
      political_capital: 30,
      public_support: 5
    },
    benefits: {
      public_support: 20,
      political_capital: 10
    },
    implemented: false
  },
  {
    id: 'healthcare_expansion',
    name: 'Healthcare Expansion',
    description: 'Expand healthcare coverage and improve services',
    cost: {
      budget: 500,
      political_capital: 25,
      public_support: 15
    },
    benefits: {
      public_support: 25,
      political_capital: 15
    },
    implemented: false
  }
];

export default function PriorityPuzzle() {
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [policies, setPolicies] = useState<Policy[]>(availablePolicies);
  const [turn, setTurn] = useState(1);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!gameOver) {
        regenerateResources();
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [gameOver]);

  const regenerateResources = () => {
    setResources(current =>
      current.map(resource => ({
        ...resource,
        amount: Math.min(
          resource.maxAmount,
          resource.amount + resource.regenerationRate
        )
      }))
    );
  };

  const implementPolicy = (policy: Policy) => {
    // Check if we have enough resources
    const canImplement = Object.entries(policy.cost).every(([resourceId, cost]) => {
      const resource = resources.find(r => r.id === resourceId);
      return resource && resource.amount >= cost;
    });

    if (!canImplement) {
      setMessage('Not enough resources to implement this policy!');
      return;
    }

    // Deduct costs
    setResources(current =>
      current.map(resource => ({
        ...resource,
        amount: resource.amount - (policy.cost[resource.id] || 0)
      }))
    );

    // Apply benefits
    setTimeout(() => {
      setResources(current =>
        current.map(resource => ({
          ...resource,
          amount: Math.min(
            resource.maxAmount,
            resource.amount + (policy.benefits[resource.id] || 0)
          )
        }))
      );
    }, 1000);

    // Mark policy as implemented
    setPolicies(current =>
      current.map(p =>
        p.id === policy.id
          ? { ...p, implemented: true }
          : p
      )
    );

    // Update score
    const policyScore = calculatePolicyScore(policy);
    setScore(current => current + policyScore);

    setMessage(`Policy implemented! Score: +${policyScore}`);
    setTurn(current => current + 1);

    // Check game over condition
    if (turn >= 10 || policies.every(p => p.implemented)) {
      endGame();
    }
  };

  const calculatePolicyScore = (policy: Policy): number => {
    let score = 0;
    
    // Base score from benefits
    Object.values(policy.benefits).forEach(benefit => {
      score += benefit;
    });
    
    // Bonus for efficient resource use
    const resourceEfficiency = Object.entries(policy.cost).reduce((acc, [resourceId, cost]) => {
      const resource = resources.find(r => r.id === resourceId);
      if (resource) {
        acc += (resource.amount - cost) / resource.maxAmount;
      }
      return acc;
    }, 0);
    
    score += Math.round(resourceEfficiency * 10);
    
    // Bonus for synergies with implemented policies
    const implementedPolicies = policies.filter(p => p.implemented);
    implementedPolicies.forEach(implementedPolicy => {
      if (hasSynergy(policy, implementedPolicy)) {
        score += 5;
      }
    });
    
    return score;
  };

  const hasSynergy = (policy1: Policy, policy2: Policy): boolean => {
    // Example synergy rules
    const synergies: { [key: string]: string[] } = {
      'green_infrastructure': ['education_reform'],
      'education_reform': ['healthcare_expansion'],
      'healthcare_expansion': ['green_infrastructure']
    };
    
    return synergies[policy1.id]?.includes(policy2.id) || 
           synergies[policy2.id]?.includes(policy1.id);
  };

  const endGame = () => {
    setGameOver(true);
    setMessage(`Game Over! Final Score: ${score}`);
  };

  const getResourceColor = (resource: Resource) => {
    const percentage = (resource.amount / resource.maxAmount) * 100;
    if (percentage >= 66) return 'text-green-500';
    if (percentage >= 33) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">
            Policy Priority Puzzle
          </h1>

          <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
            <div className="grid grid-cols-3 gap-4 mb-8">
              {resources.map(resource => (
                <div key={resource.id} className="text-center p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">{resource.name}</h3>
                  <p className={`text-2xl font-bold ${getResourceColor(resource)}`}>
                    {Math.round(resource.amount)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Max: {resource.maxAmount}
                  </p>
                </div>
              ))}
            </div>

            {message && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-gray-100 rounded-lg text-center"
              >
                {message}
              </motion.div>
            )}

            <div className="space-y-4">
              {policies.map(policy => (
                <div
                  key={policy.id}
                  className={`p-4 border rounded-lg ${
                    policy.implemented ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{policy.name}</h3>
                      <p className="text-sm text-gray-600">{policy.description}</p>
                    </div>
                    {!policy.implemented && (
                      <button
                        onClick={() => implementPolicy(policy)}
                        className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded"
                      >
                        Implement
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Costs</h4>
                      <ul className="text-sm">
                        {Object.entries(policy.cost).map(([resourceId, cost]) => (
                          <li key={resourceId}>
                            {resources.find(r => r.id === resourceId)?.name}: {cost}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Benefits</h4>
                      <ul className="text-sm">
                        {Object.entries(policy.benefits).map(([resourceId, benefit]) => (
                          <li key={resourceId}>
                            {resources.find(r => r.id === resourceId)?.name}: +{benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
              <p className="text-gray-600">Turn {turn} of 10</p>
              <p className="text-xl font-bold">Score: {score}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 