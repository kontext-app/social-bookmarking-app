import { createAsyncThunk } from '@reduxjs/toolkit';
import { utils as ethersUtils } from 'ethers';

import {
  authenticateWithEthereum,
  authenticateWithSeed,
  isIDXAuthenticated,
  getDID,
  getBasicProfileDocContent,
  setBasicProfileDocContent,
} from 'app/apis/ceramic';
import { connectWithWeb3 } from 'app/apis/web3';
import { subscribeDID } from 'app/apis/recommender';
import { bootstrapBookmarks } from 'features/bookmarks/asyncThunks';
import { bootstrapRatings } from 'features/ratings/asyncThunks';
import { selectProfileDID } from 'features/profile/selectors';
import { enrichPartialProfile } from 'features/profile/utils';

import type { BasicProfileDocContent } from 'kontext-common';
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
  thunkAPI.dispatch(bootstrapRatings());
  thunkAPI.dispatch(subscribeToRecommender());

  return getDID();
});

export const logInWithSeed = createAsyncThunk<
  string | null,
  string,
  { state: State }
>('profile/logInWithSeed', async (payload, thunkAPI) => {
  if (!isIDXAuthenticated()) {
    await authenticateWithSeed(ethersUtils.arrayify(payload));
  }

  thunkAPI.dispatch(bootstrapBookmarks());
  thunkAPI.dispatch(subscribeToRecommender());

  return getDID();
});

export const fetchProfileDocByDID = createAsyncThunk<
  BasicProfileDocContent | null,
  string
>('profile/fetchProfileDocByDID', async (did) => {
  const profile = await getBasicProfileDocContent(did);
  return profile;
});

export const updateProfile = createAsyncThunk<
  void,
  Partial<BasicProfileDocContent>,
  { state: State }
>('profile/updateProfile', async (partialProfile, thunkAPI) => {
  const enrichedProfile = enrichPartialProfile(partialProfile);
  await setBasicProfileDocContent(enrichedProfile);

  const authenticatedDID = selectProfileDID(thunkAPI.getState());

  if (typeof authenticatedDID === 'string') {
    thunkAPI.dispatch(fetchProfileDocByDID(authenticatedDID));
  }
});

export const subscribeToRecommender = createAsyncThunk<
  void,
  void,
  { state: State }
>('profile/subscribe', async (_, thunkAPI) => {
  const authenticatedDID = selectProfileDID(thunkAPI.getState());

  if (typeof authenticatedDID === 'string') {
    await subscribeDID(authenticatedDID);
  }
});

export default {
  logInWithEthereum,
  fetchProfileDocByDID,
  updateProfile,
  subscribeToRecommender,
};
