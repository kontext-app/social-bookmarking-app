import { createAsyncThunk } from '@reduxjs/toolkit';

import * as ceramic from 'app/apis/ceramic';
import { getRecentPublicBookmarks } from 'app/apis/recommender';
import { selectBookmarksIndex } from 'features/bookmarks/selectors';
import {
  bookmarksIndexReceived,
  bookmarksReceived,
  recommendedBookmarksReceived,
} from 'features/bookmarks/bookmarksSlice';
import { enrichPartialBookmark } from 'features/bookmarks/utils';
import { selectProfileDID } from 'features/profile/selectors';
import { flattenDoc } from 'app/utils/doc';

import type { BookmarksIndex } from 'features/bookmarks/types';
import type { State } from 'app/store';
import type { BookmarkDocContent } from 'kontext-common';

export const fetchBookmarksIndex = createAsyncThunk<
  void,
  void,
  { state: State }
>('bookmarks/fetchBookmarksIndex', async (_, thunkAPI) => {
  const bookmarksIndexDocID = await ceramic.getBookmarksIndexDocID();

  if (!bookmarksIndexDocID) {
    thunkAPI.rejectWithValue(new Error('BookmarksIndexDocID is null'));
  }

  const bookmarksIndexDoc = await ceramic.loadDocument(
    bookmarksIndexDocID as string
  );
  const bookmarksIndex = flattenDoc(bookmarksIndexDoc);
  thunkAPI.dispatch(bookmarksIndexReceived(bookmarksIndex));
});

export const fetchBookmarksOfIndexKey = createAsyncThunk<
  void,
  { indexKey: string },
  { state: State }
>('bookmarks/fetchBookmarksOfIndexKey', async (payload, thunkAPI) => {
  const bookmarksIndex = selectBookmarksIndex(thunkAPI.getState());

  if (!bookmarksIndex) {
    thunkAPI.rejectWithValue(new Error('BookmarksIndexDoc not set in state'));
  }

  const { indexKey } = payload;

  if (!(bookmarksIndex as BookmarksIndex)[indexKey]) {
    thunkAPI.rejectWithValue(
      new Error(`Index key ${indexKey} does not exist in BookmarksIndex`)
    );
  }

  const bookmarkDocIDsOfIndexKey = (bookmarksIndex as BookmarksIndex)[indexKey];
  const bookmarkDocs = await Promise.all(
    bookmarkDocIDsOfIndexKey.map(ceramic.loadDocument)
  );
  const flattenedBookmarkDocs = bookmarkDocs.map((doc) => flattenDoc(doc));

  thunkAPI.dispatch(bookmarksReceived(flattenedBookmarkDocs));
});

export const fetchBookmarksByDocIDs = createAsyncThunk<
  void,
  { docIDs: string[] },
  { state: State }
>('bookmarks/fetchBookmarksByDocIDs', async (payload, thunkAPI) => {
  const { docIDs } = payload;

  const areDocIDsBookmarks = await Promise.all(
    docIDs.map((docID) => ceramic.isDocIDBookmark(docID))
  );

  if (!areDocIDsBookmarks.every((isDocIDBookmark) => isDocIDBookmark)) {
    thunkAPI.rejectWithValue(new Error(`DocIDs are not Bookmark`));
  }

  const bookmarkDocs = await Promise.all(docIDs.map(ceramic.loadDocument));
  const flattenedBookmarkDocs = bookmarkDocs.map((doc) => flattenDoc(doc));

  thunkAPI.dispatch(bookmarksReceived(flattenedBookmarkDocs));
});

export const addBookmark = createAsyncThunk<
  string,
  {
    bookmarkToAdd: Partial<BookmarkDocContent>;
    bookmarksIndexKey: string;
    makePublic?: boolean;
  },
  { state: State }
