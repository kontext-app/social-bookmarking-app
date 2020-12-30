import { createSlice } from '@reduxjs/toolkit';
import { enums } from 'kontext-common';
import { bootstrapApp } from './asyncThunks';

import type { LoadingStatus } from 'kontext-common';

export type AppSliceState = {
  bootstrapStatus: LoadingStatus;
  error: null | Error;
  lastUpdated: null | number;
};

const initialState: AppSliceState = {
  bootstrapStatus: enums.LoadingStatus.IDLE,
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
      state.bootstrapStatus = enums.LoadingStatus.FULFILLED;
    });
    builder.addCase(bootstrapApp.pending, (state) => {
      state.bootstrapStatus = enums.LoadingStatus.PENDING;
    });
    builder.addCase(bootstrapApp.rejected, (state) => {
      state.bootstrapStatus = enums.LoadingStatus.REJECTED;
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
