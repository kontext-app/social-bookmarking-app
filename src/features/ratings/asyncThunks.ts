import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  loadDocument,
  hasRatingsIndex,
  isIDXAuthenticated,
  getRatingsIndexDocID,
  setDefaultRatingsIndex,
  createRatingDoc,
  addRatingDocToRatingsIndex,
} from 'app/apis/ceramic';
import {
  ratingsIndexReceived,
  ratingsReceived,
} from 'features/ratings/ratingsSlice';
import {
  upVotePublicBookmark,
  downVotePublicBookmark,
} from 'features/bookmarks/bookmarksSlice';
import { selectRatingsIndex } from 'features/ratings/selectors';
import { selectProfileDID } from 'features/profile/selectors';
import { selectPublicBookmarkByDocID } from 'features/bookmarks/selectors';
import { enrichPartialRating } from 'features/ratings/utils';
import { flattenDoc } from 'app/utils/doc';

import type { RatingDocContent } from 'kontext-common';
import type { State } from 'app/store';
import type { RatingsIndex } from './types';

export const bootstrapRatings = createAsyncThunk<void, void, { state: State }>(
  'ratings/bootstrapRatings',
  async (payload, thunkAPI) => {
    if (!isIDXAuthenticated()) {
      return thunkAPI.rejectWithValue('IDX not authenticated');
    }

    const ratingsIndexDocID = (await hasRatingsIndex())
      ? await getRatingsIndexDocID()
      : await setDefaultRatingsIndex();

    if (!ratingsIndexDocID) {
      thunkAPI.rejectWithValue(new Error('RatingsIndexDocID is null'));
    }

    const ratingsIndexDoc = await loadDocument(ratingsIndexDocID as string);
    // @ts-ignore
    const ratingsIndex = flattenDoc(ratingsIndexDoc);
    thunkAPI.dispatch(ratingsIndexReceived(ratingsIndex));
    thunkAPI.dispatch(fetchRatingsFromIndexKey('bookmarks'));
  }
);

export const fetchRatingsFromIndexKey = createAsyncThunk<
  void,
  string,
  { state: State }
>('ratings/fetchRatingsFromIndexKey', async (indexKey, thunkAPI) => {
  const ratingsIndex = selectRatingsIndex(thunkAPI.getState());

  if (!ratingsIndex) {
    thunkAPI.rejectWithValue(new Error('RatingsIndex is null'));
  }

  const ratingDocIDs = (ratingsIndex as RatingsIndex)[indexKey];
  const ratingDocs = await Promise.all(
    ratingDocIDs.map((ratingDocID) => loadDocument(ratingDocID))
  );
  // @ts-ignore
  const ratings = ratingDocs.map((ratingDoc) => flattenDoc(ratingDoc));
  thunkAPI.dispatch(ratingsReceived(ratings));
});

export const addRating = createAsyncThunk<
  void,
  {
    ratingToAdd: Partial<RatingDocContent>;
    ratingsIndexKey: 'bookmarks' | 'comments';
  },
  { state: State }
>('ratings/addRating', async (payload, thunkAPI) => {
  const authorDID = selectProfileDID(thunkAPI.getState());
  const ratingsIndex = selectRatingsIndex(thunkAPI.getState());

  if (!ratingsIndex) {
    thunkAPI.rejectWithValue(new Error('RatingsIndexDoc not loaded'));
  }

  const enrichedRating = enrichPartialRating({
    ...payload.ratingToAdd,
    author: authorDID as string,
  });

  const createdRatingDocID = await createRatingDoc(enrichedRating);

  const updatedRatingsIndex = await addRatingDocToRatingsIndex(
    createdRatingDocID,
    payload.ratingsIndexKey
  );

  thunkAPI.dispatch(
    ratingsIndexReceived({
      ...ratingsIndex,
      ...updatedRatingsIndex,
    })
  );

  if (payload.ratingsIndexKey === 'bookmarks') {
    const bookmark = selectPublicBookmarkByDocID(
      thunkAPI.getState(),
      enrichedRating.ratedDocId
    );

    if (typeof bookmark !== 'undefined') {
      thunkAPI.dispatch(
        enrichedRating.rating === 1
          ? upVotePublicBookmark({
              docID: bookmark.docID,
              upVotes: [...bookmark.upVotes, authorDID],
            })
          : downVotePublicBookmark({
              docID: bookmark.docID,
              downVotes: [...bookmark.downVotes, authorDID],
            })
      );
    }
  }
});

export default {
  bootstrapRatings,
  fetchRatingsFromIndexKey,
  addRating,
};
