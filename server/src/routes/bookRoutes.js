import express from 'express';
import {
  getBooks,
  searchBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getBookReviews
} from '../controllers/bookController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getBooks)
  .post(protect, createBook);

router.get('/search', searchBooks);

router.route('/:id')
  .get(getBookById)
  .put(protect, updateBook)
  .delete(protect, deleteBook);

router.get('/:id/reviews', getBookReviews);

export default router;
