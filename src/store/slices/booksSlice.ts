import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

interface Book {
  _id: string;
  title: string;
  author: string;
  coverUrl: string;
  pages: number;
  genres: string[];
  averageRating: number;
}

interface BooksState {
  items: Book[];
  currentBook: Book | null;
  searchResults: Book[];
  isLoading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
}

const initialState: BooksState = {
  items: [],
  currentBook: null,
  searchResults: [],
  isLoading: false,
  error: null,
  page: 1,
  totalPages: 1
};

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async ({ page = 1, limit = 20 }: { page?: number; limit?: number }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/books?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch books');
    }
  }
);

export const searchBooks = createAsyncThunk(
  'books/search',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/google-books/search?q=${query}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Search failed');
    }
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.searchResults = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.books;
        state.totalPages = action.payload.pages;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(searchBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload.books;
      })
      .addCase(searchBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearSearch } = booksSlice.actions;
export default booksSlice.reducer;
