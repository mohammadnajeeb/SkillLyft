import { useState, useRef, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { Dialog, Transition } from '@headlessui/react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  type: 'text' | 'latex' | 'image' | 'voice';
  imageUrl?: string;
  voiceUrl?: string;
};

// Message component to handle different types of messages
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
        {message.type === 'latex' && (
          <div className="latex-content font-mono">
            <BlockMath math={message.content} />
          </div>
        )}
        {message.type === 'text' && (
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </p>
        )}
        {message.type === 'image' && message.imageUrl && (
          <div className="space-y-2">
            <img src={message.imageUrl} alt="Uploaded content" className="max-w-full rounded-lg" />
            <p className="text-sm opacity-75">{message.content}</p>
          </div>
        )}
        {message.type === 'voice' && (
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <div className="flex-1">
              <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded-full relative overflow-hidden">
                <div className="absolute inset-0 flex items-center px-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-1 rounded-full">
                    <div className="bg-primary-600 h-full w-0 rounded-full transition-all duration-300"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Complex Editor Dialog component
const ComplexEditorDialog = ({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string, type: Message['type']) => void;
}) => {
  const [content, setContent] = useState('');
  const [messageType, setMessageType] = useState<Message['type']>('text');
  const [previewLatex, setPreviewLatex] = useState(false);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 mb-4">
                  Create Message
                </Dialog.Title>
                
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setMessageType('text')}
                      className={`px-3 py-1 rounded-full ${
                        messageType === 'text' ? 'bg-primary-600 text-white' : 'bg-gray-100'
                      }`}
                    >
                      Text
                    </button>
                    <button
                      onClick={() => setMessageType('latex')}
                      className={`px-3 py-1 rounded-full ${
                        messageType === 'latex' ? 'bg-primary-600 text-white' : 'bg-gray-100'
                      }`}
                    >
                      LaTeX
                    </button>
                  </div>

                  <div className="space-y-2">
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder={messageType === 'latex' ? 'Enter LaTeX formula...' : 'Type your message...'}
                      className="w-full h-40 p-4 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    {messageType === 'latex' && (
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={previewLatex}
                            onChange={(e) => setPreviewLatex(e.target.checked)}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-sm">Preview LaTeX</span>
                        </label>
                        {previewLatex && content && (
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <BlockMath math={content} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (content.trim()) {
                        onSubmit(content.trim(), messageType);
                        setContent('');
                        onClose();
                      }
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  >
                    Send
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default function TeachLuma() {
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const [isComplexEditorOpen, setIsComplexEditorOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Luma. I'm here to learn about Reward Modeling in RLHF from you. Please explain the concept, and I'll provide feedback and ask questions.",
      type: 'text'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

  // Teaching function
  const handleTeach = () => {
    scrollToBottom();
  };

  // Chat function
  const handleChat = (content: string, type: Message['type'] = 'text') => {
    // Add user message
    const userMessage: Message = {
      role: 'user',
      content,
      type,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    scrollToBottom();
  };

  // Handle teaching submission
  const handleTeachSubmit = async (content: string) => {
    try {
      setIsLoading(true);
      
      // Add user's message
      setMessages(prev => [...prev, {
        role: 'user',
        content,
        type: 'text'
      }]);

      // Show typing indicator
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '...',
        type: 'text'
      }]);

      // Get AI feedback
      const response = await fetch('http://localhost:3001/api/teach', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: content }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      
      // Remove typing indicator and add AI's feedback
      setMessages(prev => {
        const newMessages = prev.slice(0, -1); // Remove typing indicator
        if (data.success) {
          newMessages.push({
            role: 'assistant',
            content: data.feedback || "I understood your explanation. Could you elaborate more on specific aspects?",
            type: 'text'
          });
        }
        return newMessages;
      });
    } catch (error) {
      console.error('Error:', error);
      // Remove typing indicator and add error message
      setMessages(prev => {
        const newMessages = prev.slice(0, -1); // Remove typing indicator
        newMessages.push({
          role: 'assistant',
          content: "I'm having trouble connecting to the server. Please check your connection and try again.",
          type: 'text'
        });
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle chat messages
  const handleChatSubmit = async (content: string) => {
    try {
      setIsLoading(true);
      
      // Add user's message
      setMessages(prev => [...prev, {
        role: 'user',
        content,
        type: 'text'
      }]);

      // Show typing indicator
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '...',
        type: 'text'
      }]);

      // Get AI response
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      
      // Remove typing indicator and add AI's response
      setMessages(prev => {
        const newMessages = prev.slice(0, -1); // Remove typing indicator
        if (data.success) {
          newMessages.push({
            role: 'assistant',
            content: data.response || "I understand your question. Could you rephrase it?",
            type: 'text'
          });
        }
        return newMessages;
      });
    } catch (error) {
      console.error('Error:', error);
      // Remove typing indicator and add error message
      setMessages(prev => {
        const newMessages = prev.slice(0, -1); // Remove typing indicator
        newMessages.push({
          role: 'assistant',
          content: "I'm having trouble connecting to the server. Please check your connection and try again.",
          type: 'text'
        });
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    try {
      setIsLoading(true);
      
      // Add user message
      const userMessage: Message = {
        role: 'user',
        content: input.trim(),
        type: 'text'
      };
      setMessages(prev => [...prev, userMessage]);
      
      // Clear input
      setInput('');

      // Add typing indicator
      const typingIndicator: Message = {
        role: 'assistant',
        content: '...',
        type: 'text'
      };
      setMessages(prev => [...prev, typingIndicator]);

      console.log('Sending message to backend:', userMessage.content);
      // Send to backend
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage.content }),
      });
      
      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Remove typing indicator and add AI response
      setMessages(prev => {
        const withoutTyping = prev.slice(0, -1); // Remove typing indicator
        return [...withoutTyping, {
          role: 'assistant',
          content: data.response,
          type: 'text'
        }];
      });

    } catch (error) {
      console.error('Error:', error);
      // Remove typing indicator and add error message
      setMessages(prev => {
        const withoutTyping = prev.slice(0, -1);
        return [...withoutTyping, {
          role: 'assistant',
          content: "I'm having trouble connecting to the server. Please try again.",
          type: 'text'
        }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplexSubmit = (content: string, type: Message['type']) => {
    const userMessage: Message = { role: 'user', content, type };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    // Simulate Luma's response for LaTeX messages
    if (type === 'latex') {
      setTimeout(() => {
        const assistantMessage: Message = {
          role: 'assistant',
          content: 'I see you used a mathematical expression. Can you break down what each part represents?',
          type: 'text'
        };
        setMessages([...newMessages, assistantMessage]);
      }, 1000);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        const userMessage: Message = { 
          role: 'user', 
          content: 'Sent an image', 
          type: 'image',
          imageUrl 
        };
        setMessages([...messages, userMessage]);
      };
      reader.readAsDataURL(file);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      audioRef.current = mediaRecorder;
      setRecordedChunks([]);

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setRecordedChunks((chunks) => [...chunks, e.data]);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (audioRef.current && audioRef.current.state === 'recording') {
      audioRef.current.stop();
      setIsRecording(false);
      
      // Create voice message when recording stops
      audioRef.current.onstop = () => {
        const audioBlob = new Blob(recordedChunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const userMessage: Message = {
          role: 'user',
          content: 'Voice message',
          type: 'voice',
          voiceUrl: audioUrl
        };
        setMessages([...messages, userMessage]);
        setRecordedChunks([]);
      };
    }
  };

  const handleVoiceRecord = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h1 className="flex items-center text-xl font-semibold text-gray-900">
                <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Teach Luma AI
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <MessageBubble key={index} message={message} />
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsComplexEditorOpen(true)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="Open Complex Editor"
            >
              <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                input.trim() && !isLoading
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Complex Editor Dialog */}
      <ComplexEditorDialog
        isOpen={isComplexEditorOpen}
        onClose={() => setIsComplexEditorOpen(false)}
        onSubmit={handleComplexSubmit}
      />

      <div className="mt-8 bg-white border-t border-gray-200">
        <BottomNav activePage="teach" />
      </div>
    </div>
  );
}