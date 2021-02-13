import { createAsyncThunk } from '@reduxjs/toolkit';

import * as ceramic from 'app/apis/ceramic';
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
import { selectRecommendedBookmarkByDocID } from 'features/bookmarks/selectors';
import { enrichPartialRating } from 'features/ratings/utils';
import { flattenDoc } from 'app/utils/doc';

import type { RatingDocContent } from 'kontext-common';
import type { State } from 'app/store';
import type { RatingsIndex } from './types';

export const fetchRatingsIndex = createAsyncThunk<void, void, { state: State }>(
  'ratings/fetchRatingsIndex',
  async (payload, thunkAPI) => {
    const ratingsIndexDocID = await ceramic.getRatingsIndexDocID();

    if (!ratingsIndexDocID) {
      thunkAPI.rejectWithValue(new Error('RatingsIndexDocID is null'));
    }

    const ratingsIndexDoc = await ceramic.loadDocument(
      ratingsIndexDocID as string
    );
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
    ratingDocIDs.map((ratingDocID) => ceramic.loadDocument(ratingDocID))
  );
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

  const createdRatingDocID = await ceramic.createRatingDoc(enrichedRating);

  const updatedRatingsIndex = await ceramic.addRatingDocToRatingsIndex(
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
    const bookmark = selectRecommendedBookmarkByDocID(
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

export const addManyRatings = createAsyncThunk<
  void,
  {
    ratingsToAdd: Partial<RatingDocContent>[];
    ratingsIndexKey: 'bookmarks' | 'comments' | string;
  },
  { state: State }
>('ratings/addMany', async (payload, thunkAPI) => {
  const authorDID = selectProfileDID(thunkAPI.getState());
  const ratingsIndex = selectRatingsIndex(thunkAPI.getState());

  if (!ratingsIndex) {
    thunkAPI.rejectWithValue(new Error('RatingsIndexDoc not loaded'));
  }

  if (!(ratingsIndex as RatingsIndex)[payload.ratingsIndexKey]) {
    thunkAPI.rejectWithValue(
      new Error(
        `Index key '${payload.ratingsIndexKey}' does not exist in RatingsIndex`
      )
    );
  }

  const enrichedRatings = payload.ratingsToAdd.map((ratingToAdd) =>
    enrichPartialRating({
      ...ratingToAdd,
      author: authorDID as string,
    })
  );

  const createdRatingDocIDs = await Promise.all(
    enrichedRatings.map((enrichedRating) =>
      ceramic.createRatingDoc(enrichedRating)
    )
  );

  const updatedRatingsIndex = await ceramic.addManyRatingDocsToRatingsIndex(
    createdRatingDocIDs,
    payload.ratingsIndexKey
  );

  thunkAPI.dispatch(
    ratingsIndexReceived({
      ...ratingsIndex,
      ...updatedRatingsIndex,
    })
  );
});

export const addIndexKeyToRatingsIndex = createAsyncThunk<
  void,
  { indexKey: string },
  { state: State }
>('ratings/addIndexKeyToRatingsIndex', async (payload, thunkAPI) => {
  const did = selectProfileDID(thunkAPI.getState());

  if (!did) {
    thunkAPI.rejectWithValue(new Error('DID not loaded'));
  }

  await ceramic.addEmptyRatingsIndexKey(did as string, payload.indexKey);

  await thunkAPI.dispatch(fetchRatingsFromIndexKey(payload.indexKey));
});

export default {
  fetchRatingsIndex,
  fetchRatingsFromIndexKey,
  addRating,
  addManyRatings,
};
