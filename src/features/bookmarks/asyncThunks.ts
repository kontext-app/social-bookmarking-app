import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getBookmarksIndexDocContent,
  setDefaultBookmarksIndex,
  hasBookmarksIndex,
  addBookmarkDocToBookmarksDoc,
  getBookmarksIndexDocID,
  loadDocument,
  createBookmarkDoc,
  getSchemaNameByDocID,
} from 'app/apis/ceramic';
import { selectBookmarksIndex } from 'features/bookmarks/selectors';
import { enrichPartialBookmark } from 'features/bookmarks/utils';
import { getProfileDID } from 'features/profile/selectors';

import type {
  BookmarksIndexDoc,
  BookmarksDoc,
  BookmarkDocContent,
  BookmarksIndexData,
  BookmarksIndex,
} from 'features/bookmarks/types';
import type { DefaultBookmarksIndexKeyType } from 'app/constants/enums';
import type { State } from 'app/store';

export const bootstrapBookmarks = createAsyncThunk<
  BookmarksIndexData | null,
  void,
  { state: State }
>('bookmarks/bootstrap', async (payload, thunkAPI) => {
  const hasUserBookmarksIndex = hasBookmarksIndex();

  const bookmarksIndexDocID = hasUserBookmarksIndex
    ? await getBookmarksIndexDocID()
    : await setDefaultBookmarksIndex();

  if (!bookmarksIndexDocID) {
    thunkAPI.rejectWithValue(new Error('BookmarksIndexDocID is null'));
  }

  const bookmarksIndexDoc = await loadDocument(bookmarksIndexDocID as string);
  return {
    [bookmarksIndexDocID as string]: {
      docID: bookmarksIndexDocID,
      ...bookmarksIndexDoc.content,
    },
  };
});

export const addBookmark = createAsyncThunk<
  BookmarksDoc,
  {
    bookmarkToAdd: Partial<BookmarkDocContent>;
    bookmarksIndexKey: 'public' | 'private' | 'unsorted';
  },
  { state: State }
>('bookmarks/add', async (payload, thunkAPI) => {
  const authorDID = getProfileDID(thunkAPI.getState());
  const bookmarksIndex = selectBookmarksIndex(thunkAPI.getState());

  if (!bookmarksIndex) {
    thunkAPI.rejectWithValue(new Error('BookmarksIndexDoc not loaded'));
  }

  const bookmarksIndexKeyDocID = (bookmarksIndex as BookmarksIndex)[
    payload.bookmarksIndexKey
  ];

  if (!bookmarksIndexKeyDocID) {
    thunkAPI.rejectWithValue(new Error('Provided BookmarksIndex key invalid'));
  }

  const addedBookmarkDocID = await createBookmarkDoc(
    enrichPartialBookmark({
      ...payload.bookmarkToAdd,
      author: authorDID as string,
    })
  );

  const updatedBookmarksDoc = await addBookmarkDocToBookmarksDoc(
    addedBookmarkDocID,
    bookmarksIndexKeyDocID
  );

  return updatedBookmarksDoc;
});

export default {
  bootstrapBookmarks,
  addBookmark,
};
