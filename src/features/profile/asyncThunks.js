import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  authenticateWithEthereum,
  isIDXAuthenticated,
  getDID,
  getProfile,
  getIDXDocID,
} from '../../app/apis/ceramic';
import { connectWithWeb3 } from '../../app/apis/web3';
import { authenticated } from './profileSlice';

export const logInWithEthereum = createAsyncThunk(
  'profile/logInWithEthereum',
  async (arg, thunkAPI) => {
    if (!isIDXAuthenticated()) {
      const { provider, addresses } = await connectWithWeb3();
      await authenticateWithEthereum(provider, addresses[0]);
    }
    const did = getDID();
    const profileDoc = await getProfile();
    thunkAPI.dispatch(authenticated({ did }));
  }
);

export default {
  logInWithEthereum,
};
