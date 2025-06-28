import { useState } from 'react';
import TeachLuma from './TeachLuma';

type Tab = 'intro' | 'theory' | 'equation' | 'code';

export default function ModuleNavigator() {
  const [activeTab, setActiveTab] = useState<Tab>('intro');
  const [progress, setProgress] = useState(0);
  const [notes, setNotes] = useState('');

  const tabs: { id: Tab; name: string }[] = [
    { id: 'intro', name: 'Intro' },
    { id: 'theory', name: 'Theory' },
    { id: 'equation', name: 'Equation' },
    { id: 'code', name: 'Code' }
  ];

  return (
    <div className="h-screen flex">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Progress bar */}
        <div className="p-4 border-b">
          <div className="relative h-2 bg-gray-200 rounded-full">
            <div 
              className="absolute h-full bg-primary-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'intro' && (
            <div className="prose max-w-none">
              <h1>Welcome to Reward Modeling in RLHF</h1>
              <p>
                In this module, you'll learn about reward modeling, a crucial component 
                of Reinforcement Learning from Human Feedback (RLHF).
              </p>
              <h2>What you'll learn</h2>
              <ul>
                <li>Understanding the role of reward modeling in RLHF</li>
                <li>Key concepts and mathematical foundations</li>
                <li>Practical implementation considerations</li>
              </ul>
            </div>
          )}

          {activeTab === 'theory' && (
            <div className="space-y-6">
              <div className="prose max-w-none">
                <h2>Reward Modeling Theory</h2>
                <p>
                  Reward modeling is a technique used to learn a reward function from human feedback.
                  This reward function helps guide the behavior of AI systems towards desired outcomes.
                </p>
                {/* Add more theory content */}
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-2">Reflection Space</h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Write your understanding here..."
                  className="w-full h-32 p-3 border rounded-md"
                />
                <button
                  onClick={() => {/* Save notes */}}
                  className="mt-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  Save Notes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'equation' && (
            <div className="prose max-w-none">
              <h2>Key Equations</h2>
              {/* Add equation content with LaTeX rendering */}
            </div>
          )}

          {activeTab === 'code' && (
            <div className="prose max-w-none">
              <h2>Implementation</h2>
              <p>Let's implement a simple reward model using Python.</p>
              {/* Add code editor component */}
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-80 border-l">
        <TeachLuma />
      </div>
    </div>
  );
}