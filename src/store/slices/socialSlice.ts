import { createSlice } from '@reduxjs/toolkit';

interface SocialState {
  feed: any[];
  isLoading: boolean;
}

const initialState: SocialState = {
  feed: [],
  isLoading: false
};

const socialSlice = createSlice({
  name: 'social',
  initialState,
  reducers: {}
});

export default socialSlice.reducer;
