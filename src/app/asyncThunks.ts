import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  createIDX,
  isIDXAuthenticated,
  authenticateWithEthereum,
} from 'app/apis/ceramic';
import { connectWithWeb3 } from 'app/apis/web3';
import { getProfileDID } from 'features/profile/selectors';
import { bootstrapBookmarks } from 'features/bookmarks/asyncThunks';

import type { State } from 'app/store';

export const bootstrapApp = createAsyncThunk<void, void, { state: State }>(
  'app/bootstrap',
  async (arg, thunkAPI) => {
    const state = thunkAPI.getState();

    await createIDX();

    const did = getProfileDID(state);
    const isAuthenticated = isIDXAuthenticated();

    if (did && !isAuthenticated) {
      const { provider, addresses } = await connectWithWeb3();
      await authenticateWithEthereum(provider, addresses[0]);
    }

    thunkAPI.dispatch(bootstrapBookmarks());
  }
);

export default {
  bootstrapApp,
};
