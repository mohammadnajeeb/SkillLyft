import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import './App.css';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img src="/LOGO.png" alt="SkillLyft" className="h-8 w-auto" />
              </Link>
            </div>

            {/* Navigation Items - All aligned to right */}
            <div className="flex items-center space-x-8">
              <Link 
                to="/" 
                className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link 
                to="/courses" 
                className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
              >
                Courses
              </Link>
              <Link 
                to="/about" 
                className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
              >
                About
              </Link>
              
              {/* Auth Buttons */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <UserCircleIcon className="h-8 w-8 text-gray-400" />
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => setIsAuthenticated(true)}
                    className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary-700 transition-colors"
                  >
                    Sign up
                  </button>
                  <button 
                    onClick={() => setIsAuthenticated(true)}
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
                  >
                    Sign in
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
