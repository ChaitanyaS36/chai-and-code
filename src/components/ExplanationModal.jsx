import React from 'react';
import { X, BookOpen } from 'lucide-react';

const ExplanationModal = ({ problem, explanation, onClose, darkMode }) => {
  if (!explanation) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col`}>
        {/* Header */}
        <div className="bg-chai-brown text-white p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            <h2 className="text-xl font-bold">Explanation: {explanation.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-tea-leaf-dark rounded transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-lg leading-relaxed space-y-4`}>
            {explanation.explanation.split('\n\n').map((paragraph, pIdx) => {
              if (paragraph.trim() === '') return null;
              
              // Check if paragraph starts with special markers
              if (paragraph.startsWith('👉')) {
                return (
                  <div key={pIdx} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-milk-cream'} border-l-4 border-chai-brown`}>
                    <p className="text-xl font-semibold mb-2">
                      {paragraph.replace('👉', '').trim()}
                    </p>
                  </div>
                );
              } else if (paragraph.startsWith('**Example:**')) {
                return (
                  <div key={pIdx} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'} border border-blue-300`}>
                    <p className="font-bold mb-2 text-blue-600">Example:</p>
                    <pre className={`font-mono text-sm ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                      {paragraph.replace('**Example:**', '').trim()}
                    </pre>
                  </div>
                );
              } else if (paragraph.startsWith('**Meaning:**')) {
                return (
                  <div key={pIdx} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-yellow-50'} border-l-4 border-yellow-400`}>
                    <p className="font-bold mb-2 text-yellow-700">💡 Meaning:</p>
                    <p className="italic">{paragraph.replace('**Meaning:**', '').replace(/"/g, '').trim()}</p>
                  </div>
                );
              } else {
                // Regular paragraph
                const lines = paragraph.split('\n');
                return (
                  <div key={pIdx} className="space-y-2">
                    {lines.map((line, lIdx) => {
                      if (line.trim() === '') return null;
                      if (line.startsWith('*') && !line.startsWith('**')) {
                        return (
                          <li key={lIdx} className="ml-6 list-disc">
                            {line.replace('*', '').trim()}
                          </li>
                        );
                      } else if (line.startsWith('**') && line.endsWith('**')) {
                        return (
                          <p key={lIdx} className={`font-bold text-xl ${darkMode ? 'text-milk-cream' : 'text-chai-brown'}`}>
                            {line.replace(/\*\*/g, '')}
                          </p>
                        );
                      } else {
                        return (
                          <p key={lIdx}>
                            {line}
                          </p>
                        );
                      }
                    })}
                  </div>
                );
              }
            })}
          </div>
        </div>

        {/* Footer */}
        <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} px-6 py-4 rounded-b-lg border-t`}>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            💡 Remember: Think in steps, not code! Break the problem down first.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExplanationModal;
