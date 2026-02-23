import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Backend is healthy ☕',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

export default router;
