import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Users, BookOpen, UserPlus } from 'lucide-react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-b from-black/90 to-gray-900/90 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)] fixed w-full z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold glow-text">
              Entrepreneur Hub
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/about"
              className={`nav-button ${isActive('/about') ? 'text-white' : 'text-gray-400'}`}
            >
              <Users className="w-4 h-4 mr-1" />
              About Us
            </Link>
            <Link
              to="/profiles"
              className={`nav-button ${isActive('/profiles') ? 'text-white' : 'text-gray-400'}`}
            >
              <BookOpen className="w-4 h-4 mr-1" />
              Profiles
            </Link>
            <Link
              to="/register"
              className={`nav-button ${isActive('/register') ? 'text-white' : 'text-gray-400'}`}
            >
              <UserPlus className="w-4 h-4 mr-1" />
              Register
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-md shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-800">
            <Link
              to="/about"
              className="mobile-nav-button"
              onClick={() => setIsMenuOpen(false)}
            >
              <Users className="w-4 h-4 mr-2" />
              About Us
            </Link>
            <Link
              to="/profiles"
              className="mobile-nav-button"
              onClick={() => setIsMenuOpen(false)}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Profiles
            </Link>
            <Link
              to="/register"
              className="mobile-nav-button"
              onClick={() => setIsMenuOpen(false)}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}