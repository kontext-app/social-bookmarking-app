import { createSlice } from '@reduxjs/toolkit';

import { bootstrapBookmarks, addBookmark } from './asyncThunks';

import { addPendingAndRejectedMatcher } from 'app/utils/slice';
import { LoadingStatus, LoadingStatusType } from 'app/constants/enums';

import type {
  BookmarksIndexDoc,
  BookmarksData,
  BookmarksListsData,
} from 'features/bookmarks/types';

export type BookmarksSliceState = {
  bookmarksIndexDoc: null | BookmarksIndexDoc;
  bookmarksData: BookmarksData;
  bookmarksListsData: BookmarksListsData;
  loadingStatus: LoadingStatusType;
  error: null | Error;
  lastUpdated: null | number;
};

const initialState: BookmarksSliceState = {
  bookmarksIndexDoc: null,
  bookmarksData: {},
  bookmarksListsData: {},
  loadingStatus: LoadingStatus.IDLE,
  error: null,
  lastUpdated: null,
};

export const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    setLastUpdated: (state, action) => {
      state.lastUpdated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(bootstrapBookmarks.fulfilled, (state, action) => {
      state.loadingStatus = LoadingStatus.FULFILLED;
      state.bookmarksIndexDoc = action.payload;
    });
    builder.addCase(addBookmark.fulfilled, (state, action) => {
      state.loadingStatus = LoadingStatus.FULFILLED;
      console.log(action.payload);
    });
    addPendingAndRejectedMatcher(builder, 'bookmarks');
  },
});

export const bookmarksReducer = bookmarksSlice.reducer;

export default {
  bookmarksSlice,
  bookmarksReducer,
  ...bookmarksSlice.actions,
};
