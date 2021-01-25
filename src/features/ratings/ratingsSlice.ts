import {
  createEntityAdapter,
  createSlice,
  EntityState,
} from '@reduxjs/toolkit';
import { enums } from 'kontext-common';

import { addAsyncMatchers } from 'app/utils/slice';

import type { LoadingStatus } from 'kontext-common';
import type { Rating, RatingsIndex } from 'features/ratings/types';

export type RatingsSliceState = {
  ratingsIndex: EntityState<RatingsIndex>;
  ratings: EntityState<Rating>;
  publicRatings: EntityState<Rating>;
  loadingStatus: LoadingStatus;
  error: null | Error;
};

export const ratingsIndexAdapter = createEntityAdapter<RatingsIndex>({
  selectId: (ratingsIndex) => ratingsIndex.docID,
});

export const ratingsAdapter = createEntityAdapter<Rating>({
  selectId: (rating) => rating.docID,
  sortComparer: (a, b) =>
    Date.parse(b.creationDate) - Date.parse(a.creationDate),
});

export const publicRatingsAdapter = createEntityAdapter<Rating>({
  selectId: (rating) => rating.docID,
  sortComparer: (a, b) =>
    Date.parse(b.creationDate) - Date.parse(a.creationDate),
});

const initialState: RatingsSliceState = {
  ratingsIndex: ratingsIndexAdapter.getInitialState(),
  ratings: ratingsAdapter.getInitialState(),
  publicRatings: publicRatingsAdapter.getInitialState(),
  loadingStatus: enums.LoadingStatus.IDLE,
  error: null,
};

export const ratingsSlice = createSlice({
  name: 'ratings',
  initialState,
  reducers: {
    ratingsIndexReceived: (state, action) => {
      ratingsIndexAdapter.upsertOne(state.ratingsIndex, action.payload);
    },
    ratingsReceived: (state, action) => {
      ratingsAdapter.upsertMany(state.ratings, action.payload);
    },
    publicRatingsReceived: (state, action) => {
      publicRatingsAdapter.upsertMany(state.publicRatings, action.payload);
    },
  },
  extraReducers: (builder) => {
    addAsyncMatchers(builder, 'ratings');
  },
});

export const ratingsReducer = ratingsSlice.reducer;

export const {
  ratingsIndexReceived,
  ratingsReceived,
  publicRatingsReceived,
} = ratingsSlice.actions;

export default {
  ratingsSlice,
  ratingsReducer,
  ...ratingsSlice.actions,
};
