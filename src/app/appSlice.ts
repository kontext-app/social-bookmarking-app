import { createSlice } from '@reduxjs/toolkit';
import { constants } from 'kontext-common';
import { bootstrapApp } from './asyncThunks';

import type { LoadingStatus } from 'kontext-common';

export type AppSliceState = {
  bootstrapStatus: LoadingStatus;
  error: null | Error;
  lastUpdated: null | number;
};

const initialState: AppSliceState = {
  bootstrapStatus: constants.LoadingStatus.IDLE,
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
      state.bootstrapStatus = constants.LoadingStatus.FULFILLED;
    });
    builder.addCase(bootstrapApp.pending, (state) => {
      state.bootstrapStatus = constants.LoadingStatus.PENDING;
    });
    builder.addCase(bootstrapApp.rejected, (state) => {
      state.bootstrapStatus = constants.LoadingStatus.REJECTED;
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
