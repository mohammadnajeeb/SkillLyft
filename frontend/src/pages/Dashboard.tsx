import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useNavigate, useLocation } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';
import BottomNav from '../components/BottomNav';

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
            <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
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
                  <div className="prose max-w-none space-y-6 text-gray-600">
                    <p>
                      In Reinforcement Learning from Human Feedback (RLHF), the Reward Model (RM) plays a central role in aligning AI behavior with human preferences.
                    </p>
                    
                    <p>
                      But what is it, and why is it needed?
                    </p>
                    
                    <p>
                      When we train large language models (LLMs) like ChatGPT, it's not enough for them to just predict the next word, we want them to generate helpful, safe, and human-aligned outputs. This is where reward modeling comes in.
                    </p>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-gray-800">
                        💡 Think of the Reward Model as a teacher's assistant. After a model generates two responses to the same prompt, the Reward Model learns which one a human would prefer, and scores them accordingly. These scores guide further training of the model using Reinforcement Learning techniques like PPO (Proximal Policy Optimization).
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
                      <p className="font-medium">✍️ In simple terms:</p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Goal: Teach an AI what kinds of responses are "good" or "bad" — based on human judgments.</li>
                        <li>How it works: A dataset of human-ranked outputs is used to train a separate model (the Reward Model), which then scores new outputs.</li>
                        <li>Why it matters: It's the bridge between human preferences and AI behavior.</li>
                      </ul>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                      <p className="font-medium text-gray-800">🔍 Real-World Analogy:</p>
                      <p className="mt-2">
                        Imagine a student writing two essays. A teacher (human) picks which one is better. Over time, an assistant learns the teacher's taste and can start grading on their behalf. That assistant is like the Reward Model.
                      </p>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-4">
                      <p className="font-medium text-gray-800">✅ Key Roles of the Reward Model:</p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Encodes human feedback into a numeric score</li>
                        <li>Acts as a reward function during reinforcement learning (e.g., PPO)</li>
                        <li>Helps align LLM output with values like helpfulness, harmlessness, and honesty</li>
                      </ul>
                    </div>

                    {/* Video section */}
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe
                        src="https://www.youtube.com/embed/qPN_XZcJf_s?start=454"
                        title="Introduction to Reward Modeling"
                        className="w-full h-[250px] rounded-lg"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
                
                {/* Learning path overview */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Your Learning Path
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-1">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Understanding Basics</h4>
                        <p className="text-sm text-gray-500">
                          Learn what reward modeling is and why it's important in RLHF
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Theory Deep Dive</h4>
                        <p className="text-sm text-gray-500">
                          Explore the mathematical foundations and key concepts
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Hands-on Practice</h4>
                        <p className="text-sm text-gray-500">
                          Apply your knowledge with interactive coding exercises
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Your Progress</h3>
                    <span className="text-sm text-gray-500">1 of 3 completed</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary-600 h-2 rounded-full" style={{ width: '33%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'code' && (
            <div className="p-8">
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Hands-on Coding Exercise
                  </h2>
                  <p className="text-gray-600">
                    Let's implement a simple reward model. This exercise will help you understand 
                    how reward modeling works in practice.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <CodeEditor className="h-[600px]" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <BottomNav activePage="dashboard" />
    </div>
  );
}