import axios from 'axios';
import Book from '../models/Book.js';

const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';

/**
 * Search books using Google Books API
 */
export const searchGoogleBooks = async (query, options = {}) => {
  try {
    const {
      maxResults = 20,
      startIndex = 0,
      orderBy = 'relevance', // relevance or newest
      langRestrict,
      printType // books or magazines
    } = options;

    const params = {
      q: query,
      maxResults,
      startIndex,
      orderBy
    };

    if (langRestrict) params.langRestrict = langRestrict;
    if (printType) params.printType = printType;

    const response = await axios.get(GOOGLE_BOOKS_API, { params });
    
    return {
      total: response.data.totalItems || 0,
      books: response.data.items ? response.data.items.map(formatGoogleBook) : []
    };
  } catch (error) {
    console.error('Google Books API error:', error.message);
    throw new Error('Failed to search Google Books');
  }
};

/**
 * Get book by ISBN
 */
export const getBookByISBN = async (isbn) => {
  try {
    const response = await axios.get(GOOGLE_BOOKS_API, {
      params: { q: `isbn:${isbn}` }
    });

    if (response.data.items && response.data.items.length > 0) {
      return formatGoogleBook(response.data.items[0]);
    }

    return null;
  } catch (error) {
    console.error('Google Books ISBN lookup error:', error.message);
    return null;
  }
};

/**
 * Get book by Google Books ID
 */
export const getBookById = async (googleBooksId) => {
  try {
    const response = await axios.get(`${GOOGLE_BOOKS_API}/${googleBooksId}`);
    return formatGoogleBook(response.data);
  } catch (error) {
    console.error('Google Books ID lookup error:', error.message);
    return null;
  }
};

/**
 * Format Google Books API response to our Book schema
 */
const formatGoogleBook = (item) => {
  const volumeInfo = item.volumeInfo || {};
  const industryIdentifiers = volumeInfo.industryIdentifiers || [];
  
  const isbn13 = industryIdentifiers.find(id => id.type === 'ISBN_13')?.identifier;
  const isbn10 = industryIdentifiers.find(id => id.type === 'ISBN_10')?.identifier;

  return {
    title: volumeInfo.title || 'Unknown Title',
    author: volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown Author',
    description: volumeInfo.description || '',
    coverUrl: volumeInfo.imageLinks?.thumbnail || volumeInfo.imageLinks?.smallThumbnail || '',
    pages: volumeInfo.pageCount || 0,
    publishedDate: volumeInfo.publishedDate ? new Date(volumeInfo.publishedDate) : null,
    publisher: volumeInfo.publisher || '',
    language: volumeInfo.language || 'en',
    genres: volumeInfo.categories || [],
    metadata: {
      isbn13,
      isbn10,
      isbn: isbn13 || isbn10,
      googleBooksId: item.id
    }
  };
};

/**
 * Import book from Google Books to our database
 */
export const importBookFromGoogle = async (googleBooksId, userId) => {
  try {
    // Check if book already exists in our database
    const existingBook = await Book.findOne({ 'metadata.googleBooksId': googleBooksId });
    if (existingBook) {
      return existingBook;
    }

    // Fetch from Google Books
    const bookData = await getBookById(googleBooksId);
    if (!bookData) {
      throw new Error('Book not found in Google Books');
    }

    // Create new book in our database
    const book = await Book.create({
      ...bookData,
      addedBy: userId
    });

    return book;
  } catch (error) {
    console.error('Import book error:', error.message);
    throw error;
  }
};

/**
 * Search and auto-import books
 */
export const searchAndImportBooks = async (query, userId, options = {}) => {
  try {
    const searchResults = await searchGoogleBooks(query, options);
    
    // Return formatted books without importing (import only when user selects)
    return searchResults;
  } catch (error) {
    console.error('Search and import error:', error.message);
    throw error;
  }
};

export default {
  searchGoogleBooks,
  getBookByISBN,
  getBookById,
  importBookFromGoogle,
  searchAndImportBooks
};
