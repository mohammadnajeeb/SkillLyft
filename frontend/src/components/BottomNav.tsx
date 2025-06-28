import { useNavigate } from 'react-router-dom';

interface BottomNavProps {
  activePage?: 'dashboard' | 'reflection' | 'questioning' | 'notes' | 'teach' | 'about' | 'theory';
}

export default function BottomNav({ activePage }: BottomNavProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white px-4 py-3">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <button
          onClick={() => navigate('/reflection-space')}
          className={`flex flex-col items-center px-4 py-1 text-sm transition-colors ${
            activePage === 'reflection' ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'
          }`}
        >
          <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <span>Reflection Space</span>
        </button>
        <button
          onClick={() => navigate('/self-questioning')}
          className={`flex flex-col items-center px-4 py-1 text-sm transition-colors ${
            activePage === 'questioning' ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'
          }`}
        >
          <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Self Questioning</span>
        </button>
        <button
          onClick={() => navigate('/quick-notes')}
          className={`flex flex-col items-center px-4 py-1 text-sm transition-colors ${
            activePage === 'notes' ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'
          }`}
        >
          <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span>Quick Notes</span>
        </button>
        <button
          onClick={() => navigate('/teach-luma')}
          className={`flex flex-col items-center px-4 py-1 text-sm transition-colors ${
            activePage === 'teach' ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'
          }`}
        >
          <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>Teach Luma AI</span>
        </button>
        <button
          onClick={() => navigate('/about')}
          className={`flex flex-col items-center px-4 py-1 text-sm transition-colors ${
            activePage === 'about' ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'
          }`}
        >
          <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>About</span>
        </button>
      </div>
    </div>
  );
}
