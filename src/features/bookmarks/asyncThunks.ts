import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getBookmarksIndexDocContent,
  setDefaultBookmarksIndex,
  hasBookmarksIndex,
} from 'app/apis/ceramic';

import type { BookmarksIndexDoc } from 'features/bookmarks/types';

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

export default {
  bootstrapBookmarks,
};
