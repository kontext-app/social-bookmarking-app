import { createAsyncThunk } from '@reduxjs/toolkit';

import { getSeed } from 'app/apis/storage';
import { AuthenticationMethods } from 'app/constants/enums';
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
      if (authenticationMethod === AuthenticationMethods.ETHEREUM) {
        thunkAPI.dispatch(logInWithEthereum());
      }
      if (authenticationMethod === AuthenticationMethods.SEED) {
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
