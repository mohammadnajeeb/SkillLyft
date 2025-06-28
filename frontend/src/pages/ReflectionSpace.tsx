import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

type InputType = 'text' | 'audio';
type Language = 'Hindi' | 'English' | 'Spanish';

export default function ReflectionSpace() {
  const navigate = useNavigate();
  const [inputType, setInputType] = useState<InputType>('text');
  const [language, setLanguage] = useState<Language>('Hindi');

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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Reflection Space
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Input Type Selection */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Input Type</h2>
                <div className="space-y-4">
                  <button
                    onClick={() => setInputType('text')}
                    className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-colors ${
                      inputType === 'text'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-200'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-xl mr-3">📝</span>
                      <span className="font-medium text-gray-900">Text</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setInputType('audio')}
                    className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-colors ${
                      inputType === 'audio'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-200'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-xl mr-3">🎤</span>
                      <span className="font-medium text-gray-900">Audio</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Language Selection */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Language</h2>
                <div className="space-y-4">
                  <button
                    onClick={() => setLanguage('Hindi')}
                    className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-colors ${
                      language === 'Hindi'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-200'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-xl mr-3">🇮🇳</span>
                      <span className="font-medium text-gray-900">Hindi</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setLanguage('English')}
                    className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-colors ${
                      language === 'English'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-200'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-xl mr-3">🇬🇧</span>
                      <span className="font-medium text-gray-900">English</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setLanguage('Spanish')}
                    className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-colors ${
                      language === 'Spanish'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-200'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-xl mr-3">🇪🇸</span>
                      <span className="font-medium text-gray-900">Spanish</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white border-t border-gray-200">
        <BottomNav activePage="reflection" />
      </div>
    </div>
  );
}
