import express from 'express';
import axios from 'axios';

const router = express.Router();

// System prompt for the AI
const SYSTEM_PROMPT = `You are a friendly Indian chai vendor who helps students learn C++ and Data Structures & Algorithms. 
You are warm, encouraging, and explain things simply. 
When helping with C++ problems:
- Give hints, not full solutions
- Explain concepts clearly
- Use chai references when appropriate
- Be patient and supportive
- Help them understand errors and how to fix them
- Encourage them to try first before asking for help

Always maintain a friendly, encouraging tone like: "Arre bhai, chai garam hai ☕ Let's solve this step by step!"`;

router.post('/chat', async (req, res) => {
  const { message, problemContext } = req.body;

  if (!message) {
    return res.status(400).json({
      success: false,
      error: 'Message is required'
    });
  }

  // Build the prompt
  let prompt = SYSTEM_PROMPT + '\n\n';
  
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
  
  prompt += `Student's question: ${message}\n\n`;
  prompt += `Please help them understand and solve this problem. Give hints and guidance, but encourage them to write the code themselves.`;

  // Check which AI service to use
  const aiProvider = process.env.AI_PROVIDER || 'openai'; // 'openai', 'gemini', or 'mock'

  try {
    if (aiProvider === 'openai' && process.env.OPENAI_API_KEY) {
      // OpenAI integration
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: message }
          ],
          temperature: 0.7,
          max_tokens: 500
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          },
          timeout: 30000
        }
      );

      return res.json({
        success: true,
        message: response.data.choices[0].message.content,
        provider: 'openai'
      });
    } else if (aiProvider === 'gemini' && process.env.GEMINI_API_KEY) {
      // Google Gemini integration
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 30000
        }
      );

      return res.json({
        success: true,
        message: response.data.candidates[0].content.parts[0].text,
        provider: 'gemini'
      });
    } else {
      // Mock response (fallback)
      return res.json({
        success: true,
        message: "Arre bhai! ☕ Great question! Let me help you step by step. " +
                 "First, try to break down the problem into smaller steps. " +
                 "Remember: logic first, then code. Start with the skeleton and fill it slowly. " +
                 "If you're stuck, check the hints - they'll guide you in the right direction! " +
                 "\n\nNote: AI integration is not configured. Set OPENAI_API_KEY or GEMINI_API_KEY in .env to enable real AI responses.",
        provider: 'mock'
      });
    }
  } catch (error) {
    console.error('AI API Error:', error.response?.data || error.message);
    
    // Fallback to mock response on error
    return res.json({
      success: true,
      message: "Arre bhai! ☕ I'm having some trouble connecting right now, but here's some general advice: " +
               "Break the problem into smaller steps, write your logic in English first, then convert to code. " +
               "You've got this! 💪",
      provider: 'mock',
      error: error.message
    });
  }
});

// Test endpoint
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'AI endpoint is working ☕',
    configured: !!(process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY),
    provider: process.env.AI_PROVIDER || 'mock'
  });
});

export default router;
