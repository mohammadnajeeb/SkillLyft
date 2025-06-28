import { useState } from 'react';
import BottomNav from '../components/BottomNav';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

// Exact conversation pairs
const RESPONSES: [string, string][] = [
  [
    "Hey Luma! Today I'll teach you what a Reward Model is in RLHF.",
    "Awesome! I'm excited to learn. Let's begin — what does a Reward Model do?"
  ],
  [
    "It's a model that learns from human preferences to tell which output is better, like when the AI generates two answers and a human picks one.",
    "Ah, so it learns to imitate human choices! But how does it decide numerically which one is better?"
  ],
  [
    "It gives a scalar reward score to each output. The one that humans prefer should get a higher score.",
    "Got it. And how is it trained? Do we use a loss function like in regular models?"
  ],
  [
    "Yes! There's a pairwise loss function based on softmax. If A is preferred over B, the model is trained to give A a higher score.",
    "That's helpful! Does this Reward Model directly update the language model too?"
  ],
  [
    "Not directly. It's used in PPO to give rewards. The LM is fine-tuned using that reward signal during training.",
    "Nice! One last thing — what could go wrong if the human feedback is biased?"
  ],
  [
    "Then the Reward Model would also learn those biases and might prefer problematic outputs — that's a big risk.",
    "Brilliant explanation! You're really thinking like an expert. 🎓 Would you like to test me with a small question now?"
  ]
];

const MessageBubble = ({ message }: { message: Message }) => {
  const isUser = message.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] rounded-2xl p-4 ${
          isUser
            ? 'bg-primary-600 text-white rounded-br-none'
            : 'bg-white shadow-sm border border-gray-200 rounded-bl-none'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {isUser ? `🧑‍🎓 You:\n${message.content}` : `🤖 Luma:\n${message.content}`}
        </p>
      </div>
    </div>
  );
};

export default function TeachLuma() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [conversationIndex, setConversationIndex] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Create user message
    const userMessage: Message = {
      role: 'user' as const,
      content: input
    };
    setMessages(prev => [...prev, userMessage]);

    // Find matching response
    const currentPair = RESPONSES.find(([prompt]) => 
      input.trim() === prompt.trim()
    );

    let response: string;
    if (currentPair) {
      response = currentPair[1];
      setConversationIndex(prev => prev + 1);
    } else {
      // Suggest the next prompt in the conversation
      response = conversationIndex < RESPONSES.length 
        ? `Try saying: "${RESPONSES[conversationIndex][0]}"`
        : "Great! We've completed our discussion about Reward Models in RLHF!";
    }

    // Create Luma's response
    const lumaMessage: Message = {
      role: 'assistant' as const,
      content: response
    };
    setMessages(prev => [...prev, lumaMessage]);
    setInput('');
  };

  // Helper function to autofill next prompt
  const autofillNextPrompt = () => {
    if (conversationIndex < RESPONSES.length) {
      setInput(RESPONSES[conversationIndex][0]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 rounded-lg border p-2"
              placeholder="What would you like to teach?"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Send
            </button>
          </div>
          {conversationIndex < RESPONSES.length && (
            <button
              type="button"
              onClick={autofillNextPrompt}
              className="text-sm text-gray-500 hover:text-gray-700 text-left"
            >
              💡 Try: "{RESPONSES[conversationIndex][0]}"
            </button>
          )}
        </div>
      </form>

      <BottomNav />
    </div>
  );
}