// AI Service for C++ DSA help
// This service can be integrated with OpenAI, Gemini, or Ollama

const AI_SYSTEM_PROMPT = `You are a friendly Indian chai vendor who helps students learn C++ and Data Structures & Algorithms. 
You are warm, encouraging, and explain things simply. 
When helping with C++ problems:
- Give hints, not full solutions
- Explain concepts clearly
- Use chai references when appropriate
- Be patient and supportive
- Help them understand errors and how to fix them
- Encourage them to try first before asking for help

Always maintain a friendly, encouraging tone like: "Arre bhai, chai garam hai ☕ Let's solve this step by step!"`;

export const aiService = {
  // Build prompt for C++ DSA help
  buildPrompt(userMessage, problemContext = null) {
    let prompt = AI_SYSTEM_PROMPT + '\n\n';
    
    if (problemContext) {
      prompt += `Current Problem Context:\n`;
      prompt += `Title: ${problemContext.title}\n`;
      prompt += `Description: ${problemContext.description}\n`;
      prompt += `Difficulty: ${problemContext.difficulty}\n`;
      if (problemContext.hints) {
        prompt += `Hints: ${problemContext.hints.join(', ')}\n`;
      }
      prompt += '\n';
    }
    
    prompt += `Student's question: ${userMessage}\n\n`;
    prompt += `Please help them understand and solve this problem. Give hints and guidance, but encourage them to write the code themselves.`;
    
    return prompt;
  },

  // Send message to AI via backend API
  async sendMessage(userMessage, problemContext = null) {
    const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
    
    try {
      const response = await fetch(`${API_URL}/api/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMessage,
          problemContext: problemContext
        })
      });

      const data = await response.json();
      
      if (data.success) {
        return {
          message: data.message,
          success: true,
          provider: data.provider || 'backend'
        };
      } else {
        throw new Error(data.error || 'AI service error');
      }
    } catch (error) {
      console.error('AI API Error:', error);
      // Fallback to mock response if backend is unavailable
      return {
        message: "Arre bhai! ☕ Great question! Let me help you step by step. " +
                 "First, try to break down the problem into smaller steps. " +
                 "Remember: logic first, then code. Start with the skeleton and fill it slowly. " +
                 "If you're stuck, check the hints - they'll guide you in the right direction! " +
                 "\n\n(Note: Backend AI service is not available. Using fallback response.)",
        success: true,
        provider: 'fallback'
      };
    }
  },

  // Get help for compiler errors
  async getErrorHelp(errorMessage, code) {
    const prompt = `The student got this compiler error:\n${errorMessage}\n\nTheir code:\n${code}\n\nPlease explain the error in simple terms and guide them to fix it.`;
    return this.sendMessage(prompt);
  }
};
