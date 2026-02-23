// Code Execution Service - connects to backend
const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

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

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Code execution error:', error);
      return {
        success: false,
        output: 'Error connecting to code execution service. Make sure the backend server is running.',
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
