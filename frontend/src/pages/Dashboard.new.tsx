import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useNavigate, useLocation } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';

type Section = 'intro' | 'theory' | 'equation' | 'code';

interface LocationState {
  learningStyle?: 'visual' | 'teach' | 'coding';
  selectedComponents?: Record<string, 'confident' | 'unsure' | null>;
  selectedGoal?: 'understand' | 'explain' | 'implement';
  timeCommitment?: 'quick' | 'deep' | 'split';
}

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  
  // Set initial active section based on learning style
  const [activeSection, setActiveSection] = useState<Section>(
    state?.learningStyle === 'coding' ? 'code' : 'intro'
  );
  const [level] = useState(1);

  const sections: { id: Section; title: string }[] = [
    { id: 'intro', title: 'Intro' },
    { id: 'theory', title: 'Theory' },
    { id: 'equation', title: 'Equation' },
    { id: 'code', title: 'Code' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="h-16 bg-white shadow-sm flex items-center px-4 justify-between">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            ⚡
          </span>
          <h1 className="text-xl font-semibold text-gray-900">
            Reward Modeling in RLHF
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white">
            Level {level}
            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-white border-r border-gray-200">
          <nav className="p-4 space-y-1">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => {
                  if (section.id === 'theory') {
                    navigate('/theory');
                  } else if (section.id === 'equation') {
                    navigate('/equation');
                  } else {
                    setActiveSection(section.id);
                  }
                }}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-left ${
                  activeSection === section.id
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="font-medium">{section.title}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          {activeSection === 'intro' && (
            <div className="p-8">
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Welcome to Reward Modeling in RLHF
                  </h2>
                  <p className="text-gray-600">
                    In this module, you'll learn about Reward Modeling, a crucial component of 
                    Reinforcement Learning from Human Feedback (RLHF). Let's get started!
                  </p>
                </div>
                
                {/* Video section */}
                <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'code' && (
            <div className="p-8">
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Coding Practice
                  </h2>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                      Save Progress
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700">
                      Run Code
                    </button>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <CodeEditor className="h-[600px]" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Toolbar */}
      <div className="fixed bottom-0 left-0 right-0 h-20 border-t border-gray-200 flex items-center justify-center gap-4 bg-white px-4">
        <button
          onClick={() => navigate('/reflection-space')}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-coral-100 text-coral-700 hover:bg-coral-200"
        >
          <span>💭</span>
          Reflection Space
        </button>
        <button
          onClick={() => navigate('/self-questioning')}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-teal-100 text-teal-700 hover:bg-teal-200"
        >
          <span>❓</span>
          Self Questioning
        </button>
        <button
          onClick={() => navigate('/quick-notes')}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-amber-100 text-amber-700 hover:bg-amber-200"
        >
          <span>📝</span>
          Quick Notes
        </button>
        <button
          onClick={() => navigate('/teach-luma')}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-teal-100 text-teal-700 hover:bg-teal-200"
        >
          <span>🤖</span>
          Teach Luma AI
        </button>
      </div>
    </div>
  );
}
