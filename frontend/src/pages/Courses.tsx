import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface Course {
  title: string;
  description: string;
  lastUpdated: string;
  imageUrl: string;
}

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const courses: Course[] = [
    {
      title: "Reward Modeling in RLHF",
      description: "A popular technique to fine-tune large language models with human feedback.",
      lastUpdated: "3 months ago",
      imageUrl: "/images/google-deepmind-8heReYC6Zt0-unsplash.jpg"
    },
    {
      title: "Supervised Fine-Tuning for LLM Alignment",
      description: "How high-quality human demonstrations are used to guide LLM behavior before reinforcement learning.",
      lastUpdated: "1 month ago",
      imageUrl: "/images/google-deepmind-Fv39DqWqtHw-unsplash.jpg"
    },
    {
      title: "Policy Optimization using PPO & DPO",
      description: "Proximal Policy Optimization and Direct Preference Optimization shape final LLM outputs post-reward modeling.",
      lastUpdated: "3 days ago",
      imageUrl: "/images/google-deepmind-jJMqaZU4EnU-unsplash.jpg"
    },
    {
      title: "Prompt Engineering for Feedback Collection",
      description: "Design prompts that maximize clarity and yield better user preference data to train reward models.",
      lastUpdated: "2 weeks ago",
      imageUrl: "/images/google-deepmind-LcgLq78WZCQ-unsplash.jpg"
    },
    {
      title: "Evaluation Metrics in RLHF Systems",
      description: "Dive into techniques to assess model alignment, human preference satisfaction, and reward signal fidelity.",
      lastUpdated: "3 weeks ago",
      imageUrl: "/images/google-deepmind-LuzT78A1g7M-unsplash.jpg"
    },
    {
      title: "Ethical Challenges in Human Feedback Learning",
      description: "Critically examine bias, subjectivity, and safety issues in human-in-the-loop training for LLMs.",
      lastUpdated: "4 weeks ago",
      imageUrl: "/images/google-deepmind-LcgLq78WZCQ-unsplash.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Find the right course for you</h1>
          
          {/* Search box moved to right */}
          <div className="relative w-72">
            <input
              type="text"
              placeholder="Search Course"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-transparent border-none focus:ring-0 focus:outline-none"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Filters moved below title */}
        <div className="flex items-center space-x-2 mb-8">
          <span className="text-gray-700">Filter by</span>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select className="appearance-none border border-gray-300 rounded-md pl-3 pr-10 py-2 bg-white focus:ring-primary-500 focus:border-primary-500 relative z-0">
                <option>Program Level</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none z-10" />
            </div>
            <div className="relative">
              <select className="appearance-none border border-gray-300 rounded-md pl-3 pr-10 py-2 bg-white focus:ring-primary-500 focus:border-primary-500 relative z-0">
                <option>Subject</option>
                <option>Machine Learning</option>
                <option>Deep Learning</option>
                <option>Reinforcement Learning</option>
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none z-10" />
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => {
                if (course.title === "Reward Modeling in RLHF") {
                  navigate('/onboarding');
                }
              }}
            >
              <div className="h-48 bg-gray-200 relative">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="text-sm text-gray-500">
                  Last updated {course.lastUpdated}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 space-x-2">
          <button className="p-2 rounded-md border border-gray-300 hover:bg-gray-50">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="px-4 py-2 text-white bg-primary-600 rounded-md">1</button>
          <button className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md">2</button>
          <button className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md">3</button>
          <button className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md">4</button>
          <button className="p-2 rounded-md border border-gray-300 hover:bg-gray-50">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
}