>('bookmarks/add', async (payload, thunkAPI) => {
  const authorDID = selectProfileDID(thunkAPI.getState());
  const bookmarksIndex = selectBookmarksIndex(thunkAPI.getState());

  if (!bookmarksIndex) {
    thunkAPI.rejectWithValue(new Error('BookmarksIndexDoc not loaded'));
  }

  if (!(bookmarksIndex as BookmarksIndex)[payload.bookmarksIndexKey]) {
    thunkAPI.rejectWithValue(
      new Error(
        `Index key ${payload.bookmarksIndexKey} does not exist in BookmarksIndex`
      )
    );
  }

  const createdBookmarkDocID = await ceramic.createBookmarkDoc(
    enrichPartialBookmark({
      ...payload.bookmarkToAdd,
      author: authorDID as string,
    })
  );
  const updatedBookmarksIndexDocContent = await ceramic.addBookmarkDocToBookmarksIndex(
    createdBookmarkDocID,
    payload.bookmarksIndexKey
  );

  thunkAPI.dispatch(
    bookmarksIndexReceived({
      ...bookmarksIndex,
      ...updatedBookmarksIndexDocContent,
    })
  );

  if (payload.makePublic) {
    thunkAPI.dispatch(
      publicizeBookmark({ bookmarkDocID: createdBookmarkDocID })
    );
  }

  return createdBookmarkDocID;
});

export const addManyBookmarks = createAsyncThunk<
  string[],
  {
    bookmarksToAdd: Partial<BookmarkDocContent>[];
    bookmarksIndexKey: string;
  },
  { state: State }
>('bookmarks/addMany', async (payload, thunkAPI) => {
  const authorDID = selectProfileDID(thunkAPI.getState());
  const bookmarksIndex = selectBookmarksIndex(thunkAPI.getState());

  if (!bookmarksIndex) {
    thunkAPI.rejectWithValue(new Error('BookmarksIndexDoc not loaded'));
  }

  if (!(bookmarksIndex as BookmarksIndex)[payload.bookmarksIndexKey]) {
    thunkAPI.rejectWithValue(
      new Error(
        `Index key ${payload.bookmarksIndexKey} does not exist in BookmarksIndex`
      )
    );
  }

  const createdBookmarkDocIDs = await Promise.all(
    payload.bookmarksToAdd.map((bookmarkToAdd) =>
      ceramic.createBookmarkDoc(
        enrichPartialBookmark({
          ...bookmarkToAdd,
          author: authorDID as string,
        })
      )
    )
  );

  const updatedBookmarksIndexDocContent = await ceramic.addManyBookmarkDocsToBookmarksIndex(
    createdBookmarkDocIDs,
    payload.bookmarksIndexKey
  );

  thunkAPI.dispatch(
    bookmarksIndexReceived({
      ...bookmarksIndex,
      ...updatedBookmarksIndexDocContent,
    })
  );

  return createdBookmarkDocIDs;
});

export const publicizeBookmark = createAsyncThunk<
  void,
  { bookmarkDocID: string },
  { state: State }
>('bookmarks/add', async (payload, thunkAPI) => {
  const bookmarksIndex = selectBookmarksIndex(thunkAPI.getState());

  if (!bookmarksIndex) {
    thunkAPI.rejectWithValue(new Error('BookmarksIndexDoc not loaded'));
  }

  const updatedBookmarksIndexDocContent = await ceramic.addBookmarkDocToBookmarksIndex(
    payload.bookmarkDocID,
    'public'
  );

  thunkAPI.dispatch(
    bookmarksIndexReceived({
      ...bookmarksIndex,
      ...updatedBookmarksIndexDocContent,
    })
  );
});

export const fetchRecentBookmarksFromRecommender = createAsyncThunk<
  void,
  void,
  { state: State }
>('bookmarks/fetchRecentBookmarksFromRecommender', async (_, thunkAPI) => {
  const recentPublicBookmarks = await getRecentPublicBookmarks();

  thunkAPI.dispatch(recommendedBookmarksReceived(recentPublicBookmarks));
});

export const addEmptyBookmarksIndexKey = createAsyncThunk<
  void,
  { indexKey: string },
  { state: State }
>('bookmarks/addEmptyBookmarksIndexKey', async (payload, thunkAPI) => {
  const did = selectProfileDID(thunkAPI.getState());

  if (!did) {
    thunkAPI.rejectWithValue(new Error('DID not loaded'));
  }

  await ceramic.addEmptyBookmarksIndexKey(did as string, payload.indexKey);

  await thunkAPI.dispatch(fetchBookmarksIndex());
});

export default {
  fetchBookmarksIndex,
  fetchBookmarksOfIndexKey,
  addBookmark,
  publicizeBookmark,
  addEmptyBookmarksIndexKey,
};
