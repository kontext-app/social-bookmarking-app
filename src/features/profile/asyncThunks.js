import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  authenticateWithEthereum,
  isIDXAuthenticated,
  getDID,
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
    thunkAPI.dispatch(authenticated({ did }));
  }
);

export default {
  logInWithEthereum,
};