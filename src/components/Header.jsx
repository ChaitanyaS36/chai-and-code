import React from 'react';
import { Coffee, BookOpen, Moon, Sun } from 'lucide-react';

const Header = ({ currentDay, totalDays = 14, darkMode, onToggleDarkMode }) => {
  return (
    <header className="bg-gradient-to-r from-chai-brown to-tea-leaf-dark text-milk-cream shadow-xl sticky top-0 z-40 border-b-2 border-chai-brown">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Coffee className="w-8 h-8 steam-animation" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-cardamom-green rounded-full animate-pulse-slow"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-milk-cream to-yellow-200 bg-clip-text text-transparent">
                ☕ Chai & Code
              </h1>
              <p className="text-sm opacity-90">C++ DSA Learning Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-tea-leaf-dark px-4 py-2 rounded-lg shadow-md glow border border-milk-cream border-opacity-20">
              <BookOpen className="w-5 h-5" />
              <span className="font-semibold">Day {currentDay} / {totalDays}</span>
            </div>
            <button
              onClick={onToggleDarkMode}
              className="p-2 bg-tea-leaf-dark rounded-lg hover:bg-opacity-80 transition-all transform hover:scale-110 shadow-md"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
