import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* LLM Card */}
          <div className="relative h-48 rounded-xl overflow-hidden">
            <img 
              src="/images/google-deepmind-LuzT78A1g7M-unsplash.jpg" 
              alt="LLM" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h2 className="text-white text-3xl font-bold">LLM?</h2>
            </div>
          </div>

          {/* Transformers Card */}
          <div className="relative h-48 rounded-xl overflow-hidden">
            <img 
              src="/images/google-deepmind-Fv39DqWqtHw-unsplash.jpg" 
              alt="Transformers" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h2 className="text-white text-3xl font-bold">TRANSFORMERS?</h2>
            </div>
          </div>

          {/* Neural Networks Card */}
          <div className="relative h-48 rounded-xl overflow-hidden">
            <img 
              src="/images/google-deepmind-jJMqaZU4EnU-unsplash.jpg" 
              alt="Neural Networks" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h2 className="text-white text-3xl font-bold">NEURAL NETWORKS?</h2>
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-12 gap-6 mb-6">
          {/* Left Features */}
          <div className="col-span-3 space-y-4">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-4">
              <h3 className="text-white font-semibold">VISUAL EXPLANATION</h3>
            </div>
            <div className="bg-gray-400 rounded-xl p-4">
              <h3 className="text-white font-semibold">PRACTICAL EXERCISE</h3>
            </div>
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl p-4">
              <h3 className="text-white font-semibold">TEACH TO AN AGENT</h3>
            </div>
          </div>

          {/* Middle Section - Struggling Card */}
          <div className="col-span-3 bg-gradient-to-b from-blue-900 to-blue-800 rounded-xl p-6 flex flex-col justify-center items-center text-center">
            <h3 className="text-white font-semibold mb-2">STRUGGLING WITH</h3>
            <p className="text-white">ADVANCED & HOT AI TOPICS?</p>
          </div>

          {/* Center Logo Section */}
          <div className="col-span-3 bg-gradient-to-br from-red-500 to-purple-600 rounded-xl p-6 flex flex-col justify-center items-center text-center">
            <h2 className="text-white text-2xl font-bold mb-2">SKILL - LYFT</h2>
            <p className="text-white text-sm">DEVELOP A DEEPER AI CONCEPTUAL UNDERSTANDING AND RESEARCH READINESS</p>
          </div>

          {/* Right Features */}
          <div className="col-span-3 space-y-4">
            <div className="bg-gray-700 rounded-xl p-4">
              <h3 className="text-white text-sm font-semibold">CONCEPTS THAT REQUIRES MATH + CS + LANG. + 3D</h3>
            </div>
            <div className="bg-purple-900 rounded-xl p-4">
              <h3 className="text-white font-semibold">RESEARCH READINESS</h3>
            </div>
            <div className="bg-gradient-to-r from-amber-500 to-orange-400 rounded-xl p-4">
              <h3 className="text-white font-semibold">CONCEPTUAL MASTERY</h3>
            </div>
            <div className="bg-blue-900 rounded-xl p-4">
              <h3 className="text-white font-semibold">CAREER PREPAREDNESS</h3>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-4 gap-6">
          <div className="relative h-32 rounded-xl overflow-hidden">
            <img 
              src="/images/google-deepmind-8heReYC6Zt0-unsplash.jpg" 
              alt="Chunking" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h2 className="text-white text-xl font-bold">CHUNKING</h2>
            </div>
          </div>
          <div className="relative h-32 rounded-xl overflow-hidden bg-gradient-to-r from-red-700 to-red-900">
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-white text-xl font-bold">MULTIMODAL</h2>
            </div>
          </div>
          <div className="relative h-32 rounded-xl overflow-hidden bg-gray-600">
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-white text-xl font-bold">ACTIVE RECALL</h2>
            </div>
          </div>
          <div className="relative h-32 rounded-xl overflow-hidden">
            <img 
              src="/images/google-deepmind-LcgLq78WZCQ-unsplash.jpg" 
              alt="Learn by Teaching" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h2 className="text-white text-xl font-bold">LEARN BY TEACHING</h2>
            </div>
          </div>
        </div>

        {/* Credits */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>GROUP 18 | PIYUSH PANT (TECH) MARYAMSADAT ZIAZABARI (EVAL) MOHAMMAD NAJEEB (DESIGN) SYED MOOSA ABBAS (TECH)</p>
          <p className="mt-2">Image Source: Google DeepMind, Unsplash, Canva</p>
          
          {/* References Section */}
          <div className="mt-8 max-w-2xl mx-auto text-left">
            <h3 className="font-semibold text-gray-700 mb-4">References:</h3>
            <ul className="space-y-2 text-gray-600">
              <li>1. 6000+ Icon Packs - <a href="https://www.figma.com/community/file/1265980182725507386" className="text-teal-600 hover:underline" target="_blank" rel="noopener noreferrer">View Resource</a></li>
              <li>2. Material Design Icons (Community) - <a href="https://www.figma.com/community/plugin/775671607185029020/material-design-icons-community" className="text-teal-600 hover:underline" target="_blank" rel="noopener noreferrer">View Resource</a></li>
              <li>3. Bootstrap 5 UI Kit - <a href="https://www.figma.com/community/file/876022745968684318" className="text-teal-600 hover:underline" target="_blank" rel="noopener noreferrer">View Resource</a></li>
              <li>4. Logo: <a href="https://www.canva.com" className="text-teal-600 hover:underline" target="_blank" rel="noopener noreferrer">Canava AI</a></li>
              <li>5. Images: <a href="https://unsplash.com" className="text-teal-600 hover:underline" target="_blank" rel="noopener noreferrer">Unsplash</a></li>
              <li>6. Equation: <a href="https://pakhapoomsarapat.medium.com/forget-rlhf-because-dpo-is-what-you-actually-need-f10ce82c9b95" className="text-teal-600 hover:underline" target="_blank" rel="noopener noreferrer">View Article</a></li>
              <li>7. Pipeline Graph: <a href="https://napkin.ai" className="text-teal-600 hover:underline" target="_blank" rel="noopener noreferrer">Napkin AI</a></li>
            </ul>
          </div>

          {/* AI Assistant Credits */}
          <div className="mt-8 max-w-2xl mx-auto text-left">
            <h3 className="font-semibold text-gray-700 mb-4">Development Assistant:</h3>
            <p className="text-gray-600">
              This project was developed with assistance from GitHub Copilot, an AI programming assistant. Key contributions include:
            </p>
            <ul className="mt-2 space-y-2 text-gray-600 list-disc list-inside">
              <li>Implementation of the RLHF teaching logic</li>
              <li>Frontend component development</li>
              <li>API integration and error handling</li>
              <li>UI/UX improvements and bug fixes</li>
            </ul>
          </div>

          {/* Technical Stack */}
          <div className="mt-8 max-w-2xl mx-auto text-left mb-12">
            <h3 className="font-semibold text-gray-700 mb-4">Technical Stack:</h3>
            <ul className="grid grid-cols-2 gap-4 text-gray-600">
              <li><span className="font-medium">Frontend:</span> React, TypeScript, Tailwind CSS</li>
              <li><span className="font-medium">Backend:</span> Python, Flask</li>
              <li><span className="font-medium">AI/ML:</span> Hugging Face Transformers, PyTorch</li>
              <li><span className="font-medium">UI Framework:</span> Headless UI, Material Design</li>
              <li><span className="font-medium">Styling:</span> TailwindCSS, PostCSS</li>
              <li><span className="font-medium">Version Control:</span> Git, GitHub</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white border-t border-gray-200">
        <BottomNav activePage="about" />
      </div>
    </div>
  );
}
