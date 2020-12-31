import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { enums } from 'kontext-common';

import {
  logInWithEthereum,
  fetchProfileDocByDID,
  logInWithSeed,
  subscribeToRecommender,
} from 'features/profile/asyncThunks';
import { removeSeed } from 'app/apis/storage';
import { addAsyncMatchers } from 'app/utils/slice';

import type { LoadingStatus, AuthenticationMethod } from 'kontext-common';

export type ProfileSliceState = {
  did: null | string;
  doc: null | any;
  isAuthenticated: boolean;
  authenticationMethod: AuthenticationMethod | null;
  subscribedToRecommender: boolean;
  loadingStatus: LoadingStatus;
  error: null | Error;
};

const initialState: ProfileSliceState = {
  did: null,
  doc: null,
  isAuthenticated: false,
  authenticationMethod: null,
  loadingStatus: enums.LoadingStatus.IDLE,
  subscribedToRecommender: false,
  error: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setAuthenticated: (state) => {
      state.isAuthenticated = true;
    },
    setAuthenticationMethod: (
      state,
      action: PayloadAction<AuthenticationMethod>
    ) => {
      state.authenticationMethod = action.payload;
    },
    logout: (state) => {
      state.did = null;
      state.doc = null;
      state.isAuthenticated = false;
      state.authenticationMethod = null;
      state.loadingStatus = enums.LoadingStatus.IDLE;
      removeSeed();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logInWithEthereum.fulfilled, (state, action) => {
      state.did = action.payload;
      state.isAuthenticated = true;
      state.authenticationMethod = enums.AuthenticationMethods.ETHEREUM;
    });
    builder.addCase(logInWithSeed.fulfilled, (state, action) => {
      state.did = action.payload;
      state.isAuthenticated = true;
      state.authenticationMethod = enums.AuthenticationMethods.SEED;
    });
    builder.addCase(fetchProfileDocByDID.fulfilled, (state, action) => {
      state.doc = action.payload;
    });
    builder.addCase(subscribeToRecommender.fulfilled, (state) => {
      state.subscribedToRecommender = true;
    });
    addAsyncMatchers(builder, 'profile');
  },
});

export const {
  setAuthenticated,
  setAuthenticationMethod,
  logout,
} = profileSlice.actions;

export const profileReducer = profileSlice.reducer;

export default {
  profileSlice,
  profileReducer,
  ...profileSlice.actions,
};
