import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  authenticateWithEthereum,
  isIDXAuthenticated,
  getDID,
  getProfileByDID,
} from 'app/apis/ceramic';
import { connectWithWeb3 } from 'app/apis/web3';

import type { BasicProfile } from 'features/profile/types';

export const logInWithEthereum = createAsyncThunk<string | null>(
  'profile/logInWithEthereum',
  async () => {
    if (!isIDXAuthenticated()) {
      const { provider, addresses } = await connectWithWeb3();
      await authenticateWithEthereum(provider, addresses[0]);
    }
    const did = getDID();
    return did;
  }
);

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
