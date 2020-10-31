import { createSlice } from '@reduxjs/toolkit';

import { logInWithEthereum } from './asyncThunks';

import { LoadingStatus } from 'app/constants';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    did: null,
    isAuthenticated: false,
    loadingStatus: LoadingStatus.IDLE,
    error: null,
  },
  reducers: {
    authenticated: (state, action) => {
      const { did } = action.payload;
      state.did = did;
      state.isAuthenticated = true;
    },
  },
  extraReducers: {
    [logInWithEthereum.pending]: (state) => {
      state.loadingStatus = LoadingStatus.PENDING;
    },
    [logInWithEthereum.fulfilled]: (state, action) => {
      state.loadingStatus = LoadingStatus.FULFILLED;
    },
    [logInWithEthereum.rejected]: (state, action) => {
      const { error } = action;
      state.loadingStatus = LoadingStatus.REJECTED;
      state.error = error;
    },
  },
});

export const { authenticated } = profileSlice.actions;

export const profileReducer = profileSlice.reducer;

export default {
  profileSlice,
  profileReducer,
  ...profileSlice.actions,
};
