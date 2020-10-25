import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    isLoggedIn: 'idle',
    isLoading: 'idle',
  },
  reducers: {
    authenticated: (state, action) => {
      // TODO
    },
  },
});

export const { increment, decrement, incrementByAmount } = profileSlice.actions;

export const profileReducer = profileSlice.reducer;

export default {
  profileSlice,
  profileReducer,
  ...profileSlice.actions,
};
