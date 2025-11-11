import api from './api';
import { Book, Review } from '../types';

export interface BooksResponse {
  books: Book[];
  currentPage: number;
  totalPages: number;
  total: number;
}

export interface BookFilters {
  page?: number;
  limit?: number;
  genre?: string;
  author?: string;
}

export const bookService = {
  // Get all books with filters
  getBooks: async (filters: BookFilters = {}): Promise<BooksResponse> => {
    const params = new URLSearchParams();
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.genre) params.append('genre', filters.genre);
    if (filters.author) params.append('author', filters.author);

    const queryString = params.toString();
    return await api.get<BooksResponse>(`/books${queryString ? `?${queryString}` : ''}`);
  },

  // Search books
  searchBooks: async (query: string): Promise<Book[]> => {
    return await api.get<Book[]>(`/books/search?q=${encodeURIComponent(query)}`);
  },

  // Get single book by ID
  getBookById: async (id: string): Promise<Book> => {
    return await api.get<Book>(`/books/${id}`);
  },

  // Create a new book
  createBook: async (bookData: Partial<Book>): Promise<Book> => {
    return await api.post<Book>('/books', bookData);
  },

  // Update a book
  updateBook: async (id: string, bookData: Partial<Book>): Promise<Book> => {
    return await api.put<Book>(`/books/${id}`, bookData);
  },

  // Delete a book
  deleteBook: async (id: string): Promise<{ message: string }> => {
    return await api.delete<{ message: string }>(`/books/${id}`);
  },

  // Get book reviews
  getBookReviews: async (bookId: string): Promise<Review[]> => {
    return await api.get<Review[]>(`/books/${bookId}/reviews`);
  },
};
