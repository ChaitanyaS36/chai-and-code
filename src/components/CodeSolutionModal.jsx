import React, { useState } from 'react';
import { X, Code2, Copy, Check } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeSolutionModal = ({ problem, solution, onClose, darkMode }) => {
  const [copied, setCopied] = useState(false);

  if (!solution) {
    return null;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(solution.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col`}>
        {/* Header */}
        <div className="bg-chai-brown text-white p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-6 h-6" />
            <h2 className="text-xl font-bold">Code Solution: {solution.title}</h2>
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
          {/* Code Explanation */}
          {solution.codeExplanation && (
            <div className={`mb-6 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-milk-cream'} border border-chai-brown border-opacity-30`}>
              <h3 className={`font-bold mb-3 ${darkMode ? 'text-milk-cream' : 'text-tea-leaf-dark'}`}>
                📝 Step by Step Explanation:
              </h3>
              <div className={`whitespace-pre-wrap ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {solution.codeExplanation.split('\n').map((line, idx) => {
                  if (line.startsWith('**')) {
                    return (
                      <p key={idx} className={`font-semibold mt-2 ${darkMode ? 'text-milk-cream' : 'text-chai-brown'}`}>
                        {line.replace(/\*\*/g, '')}
                      </p>
                    );
                  } else if (line.trim() === '') {
                    return <br key={idx} />;
                  } else {
                    return (
                      <p key={idx} className="mb-1">
                        {line}
                      </p>
                    );
                  }
                })}
              </div>
            </div>
          )}

          {/* Code */}
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <h3 className={`font-bold ${darkMode ? 'text-milk-cream' : 'text-tea-leaf-dark'}`}>
                💻 Complete Code:
              </h3>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                  copied
                    ? 'bg-cardamom-green text-white'
                    : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Code
                  </>
                )}
              </button>
            </div>
            <div className="rounded-lg overflow-hidden border-2 border-chai-brown">
              <SyntaxHighlighter
                language="cpp"
                style={darkMode ? vscDarkPlus : oneLight}
                customStyle={{
                  margin: 0,
                  padding: '1rem',
                  fontSize: '14px',
                  lineHeight: '1.6'
                }}
                codeTagProps={{
                  style: {
                    fontFamily: 'Consolas, Monaco, "Courier New", monospace'
                  }
                }}
              >
                {solution.code}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} px-6 py-4 rounded-b-lg border-t flex items-center justify-between`}>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            💡 Study this code, then try writing it yourself!
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-chai-brown text-white rounded-lg hover:bg-tea-leaf-dark transition-colors font-semibold"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeSolutionModal;
