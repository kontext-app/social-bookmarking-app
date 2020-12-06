import { createAsyncThunk } from '@reduxjs/toolkit';

import { initializeIDX } from 'app/apis/ceramic';
import { selectProfileDID } from 'features/profile/selectors';
import { logInWithEthereum } from 'features/profile/asyncThunks';

import type { State } from 'app/store';

export const bootstrapApp = createAsyncThunk<void, void, { state: State }>(
  'app/bootstrap',
  async (arg, thunkAPI) => {
    const state = thunkAPI.getState();

    initializeIDX();

    const previouslyAuthenticatedDID = selectProfileDID(state);

    if (typeof previouslyAuthenticatedDID === 'string') {
      thunkAPI.dispatch(logInWithEthereum());
    }
  }
);

export default {
  bootstrapApp,
};
