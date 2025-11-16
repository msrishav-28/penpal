import express from 'express';
import {
  importGoodreads,
  getTemplate
} from '../controllers/importController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.post('/goodreads', importGoodreads);
router.get('/template', getTemplate);

export default router;
