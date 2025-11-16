import {
  searchGoogleBooks,
  getBookByISBN,
  importBookFromGoogle
} from '../services/googleBooksService.js';

/**
 * Search Google Books
 * GET /api/google-books/search
 */
export const searchBooks = async (req, res) => {
  try {
    const { q, maxResults, startIndex, orderBy } = req.query;

    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const results = await searchGoogleBooks(q, {
      maxResults: parseInt(maxResults) || 20,
      startIndex: parseInt(startIndex) || 0,
      orderBy
    });

    res.json(results);
  } catch (error) {
    console.error('Search Google Books error:', error);
    res.status(500).json({ message: 'Failed to search books' });
  }
};

/**
 * Get book by ISBN
 * GET /api/google-books/isbn/:isbn
 */
export const getByISBN = async (req, res) => {
  try {
    const { isbn } = req.params;

    const book = await getBookByISBN(isbn);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    console.error('Get book by ISBN error:', error);
    res.status(500).json({ message: 'Failed to get book' });
  }
};

/**
 * Import book from Google Books
 * POST /api/google-books/import
 */
export const importBook = async (req, res) => {
  try {
    const { googleBooksId } = req.body;

    if (!googleBooksId) {
      return res.status(400).json({ message: 'Google Books ID is required' });
    }

    const book = await importBookFromGoogle(googleBooksId, req.user.id);

    res.status(201).json(book);
  } catch (error) {
    console.error('Import book error:', error);
    res.status(500).json({ message: error.message });
  }
};

export default {
  searchBooks,
  getByISBN,
  importBook
};
