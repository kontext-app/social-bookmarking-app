import {
  createSlice,
  createEntityAdapter,
  EntityState,
} from '@reduxjs/toolkit';
import { enums } from 'kontext-common';

import { addAsyncMatchers } from 'app/utils/slice';

import { BookmarksIndex, Bookmark } from 'features/bookmarks/types';
import type { LoadingStatus } from 'kontext-common';

export type BookmarksSliceState = {
  bookmarksIndex: EntityState<BookmarksIndex>;
  bookmarks: EntityState<Bookmark>;
  loadingStatus: LoadingStatus;
  error: null | Error;
  lastUpdated: null | number;
};

export const bookmarksIndexAdapter = createEntityAdapter<BookmarksIndex>({
  selectId: (bookmarksIndex) => bookmarksIndex.docID,
});

export const bookmarksAdapter = createEntityAdapter<Bookmark>({
  selectId: (bookmark) => bookmark.docID,
  sortComparer: (a, b) =>
    Date.parse(b.creationDate) - Date.parse(a.creationDate),
});

const initialState: BookmarksSliceState = {
  bookmarksIndex: bookmarksIndexAdapter.getInitialState(),
  bookmarks: bookmarksAdapter.getInitialState(),
  loadingStatus: enums.LoadingStatus.IDLE,
  error: null,
  lastUpdated: null,
};

export const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    bookmarksIndexReceived: (state, action) => {
      bookmarksIndexAdapter.removeAll(state.bookmarksIndex);
      bookmarksIndexAdapter.upsertOne(state.bookmarksIndex, action.payload);
    },
    bookmarksReceived: (state, action) => {
      bookmarksAdapter.upsertMany(state.bookmarks, action.payload);
    },
    // recommendedBookmarksReceived: (state, action) => {
    //   recommendedBookmarksAdapter.upsertMany(
    //     state.recommendedBookmarks,
    //     action.payload
    //   );
    // },
    // upVotePublicBookmark: (state, action) => {
    //   recommendedBookmarksAdapter.updateOne(state.recommendedBookmarks, {
    //     id: action.payload.docID,
    //     changes: { upVotes: action.payload.upVotes },
    //   });
    // },
    // downVotePublicBookmark: (state, action) => {
    //   recommendedBookmarksAdapter.updateOne(state.recommendedBookmarks, {
    //     id: action.payload.docID,
    //     changes: { downVotes: action.payload.downVotes },
    //   });
    // },
  },
  extraReducers: (builder) => {
    addAsyncMatchers(builder, 'bookmarks');
  },
});

export const bookmarksReducer = bookmarksSlice.reducer;

export const {
  bookmarksIndexReceived,
  bookmarksReceived,
  // recommendedBookmarksReceived,
  // upVotePublicBookmark,
  // downVotePublicBookmark,
} = bookmarksSlice.actions;

export default {
  bookmarksSlice,
  bookmarksReducer,
  ...bookmarksSlice.actions,
};
