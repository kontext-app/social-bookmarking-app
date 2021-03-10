import { State } from 'app/store';
import {
  aggregatedRatingsAdapter,
  aggregatedRatingsIndexAdapter,
} from 'features/aggregatedRatings/aggregatedRatingsSlice';

import type { AggregatedRating, LoadingStatus } from 'kontext-common';
import type { AggregatedRatingsIndex } from 'features/aggregatedRatings/types';

const aggregatedRatingsIndexSelectors = aggregatedRatingsIndexAdapter.getSelectors(
  (state: State) => state.aggregatedRatings.aggregatedRatingsIndex
);

const aggregatedRatingsSelectors = aggregatedRatingsAdapter.getSelectors(
  (state: State) => state.aggregatedRatings.aggregatedRatings
);

export function selectAggregatedRatingsLoadingStatus(
  state: State
): LoadingStatus {
  return state.aggregatedRatings.loadingStatus;
}

export function selectAggregatedRatingsIndex(
  state: State
): AggregatedRatingsIndex | undefined {
  const [aggregatedRatingsIndex] = aggregatedRatingsIndexSelectors.selectAll(
    state
  );
  return aggregatedRatingsIndex;
}

export function selectAggregatedBookmarkRatingByRatedDocID(
  state: State,
  ratedBookmarkDocID: string
): AggregatedRating | undefined {
  const aggregatedRatingsDocs = aggregatedRatingsSelectors.selectAll(state);
  const aggregatedRatings = aggregatedRatingsDocs.find(
    (aggregatedRatingsDoc) => aggregatedRatingsDoc[ratedBookmarkDocID]
  );

  if (aggregatedRatings) {
    return aggregatedRatings[ratedBookmarkDocID];
  }

  return aggregatedRatings;
}
