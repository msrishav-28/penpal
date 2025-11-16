import csv from 'csv-parser';
import { Readable } from 'stream';
import Book from '../models/Book.js';
import ReadingProgress from '../models/ReadingProgress.js';
import Review from '../models/Review.js';
import { getBookByISBN, searchGoogleBooks } from './googleBooksService.js';

/**
 * Parse Goodreads CSV export
 */
export const parseGoodreadsCSV = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const results = [];
    const stream = Readable.from(fileBuffer.toString());

    stream
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

/**
 * Import Goodreads CSV data
 */
export const importGoodreadsData = async (userId, fileBuffer) => {
  try {
    const csvData = await parseGoodreadsCSV(fileBuffer);
    
    const results = {
      total: csvData.length,
      imported: 0,
      skipped: 0,
      errors: []
    };

    for (const row of csvData) {
      try {
        await importGoodreadsBook(userId, row);
        results.imported++;
      } catch (error) {
        results.skipped++;
        results.errors.push({
          title: row['Title'] || 'Unknown',
          error: error.message
        });
      }
    }

    return results;
  } catch (error) {
    console.error('Import Goodreads data error:', error.message);
    throw new Error('Failed to import Goodreads data');
  }
};

/**
 * Import a single Goodreads book
 */
const importGoodreadsBook = async (userId, row) => {
  try {
    const title = row['Title'];
    const author = row['Author'];
    const isbn = row['ISBN13'] || row['ISBN'];
    const myRating = parseFloat(row['My Rating']) || 0;
    const dateRead = row['Date Read'] ? new Date(row['Date Read']) : null;
    const dateAdded = row['Date Added'] ? new Date(row['Date Added']) : new Date();
    const shelf = row['Exclusive Shelf'] || 'read';
    const myReview = row['My Review'] || '';

    let book = null;

    // Try to find book by ISBN
    if (isbn) {
      book = await Book.findOne({ 'metadata.isbn': isbn });
      
      if (!book) {
        // Try Google Books API
        const googleBook = await getBookByISBN(isbn);
        if (googleBook) {
          book = await Book.create({
            ...googleBook,
            addedBy: userId
          });
        }
      }
    }

    // If no ISBN or not found, search by title and author
    if (!book) {
      book = await Book.findOne({ title, author });
      
      if (!book) {
        // Try Google Books search
        const searchResults = await searchGoogleBooks(`${title} ${author}`, { maxResults: 1 });
        if (searchResults.books.length > 0) {
          book = await Book.create({
            ...searchResults.books[0],
            addedBy: userId
          });
        }
      }
    }

    // Create book if still not found
    if (!book) {
      book = await Book.create({
        title,
        author,
        metadata: { isbn },
        addedBy: userId
      });
    }

    // Map Goodreads shelf to our status
    let status = 'want-to-read';
    if (shelf === 'read') status = 'finished';
    else if (shelf === 'currently-reading') status = 'currently-reading';

    // Create or update reading progress
    const progressData = {
      user: userId,
      book: book._id,
      status,
      totalPages: book.pages || 0,
      currentPage: status === 'finished' ? book.pages : 0,
      rating: myRating,
      review: myReview
    };

    if (dateRead) {
      progressData.finishDate = dateRead;
      progressData.startDate = dateRead; // Approximate
    }

    await ReadingProgress.findOneAndUpdate(
      { user: userId, book: book._id },
      progressData,
      { upsert: true, new: true }
    );

    // Create review if exists and has rating
    if (myReview && myRating > 0) {
      await Review.findOneAndUpdate(
        { user: userId, book: book._id },
        {
          user: userId,
          book: book._id,
          rating: myRating,
          content: myReview,
          createdAt: dateRead || dateAdded
        },
        { upsert: true, new: true }
      );
    }

    return book;
  } catch (error) {
    console.error('Import Goodreads book error:', error.message);
    throw error;
  }
};

/**
 * Get import template/instructions
 */
export const getImportTemplate = () => {
  return {
    format: 'CSV',
    requiredColumns: [
      'Title',
      'Author',
      'ISBN13',
      'My Rating',
      'Date Read',
      'Exclusive Shelf'
    ],
    instructions: [
      '1. Go to Goodreads.com',
      '2. Navigate to My Books',
      '3. Click on "Import and Export" at the bottom',
      '4. Click "Export Library"',
      '5. Upload the downloaded CSV file here'
    ],
    sampleData: {
      'Book Id': '123456',
      'Title': 'The Great Gatsby',
      'Author': 'F. Scott Fitzgerald',
      'ISBN': '0743273567',
      'ISBN13': '9780743273565',
      'My Rating': '4',
      'Date Read': '2024/01/15',
      'Exclusive Shelf': 'read',
      'My Review': 'Amazing book about the American Dream.'
    }
  };
};

export default {
  parseGoodreadsCSV,
  importGoodreadsData,
  getImportTemplate
};
