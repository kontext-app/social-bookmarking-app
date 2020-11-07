import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getBookmarksIndexDocContent,
  setDefaultBookmarksIndex,
  hasBookmarksIndex,
  addBookmarkToBookmarksDoc,
} from 'app/apis/ceramic';
import { selectBookmarksIndexDoc } from 'features/bookmarks/selectors';
import { enrichPartialBookmark } from 'features/bookmarks/utils';

import type {
  BookmarksIndexDoc,
  Bookmark,
  BookmarksDoc,
} from 'features/bookmarks/types';
import type { DefaultBookmarksIndexKeyType } from 'app/constants/enums';
import type { State } from 'app/store';

export const bootstrapBookmarks = createAsyncThunk<BookmarksIndexDoc | null>(
  'bookmarks/bootstrap',
  async () => {
    const hasUserBookmarksIndex = hasBookmarksIndex();

    if (!hasUserBookmarksIndex) {
      const newBookmarksIndexDocID = await setDefaultBookmarksIndex();
      console.log(
        'New default bookmarks index created:',
        newBookmarksIndexDocID
      );
    }

    const bookmarksIndexDoc = await getBookmarksIndexDocContent();
    return bookmarksIndexDoc;
  }
);

export const addBookmark = createAsyncThunk<
  BookmarksDoc,
  {
    bookmarkToAdd: Partial<Bookmark>;
    bookmarksIndexKey: DefaultBookmarksIndexKeyType;
  },
  { state: State }
>('bookmarks/add', async (payload, thunkAPI) => {
  const bookmarksIndexDoc = selectBookmarksIndexDoc(thunkAPI.getState());

  if (!bookmarksIndexDoc) {
    thunkAPI.rejectWithValue(new Error('BookmarksIndexDoc not loaded'));
  }

  const bookmarksIndexKeyDocID = (bookmarksIndexDoc as BookmarksIndexDoc)[
    payload.bookmarksIndexKey
  ];

  if (!bookmarksIndexKeyDocID) {
    thunkAPI.rejectWithValue(new Error('Provided BookmarksIndex key invalid'));
  }

  const updatedBookmarksDoc = await addBookmarkToBookmarksDoc(
    bookmarksIndexKeyDocID,
    enrichPartialBookmark(payload.bookmarkToAdd)
  );

  return updatedBookmarksDoc;
});

export default {
  bootstrapBookmarks,
};
