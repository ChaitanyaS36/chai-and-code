// Code Execution Service - connects to backend
const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

// Debug: Log the API URL being used
console.log('🔗 Backend API URL:', API_URL);
console.log('🔍 Environment:', import.meta.env.MODE);
console.log('🔍 VITE_BACKEND_URL:', import.meta.env.VITE_BACKEND_URL);

export const codeExecutionService = {
  // Execute C++ code
  async executeCode(code, input = '') {
    try {
      const response = await fetch(`${API_URL}/api/code/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code: code,
          input: input,
          language: 'cpp'
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Backend error:', errorData);
        return {
          success: false,
          output: `Backend error: ${errorData.error || response.statusText}\n\nStatus: ${response.status}\n\nPlease check:\n1. Backend is running on Render\n2. Backend URL is correct: ${API_URL}\n3. CORS is configured properly`,
          error: `HTTP ${response.status}`
        };
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Code execution error:', error);
      console.error('API URL:', API_URL);
      return {
        success: false,
        output: `Connection Error: ${error.message}\n\nTrying to connect to: ${API_URL}\n\nPlease check:\n1. Backend is running on Render\n2. Backend URL in .env.production is correct\n3. Network connection is working\n4. Backend service is not sleeping (free tier may spin down)`,
        error: 'Connection Error'
      };
    }
  },

  // Check if backend is available
  async checkBackendHealth() {
    try {
      const response = await fetch(`${API_URL}/api/health`);
      const data = await response.json();
      return data.success || false;
    } catch (error) {
      return false;
    }
  }
};
