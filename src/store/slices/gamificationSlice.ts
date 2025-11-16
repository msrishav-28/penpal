import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: Date;
  progress: number;
}

interface GamificationState {
  level: number;
  xp: number;
  xpToNextLevel: number;
  rank: string;
  achievements: Achievement[];
  badges: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: GamificationState = {
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  rank: 'Novice',
  achievements: [],
  badges: [],
  isLoading: false,
  error: null
};

export const fetchAchievements = createAsyncThunk(
  'gamification/fetchAchievements',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/gamification/achievements');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch achievements');
    }
  }
);

export const fetchProfile = createAsyncThunk(
  'gamification/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/gamification/profile');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

const gamificationSlice = createSlice({
  name: 'gamification',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAchievements.fulfilled, (state, action) => {
        state.achievements = [...action.payload.earned, ...action.payload.available];
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.level = action.payload.level;
        state.xp = action.payload.xp;
        state.xpToNextLevel = action.payload.xpToNextLevel;
        state.rank = action.payload.rank;
        state.badges = action.payload.badges;
      });
  }
});

export default gamificationSlice.reducer;
