# ☕ Chai & Code Backend Server

Backend API server for the Chai & Code C++ DSA Learning Platform.

## Features

- ✅ Code compilation and execution (C++)
- ✅ AI API proxy (OpenAI/Gemini)
- ✅ Health check endpoint
- ✅ Secure API key handling
- ✅ CORS enabled for frontend

## Prerequisites

- Node.js (v16 or higher)
- g++ compiler (for C++ code execution)
  - **Windows**: Install MinGW or use WSL
  - **Linux**: `sudo apt-get install g++`
  - **macOS**: `xcode-select --install`

## Installation

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Edit `.env` and add your configuration:
```env
PORT=5000
FRONTEND_URL=http://localhost:3000
AI_PROVIDER=mock  # or 'openai' or 'gemini'
OPENAI_API_KEY=your_key_here  # if using OpenAI
GEMINI_API_KEY=your_key_here  # if using Gemini
```

## Running the Server

### Development (with auto-reload):
```bash
npm run dev
```

### Production:
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Health Check
```
GET /api/health
```

### Code Execution
```
POST /api/code/execute
Body: {
  "code": "your C++ code",
  "input": "optional input",
  "language": "cpp"
}
```

### AI Chat
```
POST /api/ai/chat
Body: {
  "message": "user question",
  "problemContext": {
    "title": "Problem title",
    "description": "Problem description",
    "difficulty": "Easy",
    "hints": ["hint1", "hint2"]
  }
}
```

## Testing

Test if g++ is installed:
```bash
g++ --version
```

Test the server:
```bash
curl http://localhost:5000/api/health
```

## Security Notes

- Never commit `.env` file
- Keep API keys secure
- Use environment variables in production
- Consider rate limiting for production

## Troubleshooting

### g++ not found
- Install g++ compiler (see Prerequisites)
- On Windows, add MinGW to PATH

### Port already in use
- Change PORT in `.env`
- Or kill the process using the port

### CORS errors
- Make sure FRONTEND_URL in `.env` matches your frontend URL

## Production Deployment

1. Set `NODE_ENV=production` in `.env`
2. Use a process manager like PM2:
```bash
npm install -g pm2
pm2 start server.js --name chai-backend
```

3. Set up reverse proxy (nginx) if needed

---

Happy coding! ☕
