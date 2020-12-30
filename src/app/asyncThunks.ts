import { createAsyncThunk } from '@reduxjs/toolkit';
import { enums } from 'kontext-common';

import { getSeed } from 'app/apis/storage';
import {
  selectProfileDID,
  selectProfileAuthenticationMethod,
} from 'features/profile/selectors';
import { logInWithEthereum, logInWithSeed } from 'features/profile/asyncThunks';
import { logout } from 'features/profile/profileSlice';

import type { State } from 'app/store';

export const bootstrapApp = createAsyncThunk<void, void, { state: State }>(
  'app/bootstrap',
  async (arg, thunkAPI) => {
    const state = thunkAPI.getState();

    const previouslyAuthenticatedDID = selectProfileDID(state);
    const authenticationMethod = selectProfileAuthenticationMethod(state);

    if (typeof previouslyAuthenticatedDID === 'string') {
      if (authenticationMethod === enums.AuthenticationMethods.ETHEREUM) {
        thunkAPI.dispatch(logInWithEthereum());
      }
      if (authenticationMethod === enums.AuthenticationMethods.SEED) {
        const seed = getSeed();

        if (typeof seed === 'string') {
          thunkAPI.dispatch(logInWithSeed(seed));
        } else {
          thunkAPI.dispatch(logout());
        }
      }
    }
  }
);

export default {
  bootstrapApp,
};
