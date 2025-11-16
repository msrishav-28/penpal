import express from 'express';
import {
  startSession,
  endSession,
  getSessions,
  getStats
} from '../controllers/readingSessionController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Start a new reading session
router.post('/session/start', startSession);

// End a reading session
router.post('/session/:sessionId/end', endSession);

// Get user's reading sessions
router.get('/sessions', getSessions);

// Get reading statistics
router.get('/stats', getStats);

export default router;
