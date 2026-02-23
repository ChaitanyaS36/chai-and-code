import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Coffee } from 'lucide-react';
import { aiService } from '../services/aiService';

const AIChat = ({ problem, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Welcome message
    setMessages([{
      role: 'ai',
      content: `Namaste bhai! ☕ Chai garam hai! I'm here to help you with "${problem.title}". 
      
Remember the golden rule: logic first, then code! 
- Write your logic in English
- Create the skeleton
- Fill it step by step

What would you like help with?`
    }]);
  }, [problem]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Get AI response
      const response = await aiService.sendMessage(userMessage, {
        title: problem.title,
        description: problem.description,
        difficulty: problem.difficulty,
        hints: problem.hints
      });

      setMessages([...newMessages, { role: 'ai', content: response.message }]);
    } catch (error) {
      setMessages([...newMessages, { 
        role: 'ai', 
        content: 'Sorry bhai, some error occurred. Please try again! ☕' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl h-[600px] flex flex-col">
        {/* Header */}
        <div className="bg-chai-brown text-white p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee className="w-5 h-5 steam-animation" />
            <h2 className="text-xl font-bold">Chai AI Assistant ☕</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-tea-leaf-dark rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-milk-cream">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.role === 'user'
                    ? 'bg-chai-brown text-white'
                    : 'bg-white text-tea-leaf-dark border-2 border-chai-brown'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-lg p-3 border-2 border-chai-brown">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-chai-brown rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-chai-brown rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                  <span className="w-2 h-2 bg-chai-brown rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-200 rounded-b-lg">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask for help... (e.g., 'How do I start?', 'Explain this concept')"
              className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-chai-brown"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="px-6 py-2 bg-chai-brown text-white rounded-lg hover:bg-tea-leaf-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
