import { createSlice } from '@reduxjs/toolkit';

import { LoadingStatus } from './constants/enums';
import { bootstrapApp } from './asyncThunks';

import type { LoadingStatusType } from './constants/enums';

export type AppSliceState = {
  bootstrapStatus: LoadingStatusType;
  error: null | Error;
  lastUpdated: null | number;
};

const initialState: AppSliceState = {
  bootstrapStatus: LoadingStatus.IDLE,
  error: null,
  lastUpdated: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLastUpdated: (state, action) => {
      state.lastUpdated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(bootstrapApp.fulfilled, (state) => {
      state.bootstrapStatus = LoadingStatus.FULFILLED;
    });
    builder.addCase(bootstrapApp.pending, (state) => {
      state.bootstrapStatus = LoadingStatus.PENDING;
    });
    builder.addCase(bootstrapApp.rejected, (state) => {
      state.bootstrapStatus = LoadingStatus.REJECTED;
    });
  },
});

export const { setLastUpdated } = appSlice.actions;

export const appReducer = appSlice.reducer;

export default {
  appSlice,
  appReducer,
  ...appSlice.actions,
};
