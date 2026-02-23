import React, { useState } from 'react';
import { Code, CheckCircle2, Circle, Lightbulb, BookOpen, FileCode } from 'lucide-react';
import { storageService } from '../services/storageService';

const ProblemCard = ({ problem, day, onOpenEditor, onShowExplanation, onShowCode, darkMode }) => {
  const [showHints, setShowHints] = useState(false);
  const isSolved = storageService.isProblemSolved(problem.id);

  return (
    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} rounded-lg shadow-xl p-6 mb-4 border-l-4 border-chai-brown transform hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 animate-fade-in ${isSolved ? 'glow-green' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h3 className={`text-xl font-bold ${darkMode ? 'text-milk-cream' : 'text-tea-leaf-dark'}`}>
              {problem.title}
            </h3>
            {isSolved && <CheckCircle2 className="w-6 h-6 text-cardamom-green animate-pulse-slow" />}
            {!isSolved && <Circle className={`w-6 h-6 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />}
            <span className={`
              px-3 py-1 rounded-full text-xs font-semibold
              ${problem.difficulty === 'Easy' ? 'bg-green-500 text-white' : ''}
              ${problem.difficulty === 'Medium' ? 'bg-yellow-500 text-white' : ''}
              ${problem.difficulty === 'Hard' ? 'bg-red-500 text-white' : ''}
            `}>
              {problem.difficulty}
            </span>
          </div>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{problem.description}</p>
        </div>
      </div>

      {showHints && problem.hints && (
        <div className={`${darkMode ? 'bg-gray-700' : 'bg-milk-cream'} rounded-lg p-4 mb-4 border border-chai-brown border-opacity-30`}>
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            <h4 className={`font-semibold ${darkMode ? 'text-milk-cream' : 'text-tea-leaf-dark'}`}>Hints:</h4>
          </div>
          <ul className={`list-disc list-inside space-y-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {problem.hints.map((hint, idx) => (
              <li key={idx} className="text-sm">{hint}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setShowHints(!showHints)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg font-semibold"
        >
          <Lightbulb className="w-4 h-4" />
          {showHints ? 'Hide' : 'Show'} Hints
        </button>
        <button
          onClick={() => onShowExplanation(problem)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg font-semibold"
        >
          <BookOpen className="w-4 h-4" />
          Explain
        </button>
        <button
          onClick={() => onOpenEditor(problem)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-chai-brown to-tea-leaf-dark text-white rounded-lg hover:from-tea-leaf-dark hover:to-chai-brown transition-all transform hover:scale-105 active:scale-95 shadow-lg font-semibold"
        >
          <Code className="w-4 h-4" />
          Start Coding
        </button>
        <button
          onClick={() => onShowCode(problem)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg font-semibold"
        >
          <FileCode className="w-4 h-4" />
          Get Code
        </button>
      </div>
    </div>
  );
};

export default ProblemCard;
