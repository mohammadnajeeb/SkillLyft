import { useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronDownIcon,
  QuestionMarkCircleIcon,
  MapIcon,
  AcademicCapIcon,
  BookOpenIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import CodeEditor from '../components/CodeEditor';

type Step = 'knowledge' | 'mapping' | 'goal' | 'style' | 'time';
type GoalOption = 'understand' | 'explain' | 'implement';
type LearningStyle = 'visual' | 'teach' | 'coding';
type TimeCommitment = 'quick' | 'deep' | 'split';

interface ComponentData {
  id: string;
  title: string;
  color: string;
  icon: ReactNode;
  trainingData: string;
  learningType: string;
  goal: string;
}

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState<Step>('knowledge');
  const [progress, setProgress] = useState(0);
  const [selectedLearningStyle, setSelectedLearningStyle] = useState<LearningStyle | null>(null);
  const [selectedTimeCommitment, setSelectedTimeCommitment] = useState<TimeCommitment | null>(null);

  const navigate = useNavigate();
  const [selectedComponents, setSelectedComponents] = useState<Record<string, 'confident' | 'unsure' | null>>({
    pretrained: null,
    supervised: null,
    reward: null,
    policy: null
  });
  const [selectedGoal, setSelectedGoal] = useState<GoalOption | null>(null);

  const handleNext = () => {
    const steps: Step[] = ['knowledge', 'mapping', 'goal', 'style', 'time'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
      setProgress((currentIndex + 1) * 25);
    } else {
      // Pass learning style preference to dashboard
      navigate('/dashboard', { 
        state: { 
          learningStyle: selectedLearningStyle,
          selectedComponents,
          selectedGoal,
          timeCommitment: selectedTimeCommitment
        } 
      });
    }
  };

  const components: ComponentData[] = [
    {
      id: 'pretrained',
      title: 'Pretrained Model',
      color: 'bg-yellow-100',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      trainingData: 'Large corpus of internet text',
      learningType: 'Unsupervised',
      goal: 'Foundational knowledge'
    },
    {
      id: 'supervised',
      title: 'Supervised Fine-Tuning',
      color: 'bg-orange-100',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      trainingData: 'High-quality human-written responses',
      learningType: 'Supervised',
      goal: 'Align with human preferences'
    },
    {
      id: 'reward',
      title: 'Reward Modeling',
      color: 'bg-red-100',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      trainingData: 'Ranked model outputs',
      learningType: 'Supervised',
      goal: 'Predict human preferences'
    },
    {
      id: 'policy',
      title: 'Policy Optimization',
      color: 'bg-pink-100',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      trainingData: 'Reward model signal',
      learningType: 'Reinforcement',
      goal: 'Align behavior with preferences'
    }
  ];

  const handleConfidenceToggle = (componentId: string, value: 'confident' | 'unsure') => {
    setSelectedComponents(prev => ({
      ...prev,
      [componentId]: prev[componentId] === value ? null : value
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8 w-full">
        {/* Progress bar */}
        <div className="mb-16">
          <div className="relative h-3 bg-white rounded-full shadow-sm">
            <div 
              className="absolute h-full bg-primary-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {currentStep === 'knowledge' && (
          <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl space-y-8">
              <h1 className="text-4xl font-extrabold text-center text-gray-900">
                Have you heard about Reward Modeling in RLHF before?
              </h1>
              
              <div className="grid grid-cols-1 gap-6 mt-8">
                <label className="relative flex items-center p-4 cursor-pointer rounded-xl border-2 border-gray-200 hover:border-primary-200 transition-all">
                  <input
                    type="radio"
                    name="knowledge"
                    value="yes"
                    onChange={handleNext}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-4">
                    <div className="text-lg font-medium text-gray-900">Yes</div>
                  </div>
                </label>

                <label className="relative flex items-center p-4 cursor-pointer rounded-xl border-2 border-gray-200 hover:border-primary-200 transition-all">
                  <input
                    type="radio"
                    name="knowledge"
                    value="no"
                    onChange={handleNext}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-4">
                    <div className="text-lg font-medium text-gray-900">No</div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'mapping' && (
          <div className="max-w-5xl mx-auto px-4 w-full">
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h1 className="text-4xl font-extrabold text-center text-gray-900">
                  Map Your Knowledge Areas
                </h1>
              </div>

              <div className="space-y-4">
                <label htmlFor="seen" className="block text-xl font-semibold text-gray-900">
                  Where you have seen it mentioned
                </label>
                <div className="relative">
                  <select
                    id="seen"
                    className="block w-full rounded-md border-gray-300 py-3 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                  >
                    <option>Select Option</option>
                    <option>Research Papers</option>
                    <option>Online Courses</option>
                    <option>Blog Posts</option>
                    <option>Social Media</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Mark confident and unsure areas
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {components.map(component => (
                    <div key={component.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                      <div className={`p-4 ${component.color}`}>
                        <div className="text-gray-600 mb-2">{component.icon}</div>
                        <h3 className="font-semibold text-gray-900">{component.title}</h3>
                      </div>
                      <div className="p-4 space-y-4">
                        <div>
                          <div className="text-sm font-medium text-gray-500">Training Data</div>
                          <div className="mt-1 text-sm text-gray-900">{component.trainingData}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Learning Type</div>
                          <div className="mt-1 text-sm text-gray-900">{component.learningType}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Goal</div>
                          <div className="mt-1 text-sm text-gray-900">{component.goal}</div>
                        </div>
                        <div className="flex flex-col gap-2 pt-2">
                          <button
                            onClick={() => handleConfidenceToggle(component.id, 'confident')}
                            className={`w-full px-3 py-2 text-sm font-medium rounded-md transition-colors
                              ${selectedComponents[component.id] === 'confident' 
                                ? 'bg-primary-600 text-white' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                          >
                            Confident
                          </button>
                          <button
                            onClick={() => handleConfidenceToggle(component.id, 'unsure')}
                            className={`w-full px-3 py-2 text-sm font-medium rounded-md transition-colors
                              ${selectedComponents[component.id] === 'unsure' 
                                ? 'bg-primary-600 text-white' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                          >
                            Unsure
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center pt-8">
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 font-medium transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'goal' && (
          <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-2xl space-y-8">
              <h1 className="text-3xl font-bold text-center text-gray-900">
                What is your goal?
              </h1>
              
              <div className="grid grid-cols-1 gap-6 mt-8">
                <label className={`
                  relative flex items-center p-4 cursor-pointer rounded-xl border-2 transition-all
                  ${selectedGoal === 'understand' 
                    ? 'border-primary-600 bg-primary-50' 
                    : 'border-gray-200 hover:border-primary-200'}
                `}>
                  <input
                    type="radio"
                    name="goal"
                    value="understand"
                    checked={selectedGoal === 'understand'}
                    onChange={(e) => setSelectedGoal(e.target.value as GoalOption)}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <BookOpenIcon className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="text-lg font-medium text-gray-900">Understand theory behind it</div>
                  </div>
                  <div className={`
                    absolute right-4 w-5 h-5 border-2 rounded-full flex items-center justify-center
                    ${selectedGoal === 'understand'
                      ? 'border-primary-600'
                      : 'border-gray-300'}
                  `}>
                    {selectedGoal === 'understand' && (
                      <div className="w-2.5 h-2.5 bg-primary-600 rounded-full" />
                    )}
                  </div>
                </label>

                <label className={`
                  relative flex items-center p-4 cursor-pointer rounded-xl border-2 transition-all
                  ${selectedGoal === 'explain' 
                    ? 'border-primary-600 bg-primary-50' 
                    : 'border-gray-200 hover:border-primary-200'}
                `}>
                  <input
                    type="radio"
                    name="goal"
                    value="explain"
                    checked={selectedGoal === 'explain'}
                    onChange={(e) => setSelectedGoal(e.target.value as GoalOption)}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <AcademicCapIcon className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="text-lg font-medium text-gray-900">Able to explain it to others</div>
                  </div>
                  <div className={`
                    absolute right-4 w-5 h-5 border-2 rounded-full flex items-center justify-center
                    ${selectedGoal === 'explain'
                      ? 'border-primary-600'
                      : 'border-gray-300'}
                  `}>
                    {selectedGoal === 'explain' && (
                      <div className="w-2.5 h-2.5 bg-primary-600 rounded-full" />
                    )}
                  </div>
                </label>

                <label className={`
                  relative flex items-center p-4 cursor-pointer rounded-xl border-2 transition-all
                  ${selectedGoal === 'implement' 
                    ? 'border-primary-600 bg-primary-50' 
                    : 'border-gray-200 hover:border-primary-200'}
                `}>
                  <input
                    type="radio"
                    name="goal"
                    value="implement"
                    checked={selectedGoal === 'implement'}
                    onChange={(e) => setSelectedGoal(e.target.value as GoalOption)}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <div className="text-lg font-medium text-gray-900">Write and test simple model</div>
                  </div>
                  <div className={`
                    absolute right-4 w-5 h-5 border-2 rounded-full flex items-center justify-center
                    ${selectedGoal === 'implement'
                      ? 'border-primary-600'
                      : 'border-gray-300'}
                  `}>
                    {selectedGoal === 'implement' && (
                      <div className="w-2.5 h-2.5 bg-primary-600 rounded-full" />
                    )}
                  </div>
                </label>
              </div>

              <div className="flex justify-center pt-8">
                <button
                  onClick={handleNext}
                  disabled={!selectedGoal}
                  className={`px-8 py-3 rounded-md font-medium transition-colors ${
                    selectedGoal 
                      ? 'bg-primary-600 text-white hover:bg-primary-700' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'style' && (
          <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl space-y-8">
              <h1 className="text-4xl font-extrabold text-center text-gray-900">
                Choose preferred learning style?
              </h1>
              
              <div className="grid grid-cols-1 gap-6 mt-8">
                <label className={`
                  relative flex items-center p-4 cursor-pointer rounded-xl border-2 transition-all
                  ${selectedLearningStyle === 'visual' 
                    ? 'border-primary-600 bg-primary-50' 
                    : 'border-gray-200 hover:border-primary-200'}
                `}>
                  <input
                    type="radio"
                    name="learning-style"
                    value="visual"
                    checked={selectedLearningStyle === 'visual'}
                    onChange={(e) => setSelectedLearningStyle(e.target.value as LearningStyle)}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-lg font-medium text-gray-900">Visual</div>
                  </div>
                  <div className={`
                    absolute right-4 w-5 h-5 border-2 rounded-full flex items-center justify-center
                    ${selectedLearningStyle === 'visual'
                      ? 'border-primary-600'
                      : 'border-gray-300'}
                  `}>
                    {selectedLearningStyle === 'visual' && (
                      <div className="w-2.5 h-2.5 bg-primary-600 rounded-full" />
                    )}
                  </div>
                </label>

                <label className={`
                  relative flex items-center p-4 cursor-pointer rounded-xl border-2 transition-all
                  ${selectedLearningStyle === 'teach' 
                    ? 'border-primary-600 bg-primary-50' 
                    : 'border-gray-200 hover:border-primary-200'}
                `}>
                  <input
                    type="radio"
                    name="learning-style"
                    value="teach"
                    checked={selectedLearningStyle === 'teach'}
                    onChange={(e) => setSelectedLearningStyle(e.target.value as LearningStyle)}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div className="text-lg font-medium text-gray-900">Teach</div>
                  </div>
                  <div className={`
                    absolute right-4 w-5 h-5 border-2 rounded-full flex items-center justify-center
                    ${selectedLearningStyle === 'teach'
                      ? 'border-primary-600'
                      : 'border-gray-300'}
                  `}>
                    {selectedLearningStyle === 'teach' && (
                      <div className="w-2.5 h-2.5 bg-primary-600 rounded-full" />
                    )}
                  </div>
                </label>

                <label className={`
                  relative flex items-center p-4 cursor-pointer rounded-xl border-2 transition-all
                  ${selectedLearningStyle === 'coding' 
                    ? 'border-primary-600 bg-primary-50' 
                    : 'border-gray-200 hover:border-primary-200'}
                `}>
                  <input
                    type="radio"
                    name="learning-style"
                    value="coding"
                    checked={selectedLearningStyle === 'coding'}
                    onChange={(e) => setSelectedLearningStyle(e.target.value as LearningStyle)}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-lg font-medium text-gray-900">Coding</div>
                  </div>
                  <div className={`
                    absolute right-4 w-5 h-5 border-2 rounded-full flex items-center justify-center
                    ${selectedLearningStyle === 'coding'
                      ? 'border-primary-600'
                      : 'border-gray-300'}
                  `}>
                    {selectedLearningStyle === 'coding' && (
                      <div className="w-2.5 h-2.5 bg-primary-600 rounded-full" />
                    )}
                  </div>
                </label>
              </div>

              <div className="flex justify-center pt-8">
                <button
                  onClick={handleNext}
                  disabled={!selectedLearningStyle}
                  className={`px-8 py-3 rounded-md font-medium transition-colors ${
                    selectedLearningStyle 
                      ? 'bg-primary-600 text-white hover:bg-primary-700' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Next
                </button>
              </div>

              {selectedLearningStyle === 'coding' && (
                <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <CodeEditor className="h-[600px]" />
                </div>
              )}
            </div>
          </div>
        )}

        {currentStep === 'time' && (
          <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl space-y-8">
              <h1 className="text-4xl font-extrabold text-center text-gray-900">
                How much time do you want to spend?
              </h1>
              
              <div className="grid grid-cols-1 gap-6 mt-8">
                <label className={`
                  relative flex items-center p-4 cursor-pointer rounded-xl border-2 transition-all
                  ${selectedTimeCommitment === 'quick' 
                    ? 'border-primary-600 bg-primary-50' 
                    : 'border-gray-200 hover:border-primary-200'}
                `}>
                  <input
                    type="radio"
                    name="time-commitment"
                    value="quick"
                    checked={selectedTimeCommitment === 'quick'}
                    onChange={(e) => setSelectedTimeCommitment(e.target.value as TimeCommitment)}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-lg font-medium text-gray-900">Quick Overview (30 min)</div>
                  </div>
                  <div className={`
                    absolute right-4 w-5 h-5 border-2 rounded-full flex items-center justify-center
                    ${selectedTimeCommitment === 'quick'
                      ? 'border-primary-600'
                      : 'border-gray-300'}
                  `}>
                    {selectedTimeCommitment === 'quick' && (
                      <div className="w-2.5 h-2.5 bg-primary-600 rounded-full" />
                    )}
                  </div>
                </label>

                <label className={`
                  relative flex items-center p-4 cursor-pointer rounded-xl border-2 transition-all
                  ${selectedTimeCommitment === 'deep' 
                    ? 'border-primary-600 bg-primary-50' 
                    : 'border-gray-200 hover:border-primary-200'}
                `}>
                  <input
                    type="radio"
                    name="time-commitment"
                    value="deep"
                    checked={selectedTimeCommitment === 'deep'}
                    onChange={(e) => setSelectedTimeCommitment(e.target.value as TimeCommitment)}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="text-lg font-medium text-gray-900">Deep Dive (90 min)</div>
                  </div>
                  <div className={`
                    absolute right-4 w-5 h-5 border-2 rounded-full flex items-center justify-center
                    ${selectedTimeCommitment === 'deep'
                      ? 'border-primary-600'
                      : 'border-gray-300'}
                  `}>
                    {selectedTimeCommitment === 'deep' && (
                      <div className="w-2.5 h-2.5 bg-primary-600 rounded-full" />
                    )}
                  </div>
                </label>

                <label className={`
                  relative flex items-center p-4 cursor-pointer rounded-xl border-2 transition-all
                  ${selectedTimeCommitment === 'split' 
                    ? 'border-primary-600 bg-primary-50' 
                    : 'border-gray-200 hover:border-primary-200'}
                `}>
                  <input
                    type="radio"
                    name="time-commitment"
                    value="split"
                    checked={selectedTimeCommitment === 'split'}
                    onChange={(e) => setSelectedTimeCommitment(e.target.value as TimeCommitment)}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-lg font-medium text-gray-900">Theory + Practice (Split over 2 sessions)</div>
                  </div>
                  <div className={`
                    absolute right-4 w-5 h-5 border-2 rounded-full flex items-center justify-center
                    ${selectedTimeCommitment === 'split'
                      ? 'border-primary-600'
                      : 'border-gray-300'}
                  `}>
                    {selectedTimeCommitment === 'split' && (
                      <div className="w-2.5 h-2.5 bg-primary-600 rounded-full" />
                    )}
                  </div>
                </label>
              </div>

              <div className="flex justify-center pt-8">
                <button
                  onClick={handleNext}
                  disabled={!selectedTimeCommitment}
                  className={`px-8 py-3 rounded-md font-medium transition-colors ${
                    selectedTimeCommitment 
                      ? 'bg-primary-600 text-white hover:bg-primary-700' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}