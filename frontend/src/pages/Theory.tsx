import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

interface Section {
  id: string;
  title: string;
  content: string;
  examples: string[];
  videoUrl?: string;
  subsections?: {
    title: string;
    content: string;
    formula?: string;
  }[];
}

export default function Theory() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);

  const sections: Section[] = [
    {
      id: 'intro',
      title: 'Introduction to RLHF',
      content: `Reinforcement Learning from Human Feedback (RLHF) is a technique that helps align AI behavior with human preferences through a Reward Model (RM).

💡 Key Concept:
The Reward Model acts like a teacher's assistant - it learns to score AI outputs based on human preferences. These scores then guide the AI to generate more helpful and human-aligned responses.

✍️ How it works:
• The AI generates multiple responses to a prompt
• Humans rank these responses by preference
• The Reward Model learns from these rankings
• The AI is trained to maximize the Reward Model's scores

✅ Why it matters:
• Helps create more helpful and safe AI responses
• Bridges the gap between human values and AI behavior
• Enables continuous improvement through feedback`,
      examples: [
        'ChatGPT uses RLHF to improve response quality',
        'Human evaluators rate model outputs to create preference data',
        'The reward model learns to predict human preferences',
        'Continuous feedback loop improves results over time'
      ]
    },
    {
      id: 'components',
      title: 'Core Components',
      content: `RLHF consists of three main components:

1. Base Model: A pre-trained language model that serves as the starting point
2. Reward Model: Learns to predict human preferences
3. Policy Optimization: Updates the model to maximize predicted reward`,
      examples: [
        'Base models like GPT-3 provide foundation',
        'Reward models trained on human preference data',
        'PPO algorithm often used for policy optimization'
      ]
    },
    {
      id: 'process',
      title: 'RLHF Process',
      content: `The RLHF process typically follows these steps:

1. Collect human feedback on model outputs
2. Train a reward model on this feedback
3. Use RL to optimize the model's policy
4. Iterate and refine based on results`,
      examples: [
        'Human raters compare pairs of responses',
        'Binary choices create preference datasets',
        'Continuous feedback loop improves results'
      ]
    },
    {
      id: 'reward-modeling',
      title: 'Reward Modeling',
      content: `Reward modeling is a technique used to teach AI systems what humans value by learning a reward function from human preferences. It enables reinforcement learning even when no explicit numeric reward exists by turning human comparisons into trainable signals.`,
      examples: [
        'Model outputs are compared to create trainable signals',
        'Preference pairs guide the learning process',
        'Learned reward function enables RL optimization'
      ],
      subsections: [
        {
          title: 'a. Human Preference Dataset',
          content: `Humans are shown multiple outputs from a model (e.g., two different responses to the same prompt).

Collection Process:
1. Presentation: Multiple outputs are shown from the model
2. Selection: Evaluators choose their preferred output
3. Aggregation: These choices form preference pairs

For example: "Output A ≻ Output B" (A is better than B)`
        },
        {
          title: 'b. Reward Model (RM) Training',
          content: `A separate model (often a transformer-based encoder like BERT) is trained to assign scalar scores to outputs.

Training Process:
1. Input: Model generates multiple outputs
2. Scoring: RM assigns scalar values to each output
3. Objective: Ensure RM(A) > RM(B) when humans prefer A over B

The loss function used is the pairwise preference loss, derived from logistic regression:`,
          formula: 'LRM = −log(ra / (ra + rb))\n\nwhere ra, rb are scalar scores from the RM\nfor outputs A and B respectively'
        },
        {
          title: 'c. Integration with RL',
          content: `The RM becomes the reward function in PPO (or other RL algorithm).

Training Loop:
1. Generation: Model produces candidate outputs
2. Evaluation: RM assigns scores to each output
3. Optimization: Policy is updated to maximize expected reward
4. Iteration: Process repeats with new outputs`
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
          <h1 className="text-xl font-semibold text-gray-900">Theory</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Contents</h3>
              <nav className="space-y-2">
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(index)}
                    className={`w-full px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                      activeSection === index
                        ? 'bg-primary-50 text-primary-700 shadow-sm font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {sections[activeSection].title}
              </h2>
              <div className="h-1 w-20 bg-primary-600 rounded mb-8"></div>
              
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                  {sections[activeSection].content}
                </p>

                {sections[activeSection].subsections ? (
                  <div className="space-y-8 mt-8">
                    {sections[activeSection].subsections.map((subsection, index) => (
                      <div key={index} className="bg-gray-50 rounded-xl p-8 border border-gray-100">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                          <div className="w-1 h-6 bg-primary-600 rounded-full mr-3"></div>
                          {subsection.title}
                        </h3>
                        <div className="space-y-6">
                          <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                            {subsection.content}
                          </div>
                          {subsection.formula && (
                            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                              <p className="font-mono text-center text-lg mb-2">{subsection.formula}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Examples:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {sections[activeSection].examples.map((example, index) => (
                        <li key={index} className="text-gray-700">
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white border-t border-gray-200">
        <BottomNav activePage="theory" />
      </div>
    </div>
  );
}
