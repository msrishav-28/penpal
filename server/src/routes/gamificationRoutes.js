import express from 'express';
import {
  getAchievements,
  getProfile,
  getLeaderboard
} from '../controllers/gamificationController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public leaderboard
router.get('/leaderboard', getLeaderboard);

// Protected routes
router.use(protect);

router.get('/achievements', getAchievements);
router.get('/profile', getProfile);

export default router;
