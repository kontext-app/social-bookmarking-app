import {
  createSlice,
  createEntityAdapter,
  EntityState,
} from '@reduxjs/toolkit';
import { enums } from 'kontext-common';

import { addAsyncMatchers } from 'app/utils/slice';

import type {
  AggregatedRatings,
  AggregatedRatingsIndex,
} from 'features/aggregatedRatings/types';
import type { LoadingStatus } from 'kontext-common';

export type AggregatedRatingsSlice = {
  aggregatedRatingsIndex: EntityState<AggregatedRatingsIndex>;
  aggregatedRatings: EntityState<AggregatedRatings>;
  loadingStatus: LoadingStatus;
  error: null | Error;
  lastUpdated: null | number;
};

export const aggregatedRatingsIndexAdapter = createEntityAdapter<AggregatedRatingsIndex>(
  {
    selectId: (aggregatedRatingsIndex) => aggregatedRatingsIndex.docID,
  }
);

export const aggregatedRatingsAdapter = createEntityAdapter<AggregatedRatings>({
  selectId: (aggregatedRatings) => aggregatedRatings.docID,
});

const initialState: AggregatedRatingsSlice = {
  aggregatedRatingsIndex: aggregatedRatingsIndexAdapter.getInitialState(),
  aggregatedRatings: aggregatedRatingsAdapter.getInitialState(),
  loadingStatus: enums.LoadingStatus.IDLE,
  error: null,
  lastUpdated: null,
};

export const aggregatedRatingsSlice = createSlice({
  name: 'aggregatedRatings',
  initialState,
  reducers: {
    aggregatedRatingsIndexReceived: (state, action) => {
      aggregatedRatingsIndexAdapter.removeAll(state.aggregatedRatingsIndex);
      aggregatedRatingsIndexAdapter.upsertOne(
        state.aggregatedRatingsIndex,
        action.payload
      );
    },
    aggregatedRatingsReceived: (state, action) => {
      aggregatedRatingsAdapter.upsertOne(
        state.aggregatedRatings,
        action.payload
      );
    },
  },
  extraReducers: (builder) => {
    addAsyncMatchers(builder, 'aggregatedRatings');
  },
});

export const aggregatedRatingsReducer = aggregatedRatingsSlice.reducer;

export const {
  aggregatedRatingsIndexReceived,
  aggregatedRatingsReceived,
} = aggregatedRatingsSlice.actions;

export default {
  aggregatedRatingsSlice,
  aggregatedRatingsReducer,
  ...aggregatedRatingsSlice.actions,
};
