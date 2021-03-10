import { State } from 'app/store';
import {
  ratingsIndexAdapter,
  ratingsAdapter,
} from 'features/ratings/ratingsSlice';
import { selectProfileDID } from 'features/profile/selectors';

import type { LoadingStatus } from 'kontext-common';
import type { Rating, RatingsIndex } from 'features/ratings/types';

const ratingsIndexSelector = ratingsIndexAdapter.getSelectors(
  (state: State) => state.ratings.ratingsIndex
);

const ratingsSelector = ratingsAdapter.getSelectors(
  (state: State) => state.ratings.ratings
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

export function selectRatingsOfCurrentUser(state: State): Rating[] {
  const currentProfileDID = selectProfileDID(state);
  const ratings = ratingsSelector.selectAll(state);

  if (!currentProfileDID) {
    return [];
  }

  return ratings.filter((rating) => rating.author === currentProfileDID);
}

export function selectUpVotesOfCurrentUser(state: State): Rating[] {
  const ratings = selectRatingsOfCurrentUser(state);

  return ratings.filter(
    (rating) =>
      rating.bestRating === 1 &&
      rating.worstRating === -1 &&
      rating.rating === 1
  );
}

export function selectDownVotesOfCurrentUser(state: State): Rating[] {
  const ratings = selectRatingsOfCurrentUser(state);

  return ratings.filter(
    (rating) =>
      rating.bestRating === 1 &&
      rating.worstRating === -1 &&
      rating.rating === -1
  );
}

export function selectDidUpVoteDocID(state: State, docID: string): boolean {
  const currentProfileDID = selectProfileDID(state);
  const upVotes = selectUpVotesOfCurrentUser(state);

  if (!currentProfileDID || upVotes.length === 0) {
    return false;
  }

  return Boolean(
    upVotes.find((upVoteRating) => upVoteRating.ratedDocId === docID)
  );
}

export function selectDidDownVoteDocID(state: State, docID: string): boolean {
  const currentProfileDID = selectProfileDID(state);
  const downVotes = selectDownVotesOfCurrentUser(state);

  if (!currentProfileDID || downVotes.length === 0) {
    return false;
  }

  return Boolean(
    downVotes.find((downVoteRating) => downVoteRating.ratedDocId === docID)
  );
}

export function selectRatingsByRatedDocID(
  state: State,
  ratedDocID: string
): Rating[] {
  const ratingsOfCurrentUser = selectRatingsOfCurrentUser(state);

  return ratingsOfCurrentUser.filter(
    (rating) => rating.ratedDocId === ratedDocID
  );
}
