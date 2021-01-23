import { State } from 'app/store';
import {
  ratingsIndexAdapter,
  ratingsAdapter,
  publicRatingsAdapter,
} from 'features/ratings/ratingsSlice';

import type { LoadingStatus } from 'kontext-common';
import type { RatingsIndex } from 'features/ratings/types';

const ratingsIndexSelector = ratingsIndexAdapter.getSelectors(
  (state: State) => state.ratings.ratingsIndex
);

const ratingsSelector = ratingsAdapter.getSelectors(
  (state: State) => state.ratings.ratings
);

const publicRatingsSelector = publicRatingsAdapter.getSelectors(
  (state: State) => state.ratings.publicRatings
);

export function selectRatingsLoadingStatus(state: State): LoadingStatus {
  return state.ratings.loadingStatus;
}

export function selectRatingsError(state: State): null | Error {
  return state.ratings.error;
}

export function selectRatingsIndex(state: State): RatingsIndex | null {
  const [ratingsIndex] = ratingsIndexSelector.selectAll(state);
  return ratingsIndex;
}
