import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import codeExecutionRoutes from './routes/codeExecution.js';
import aiRoutes from './routes/ai.js';
import healthRoutes from './routes/health.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - CORS configuration
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  'https://ChaitanyaS36.github.io',
  'https://chaitanyas36.github.io'
].filter(Boolean); // Remove undefined values

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list
    if (allowedOrigins.some(allowed => origin.startsWith(allowed))) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(null, true); // Allow all for now, can restrict later
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/code', codeExecutionRoutes);
app.use('/api/ai', aiRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: '☕ Chai & Code Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      codeExecution: '/api/code/execute',
      ai: '/api/ai/chat'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`☕ Chai & Code Backend running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
