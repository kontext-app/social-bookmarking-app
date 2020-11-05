import { createSlice, Action, AnyAction } from '@reduxjs/toolkit';

import { logInWithEthereum, fetchProfileDocByDID } from './asyncThunks';

import { LoadingStatus } from 'app/constants/enums';

import type { LoadingStatusType } from 'app/constants/enums';

interface RejectedAction extends Action {
  error: Error;
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('rejected');
}

function isPendingAction(action: AnyAction): action is AnyAction {
  return action.type.endsWith('pending');
}

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
    authenticated: (state, action) => {
      const { did } = action.payload;
      state.did = did;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logInWithEthereum.fulfilled, (state, action) => {
      state.loadingStatus = LoadingStatus.FULFILLED;
    });
    builder.addCase(fetchProfileDocByDID.fulfilled, (state, action) => {
      state.loadingStatus = LoadingStatus.FULFILLED;
      state.doc = action.payload;
    });
    builder.addMatcher(isPendingAction, (state, action) => {
      state.loadingStatus = LoadingStatus.PENDING;
    });
    builder.addMatcher(isRejectedAction, (state, action) => {
      const { error } = action;
      state.loadingStatus = LoadingStatus.REJECTED;
      state.error = error;
    });
  },
});

export const { authenticated } = profileSlice.actions;

export const profileReducer = profileSlice.reducer;

export default {
  profileSlice,
  profileReducer,
  ...profileSlice.actions,
};
