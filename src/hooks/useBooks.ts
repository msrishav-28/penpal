import { useState, useEffect } from 'react';
import { bookService } from '../services';
import { Book } from '../types';

interface UseBooksOptions {
  page?: number;
  limit?: number;
  genre?: string;
  author?: string;
}

export const useBooks = (options: UseBooksOptions = {}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await bookService.getBooks(options);
        setBooks(response.books);
        setPagination({
          currentPage: response.currentPage,
          totalPages: response.totalPages,
          total: response.total
        });
      } catch (err) {
        const error = err as Error;
        setError(error.message || 'Failed to fetch books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [options.page, options.limit, options.genre, options.author]);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await bookService.getBooks(options);
      setBooks(response.books);
      setPagination({
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        total: response.total
      });
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  return { books, loading, error, pagination, refetch };
};

export const useBook = (id: string) => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await bookService.getBookById(id);
        setBook(data);
      } catch (err) {
        const error = err as Error;
        setError(error.message || 'Failed to fetch book');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  return { book, loading, error };
};

export const useSearchBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchBooks = async (query: string) => {
    if (!query.trim()) {
      setBooks([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const results = await bookService.searchBooks(query);
      setBooks(results);
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Failed to search books');
    } finally {
      setLoading(false);
    }
  };

  return { books, loading, error, searchBooks };
};
