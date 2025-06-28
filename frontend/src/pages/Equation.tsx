import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import EquationTool from '../components/EquationTool';
import BottomNav from '../components/BottomNav';

interface EquationSection {
  id: string;
  title: string;
  equation: string;
  explanation: string;
  breakdown: {
    component: string;
    description: string;
  }[];
}

export default function Equation() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);
  const [isChunkingToolOpen, setIsChunkingToolOpen] = useState(false);

  const sections: EquationSection[] = [
    {
      id: 'reward-model',
      title: 'Reward Model',
      equation: 'R(x) = w⊤φ(x)',
      explanation: 'The reward model maps each input x to a scalar reward value. Here, w represents learned parameters and φ(x) represents features extracted from the input.',
      breakdown: [
        {
          component: 'R(x)',
          description: 'Scalar reward value for input x'
        },
        {
          component: 'w',
          description: 'Learned parameter vector'
        },
        {
          component: 'φ(x)',
          description: 'Feature vector extracted from input x'
        }
      ]
    },
    {
      id: 'policy-objective',
      title: 'Policy Objective',
      equation: 'J(θ) = 𝔼[R(x) | π_θ]',
      explanation: 'The policy objective function J(θ) represents the expected reward under the current policy π_θ.',
      breakdown: [
        {
          component: 'J(θ)',
          description: 'Expected reward under policy parameters θ'
        },
        {
          component: '𝔼',
          description: 'Expected value operator'
        },
        {
          component: 'π_θ',
          description: 'Policy with parameters θ'
        }
      ]
    },
    {
      id: 'policy-gradient',
      title: 'Policy Gradient',
      equation: '∇_θJ(θ) = 𝔼[∇_θ log π_θ(a|s) · R(s,a)]',
      explanation: 'The policy gradient theorem gives us a way to compute the gradient of the expected reward with respect to the policy parameters.',
      breakdown: [
        {
          component: '∇_θ',
          description: 'Gradient with respect to policy parameters'
        },
        {
          component: 'π_θ(a|s)',
          description: 'Probability of action a given state s'
        },
        {
          component: 'R(s,a)',
          description: 'Reward for state-action pair'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="h-16 bg-white shadow-sm flex items-center px-4 justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-gray-900">RLHF Equations</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <nav className="space-y-1 mb-4">
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(index)}
                    className={`w-full px-4 py-2 text-left rounded-md ${
                      activeSection === index
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
              
              {/* Equation Chunking Tools Button */}
              <button
                onClick={() => setIsChunkingToolOpen(true)}
                className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
              >
                <span>🧮</span>
                Equation Chunking Tools
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {sections[activeSection].title}
              </h2>
              <div className="space-y-8">
                {/* Equation Display */}
                <div className="p-6 bg-gray-50 rounded-lg flex justify-center">
                  <BlockMath math={sections[activeSection].equation} />
                </div>

                {/* Explanation */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Explanation</h3>
                  <p className="text-gray-700">
                    {sections[activeSection].explanation}
                  </p>
                </div>

                {/* Component Breakdown */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Component Breakdown</h3>
                  <div className="grid gap-4">
                    {sections[activeSection].breakdown.map((item, index) => (
                      <div
                        key={index}
                        className="p-4 border border-gray-200 rounded-lg flex items-start gap-4"
                      >
                        <div className="font-mono text-lg text-primary-600">
                          {item.component}
                        </div>
                        <div className="text-gray-700">
                          {item.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Equation Tool Modal */}
      <EquationTool
        isOpen={isChunkingToolOpen}
        onClose={() => setIsChunkingToolOpen(false)}
        initialEquation={sections[activeSection].equation}
      />

      <BottomNav />
    </div>
  );
}
