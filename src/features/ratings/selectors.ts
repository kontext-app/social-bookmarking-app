import { State } from 'app/store';
import {
  ratingsIndexAdapter,
  ratingsAdapter,
  publicRatingsAdapter,
} from 'features/ratings/ratingsSlice';
import { selectProfileDID } from 'features/profile/selectors';
import { selectPublicBookmarkByDocID } from 'features/bookmarks/selectors';

import type { LoadingStatus } from 'kontext-common';
import type { Rating, RatingsIndex } from 'features/ratings/types';

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

export function selectRatingsOfCurrentUser(state: State) {
  const currentProfileDID = selectProfileDID(state);
  const ratings = ratingsSelector.selectAll(state);

  if (!currentProfileDID) {
    return [];
  }

  return ratings.filter((rating) => rating.author === currentProfileDID);
}

export function selectUpVotesOfCurrentUser(state: State) {
  const ratings = selectRatingsOfCurrentUser(state);

  return ratings.filter(
    (rating) =>
      rating.bestRating === 1 &&
      rating.worstRating === -1 &&
      rating.rating === 1
  );
}

export function selectDownVotesOfCurrentUser(state: State) {
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
  const bookmark = selectPublicBookmarkByDocID(state, docID);
  const upVotes = selectUpVotesOfCurrentUser(state);

  if (!currentProfileDID || !bookmark || upVotes.length === 0) {
    return false;
  }

  return (
    bookmark.upVotes.includes(currentProfileDID) ||
    Boolean(upVotes.find((upVoteRating) => upVoteRating.ratedDocId === docID))
  );
}

export function selectDidDownVoteDocID(state: State, docID: string): boolean {
  const currentProfileDID = selectProfileDID(state);
  const bookmark = selectPublicBookmarkByDocID(state, docID);
  const downVotes = selectDownVotesOfCurrentUser(state);

  if (!currentProfileDID || !bookmark || downVotes.length === 0) {
    return false;
  }

  return (
    bookmark.downVotes.includes(currentProfileDID) ||
    Boolean(
      downVotes.find((downVoteRating) => downVoteRating.ratedDocId === docID)
    )
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
