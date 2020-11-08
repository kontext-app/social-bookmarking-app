import { createSlice } from '@reduxjs/toolkit';

import { logInWithEthereum, fetchProfileDocByDID } from './asyncThunks';

import { LoadingStatus, LoadingStatusType } from 'app/constants/enums';
import { addAsyncMatchers } from 'app/utils/slice';

export type ProfileSliceState = {
  did: null | string;
  doc: null | any;
  isAuthenticated: boolean;
  loadingStatus: LoadingStatusType;
  error: null | Error;
};

const initialState: ProfileSliceState = {
  did: null,
  doc: null,
  isAuthenticated: false,
  loadingStatus: LoadingStatus.IDLE,
  error: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setAuthenticated: (state) => {
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logInWithEthereum.fulfilled, (state, action) => {
      state.did = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(fetchProfileDocByDID.fulfilled, (state, action) => {
      state.doc = action.payload;
    });
    addAsyncMatchers(builder, 'profile');
  },
});

export const { setAuthenticated } = profileSlice.actions;

export const profileReducer = profileSlice.reducer;

export default {
  profileSlice,
  profileReducer,
  ...profileSlice.actions,
};
