import express from 'express';
import {
  searchBooks,
  getByISBN,
  importBook
} from '../controllers/googleBooksController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/search', searchBooks);
router.get('/isbn/:isbn', getByISBN);

// Protected routes
router.post('/import', protect, importBook);

export default router;
