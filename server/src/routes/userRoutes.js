import express from 'express';
import {
  getUserById,
  followUser,
  getFollowers,
  getFollowing,
  getActivityFeed
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/feed', protect, getActivityFeed);
router.get('/:id', getUserById);
router.post('/:id/follow', protect, followUser);
router.get('/:id/followers', getFollowers);
router.get('/:id/following', getFollowing);

export default router;
