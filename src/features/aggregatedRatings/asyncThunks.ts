import { createAsyncThunk } from '@reduxjs/toolkit';

import * as ceramic from 'app/apis/ceramic';
import * as recommender from 'app/apis/recommender';
import { flattenDoc } from 'app/utils/doc';

import { aggregatedRatingsReceived } from 'features/aggregatedRatings/aggregatedRatingsSlice';

import type { State } from 'app/store';
import type { AggregatedRatings } from './types';

export const fetchAggregatedBookmarkRatings = createAsyncThunk<
  AggregatedRatings,
  void,
  { state: State }
>('aggregatedRatings/fetchAggregatedBookmarkRatings', async (_, thunkAPI) => {
  const aggregatedBookmarkRatingsDocID = await recommender.getAggregatedBookmarkRatingsDocID();

  if (!aggregatedBookmarkRatingsDocID) {
    thunkAPI.rejectWithValue(
      new Error('Recommender return empty doc id for AggregatedRatings')
    );
  }

  const aggregatedBookmarkRatingsDoc = await ceramic.loadDocument(
    aggregatedBookmarkRatingsDocID as string
  );
  const aggregatedBookmarkRatings = flattenDoc(aggregatedBookmarkRatingsDoc);
  thunkAPI.dispatch(
    aggregatedRatingsReceived({
      indexKey: 'bookmarks',
      ...aggregatedBookmarkRatings,
    })
  );

  return aggregatedBookmarkRatings;
});

export default {
  fetchAggregatedBookmarkRatings,
};
