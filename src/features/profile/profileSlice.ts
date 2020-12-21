import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { constants } from 'kontext-common';

import {
  logInWithEthereum,
  fetchProfileDocByDID,
  logInWithSeed,
} from 'features/profile/asyncThunks';
import { removeSeed } from 'app/apis/storage';
import { addAsyncMatchers } from 'app/utils/slice';

import type { LoadingStatus, AuthenticationMethod } from 'kontext-common';

export type ProfileSliceState = {
  did: null | string;
  doc: null | any;
  isAuthenticated: boolean;
  authenticationMethod: AuthenticationMethod | null;
  loadingStatus: LoadingStatus;
  error: null | Error;
};

const initialState: ProfileSliceState = {
  did: null,
  doc: null,
  isAuthenticated: false,
  authenticationMethod: null,
  loadingStatus: constants.LoadingStatus.IDLE,
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
      state.loadingStatus = constants.LoadingStatus.IDLE;
      removeSeed();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logInWithEthereum.fulfilled, (state, action) => {
      state.did = action.payload;
      state.isAuthenticated = true;
      state.authenticationMethod = constants.AuthenticationMethods.ETHEREUM;
    });
    builder.addCase(logInWithSeed.fulfilled, (state, action) => {
      state.did = action.payload;
      state.isAuthenticated = true;
      state.authenticationMethod = constants.AuthenticationMethods.SEED;
    });
    builder.addCase(fetchProfileDocByDID.fulfilled, (state, action) => {
      state.doc = action.payload;
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
