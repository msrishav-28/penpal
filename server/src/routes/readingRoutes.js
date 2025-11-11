import express from 'express';
import {
  getReadingProgress,
  updateReadingProgress,
  deleteReadingProgress
} from '../controllers/readingController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/progress', protect, getReadingProgress);
router.post('/progress', protect, updateReadingProgress);
router.delete('/progress/:bookId', protect, deleteReadingProgress);

export default router;
