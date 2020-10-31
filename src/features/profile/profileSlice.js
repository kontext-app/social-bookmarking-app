import { createSlice } from '@reduxjs/toolkit';

import { logInWithEthereum, fetchProfileDocByDID } from './asyncThunks';

import { LoadingStatus } from 'app/constants';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    did: null,
    doc: null,
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
    [fetchProfileDocByDID.pending]: (state) => {
      state.loadingStatus = LoadingStatus.PENDING;
    },
    [fetchProfileDocByDID.fulfilled]: (state, action) => {
      state.loadingStatus = LoadingStatus.FULFILLED;
      state.doc = action.payload;
    },
    [fetchProfileDocByDID.rejected]: (state, action) => {
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
