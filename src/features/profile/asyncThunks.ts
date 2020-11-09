import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  authenticateWithEthereum,
  isIDXAuthenticated,
  getDID,
  getProfileByDID,
} from 'app/apis/ceramic';
import { connectWithWeb3 } from 'app/apis/web3';
import { bootstrapBookmarks } from 'features/bookmarks/asyncThunks';

import type { BasicProfile } from 'features/profile/types';
import type { State } from 'app/store';

export const logInWithEthereum = createAsyncThunk<
  string | null,
  void,
  { state: State }
>('profile/logInWithEthereum', async (payload, thunkAPI) => {
  if (!isIDXAuthenticated()) {
    const { provider, addresses } = await connectWithWeb3();
    await authenticateWithEthereum(provider, addresses[0]);
  }

  thunkAPI.dispatch(bootstrapBookmarks());

  return getDID();
});

export const fetchProfileDocByDID = createAsyncThunk<
  BasicProfile | null,
  string
>('profile/fetchProfileDocByDID', async (did) => {
  const profile = await getProfileByDID(did);
  return profile;
});

export default {
  logInWithEthereum,
  fetchProfileDocByDID,
};
