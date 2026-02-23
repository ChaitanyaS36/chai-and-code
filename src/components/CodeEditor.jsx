import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Save, CheckCircle2, FileText, Code2 } from 'lucide-react';
import { storageService } from '../services/storageService';
import { codeExecutionService } from '../services/codeExecutionService';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeEditor = ({ problem, onClose, onMarkSolved, onNotify, darkMode }) => {
  const [code, setCode] = useState(problem.template || '');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('code'); // 'problem' or 'code'
  const textareaRef = useRef(null);

  useEffect(() => {
    // Load saved code if exists
    const savedCode = storageService.getCodeSnippet(problem.id);
    if (savedCode) {
      setCode(savedCode);
    }
  }, [problem.id]);

  // Auto-indentation helper
  const getIndentation = (line) => {
    let indent = 0;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === ' ') indent++;
      else if (line[i] === '\t') indent += 2; // Treat tab as 2 spaces
      else break;
    }
    return indent;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = code;
      
      // Find the current line
      const textBeforeCursor = text.substring(0, start);
      const lines = textBeforeCursor.split('\n');
      const currentLine = lines[lines.length - 1];
      
      // Calculate indentation
      let indent = getIndentation(currentLine);
      
      // Check if current line ends with opening brace
      const trimmedLine = currentLine.trim();
      if (trimmedLine.endsWith('{')) {
        indent += 2; // Add extra indent after opening brace
      }
      
      // Check if current line is a closing brace (reduce indent)
      if (trimmedLine === '}') {
        indent = Math.max(0, indent - 2);
      }
      
      // Create indentation string
      const indentStr = ' '.repeat(indent);
      
      // Insert newline with indentation
      const newText = text.substring(0, start) + '\n' + indentStr + text.substring(end);
      setCode(newText);
      
      // Set cursor position after indentation
      setTimeout(() => {
        const newPos = start + 1 + indentStr.length;
        textarea.setSelectionRange(newPos, newPos);
      }, 0);
      
      e.preventDefault();
    } else if (e.key === 'Tab') {
      // Handle Tab key for indentation
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = code;
      
      if (e.shiftKey) {
        // Shift+Tab: Remove indentation
        const lines = text.substring(0, start).split('\n');
        const currentLineIndex = lines.length - 1;
        const currentLine = lines[currentLineIndex];
        
        if (currentLine.startsWith('  ')) {
          const newText = text.substring(0, start - 2) + text.substring(start);
          setCode(newText);
          setTimeout(() => {
            textarea.setSelectionRange(start - 2, start - 2);
          }, 0);
        }
      } else {
        // Tab: Add indentation
        const newText = text.substring(0, start) + '  ' + text.substring(end);
        setCode(newText);
        setTimeout(() => {
          textarea.setSelectionRange(start + 2, start + 2);
        }, 0);
      }
      
      e.preventDefault();
    }
  };

  const handleSave = () => {
    storageService.saveCodeSnippet(problem.id, code);
    if (onNotify) {
      onNotify('Code saved! ☕', 'success');
    }
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Compiling...\n');
    
    try {
      // Get input from example or use empty
      const exampleIO = getExampleIO();
      const input = exampleIO.input || '';
      
      const result = await codeExecutionService.executeCode(code, input);
      
      if (result.success) {
        setOutput(result.output || 'Program executed successfully (no output)');
      } else {
        setOutput(`Error: ${result.error || 'Execution failed'}\n\n${result.output || 'No additional details'}`);
      }
    } catch (error) {
      setOutput(`Error: ${error.message}\n\nMake sure the backend server is running on http://localhost:5000`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleMarkSolved = () => {
    storageService.markProblemSolved(problem.id);
    if (onMarkSolved) onMarkSolved();
    if (onNotify) {
      onNotify('Great job! Problem marked as solved! ☕🎉', 'success');
    }
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  // Example input/output based on problem
  const getExampleIO = () => {
    const examples = {
      1: { input: '5 10', output: '10' },
      2: { input: '7', output: 'Odd' },
      3: { input: '5', output: '15' },
      4: { input: '5', output: '120' },
      5: { input: '17', output: 'Prime' },
    };
    return examples[problem.id] || { input: 'Sample Input', output: 'Sample Output' };
  };

  const exampleIO = getExampleIO();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex z-50">
      <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} w-full flex flex-col`}>
        {/* Header */}
        <div className="bg-chai-brown text-white p-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <Code2 className="w-6 h-6" />
            <h2 className="text-xl font-bold">{problem.title}</h2>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              problem.difficulty === 'Easy' ? 'bg-green-500' :
              problem.difficulty === 'Medium' ? 'bg-yellow-500' :
              'bg-red-500'
            }`}>
              {problem.difficulty}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-tea-leaf-dark rounded transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Problem Statement */}
          <div className={`w-1/3 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} border-r border-gray-300 flex flex-col overflow-hidden`}>
            <div className="p-4 border-b border-gray-300">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Problem Statement
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{problem.description}</p>
              </div>
              
              {problem.hints && problem.hints.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">💡 Hints</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {problem.hints.map((hint, idx) => (
                      <li key={idx} className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{hint}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h4 className="font-semibold mb-2">📥 Example Input</h4>
                <div className={`${darkMode ? 'bg-gray-900' : 'bg-gray-100'} p-3 rounded font-mono text-sm`}>
                  <pre className="whitespace-pre-wrap">{exampleIO.input}</pre>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">📤 Example Output</h4>
                <div className={`${darkMode ? 'bg-gray-900' : 'bg-gray-100'} p-3 rounded font-mono text-sm`}>
                  <pre className="whitespace-pre-wrap">{exampleIO.output}</pre>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Code Editor and Output */}
          <div className="flex-1 flex flex-col">
            {/* Tabs */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} border-b border-gray-300 flex`}>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-6 py-3 font-semibold transition-colors ${
                  activeTab === 'code'
                    ? darkMode ? 'bg-gray-900 text-white border-b-2 border-chai-brown' 
                    : 'bg-white text-chai-brown border-b-2 border-chai-brown'
                    : darkMode ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-600 hover:text-chai-brown'
                }`}
              >
                <Code2 className="w-4 h-4 inline mr-2" />
                Code Editor
              </button>
              <button
                onClick={() => setActiveTab('output')}
                className={`px-6 py-3 font-semibold transition-colors ${
                  activeTab === 'output'
                    ? darkMode ? 'bg-gray-900 text-white border-b-2 border-chai-brown' 
                    : 'bg-white text-chai-brown border-b-2 border-chai-brown'
                    : darkMode ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-600 hover:text-chai-brown'
                }`}
              >
                Output
              </button>
            </div>

            {/* Code Editor */}
            {activeTab === 'code' && (
              <div className="flex-1 flex flex-col relative">
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-50'} px-4 py-2 flex items-center justify-between border-b`}>
                  <span className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>C++ Code</span>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="px-4 py-1.5 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors flex items-center gap-1 shadow-md"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={handleRun}
                      disabled={isRunning}
                      className="px-4 py-1.5 bg-green-500 text-white rounded text-sm hover:bg-green-600 disabled:opacity-50 transition-colors flex items-center gap-1 shadow-md"
                    >
                      <Play className="w-4 h-4" />
                      {isRunning ? 'Running...' : 'Run'}
                    </button>
                  </div>
                </div>
                <div className="flex-1 relative overflow-hidden">
                  {/* Syntax Highlighted Background */}
                  <div className="absolute inset-0 overflow-auto">
                    <pre className="m-0 p-4">
                      <code>
                        <SyntaxHighlighter
                          language="cpp"
                          style={darkMode ? vscDarkPlus : oneLight}
                          customStyle={{
                            margin: 0,
                            padding: 0,
                            background: darkMode ? '#1e1e1e' : '#ffffff',
                            fontSize: '14px',
                            lineHeight: '1.6'
                          }}
                          PreTag="div"
                          codeTagProps={{
                            style: {
                              fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                              margin: 0,
                              padding: 0
                            }
                          }}
                        >
                          {code || ' '}
                        </SyntaxHighlighter>
                      </code>
                    </pre>
                  </div>
                  {/* Transparent Textarea Overlay */}
                  <textarea
                    ref={textareaRef}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onScroll={(e) => {
                      const pre = e.target.parentElement.querySelector('pre');
                      if (pre) pre.scrollTop = e.target.scrollTop;
                    }}
                    className="absolute inset-0 w-full h-full p-4 font-mono text-sm resize-none focus:outline-none bg-transparent text-transparent z-10"
                    style={{ 
                      tabSize: 2,
                      lineHeight: '1.6',
                      fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                      whiteSpace: 'pre',
                      overflow: 'auto',
                      caretColor: darkMode ? '#ffffff' : '#000000'
                    }}
                    placeholder="Write your C++ code here..."
                    spellCheck={false}
                  />
                </div>
              </div>
            )}

            {/* Output */}
            {activeTab === 'output' && (
              <div className="flex-1 flex flex-col">
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-50'} px-4 py-2 border-b`}>
                  <span className="text-sm font-semibold">Output</span>
                </div>
                <div className="flex-1 p-4 bg-gray-900 text-green-400 font-mono text-sm overflow-auto">
                  <pre className="whitespace-pre-wrap">{output || 'Output will appear here after running your code...'}</pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} px-6 py-4 flex items-center justify-between border-t`}>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            💡 Tip: Write logic in English first, then code!
          </div>
          <button
            onClick={handleMarkSolved}
            className="flex items-center gap-2 px-6 py-2 bg-cardamom-green text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
          >
            <CheckCircle2 className="w-5 h-5" />
            Mark as Solved
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
