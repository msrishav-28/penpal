import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

interface ReadingProgress {
  _id: string;
  book: any;
  currentPage: number;
  totalPages: number;
  status: 'want-to-read' | 'currently-reading' | 'finished' | 'dnf' | 'paused';
  rating: number;
  percentage: number;
}

interface ReadingState {
  progress: ReadingProgress[];
  currentlyReading: ReadingProgress[];
  wantToRead: ReadingProgress[];
  finished: ReadingProgress[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ReadingState = {
  progress: [],
  currentlyReading: [],
  wantToRead: [],
  finished: [],
  isLoading: false,
  error: null
};

export const fetchReadingProgress = createAsyncThunk(
  'reading/fetchProgress',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/reading/progress');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch reading progress');
    }
  }
);

export const updateProgress = createAsyncThunk(
  'reading/updateProgress',
  async (data: { bookId: string; currentPage?: number; status?: string; rating?: number }, { rejectWithValue }) => {
    try {
      const response = await api.post('/reading/progress', data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update progress');
    }
  }
);

const readingSlice = createSlice({
  name: 'reading',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReadingProgress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchReadingProgress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.progress = action.payload;
        state.currentlyReading = action.payload.filter((p: ReadingProgress) => p.status === 'currently-reading');
        state.wantToRead = action.payload.filter((p: ReadingProgress) => p.status === 'want-to-read');
        state.finished = action.payload.filter((p: ReadingProgress) => p.status === 'finished');
      })
      .addCase(fetchReadingProgress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export default readingSlice.reducer;
