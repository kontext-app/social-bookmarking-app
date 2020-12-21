import {
  createSlice,
  createEntityAdapter,
  EntityState,
} from '@reduxjs/toolkit';
import { constants, schemas } from 'kontext-common';

import { addAsyncMatchers } from 'app/utils/slice';

import {
  BookmarksIndex,
  Bookmark,
  BookmarksCollection,
  BookmarksList,
  BookmarksListsCollection,
} from 'features/bookmarks/types';
import type { LoadingStatus } from 'kontext-common';

export type BookmarksSliceState = {
  bookmarksIndex: EntityState<BookmarksIndex>;
  bookmarks: EntityState<Bookmark>;
  bookmarksCollections: EntityState<BookmarksCollection>;
  bookmarksLists: EntityState<BookmarksList>;
  bookmarksListsCollections: EntityState<BookmarksListsCollection>;
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

export const bookmarksCollectionsAdapter = createEntityAdapter<BookmarksCollection>(
  {
    selectId: (bookmarksCollection) => bookmarksCollection.docID,
  }
);

export const bookmarksListsAdapter = createEntityAdapter<BookmarksList>({
  selectId: (bookmarksIndex) => bookmarksIndex.docID,
  sortComparer: (a, b) =>
    Date.parse(b.creationDate) - Date.parse(a.creationDate),
});

export const bookmarksListsCollectionsAdapter = createEntityAdapter<BookmarksListsCollection>(
  {
    selectId: (bookmarksCollection) => bookmarksCollection.docID,
  }
);

const initialState: BookmarksSliceState = {
  bookmarksIndex: bookmarksIndexAdapter.getInitialState(),
  bookmarks: bookmarksAdapter.getInitialState(),
  bookmarksCollections: bookmarksCollectionsAdapter.getInitialState(),
  bookmarksLists: bookmarksListsAdapter.getInitialState(),
  bookmarksListsCollections: bookmarksListsCollectionsAdapter.getInitialState(),
  loadingStatus: constants.LoadingStatus.IDLE,
  error: null,
  lastUpdated: null,
};

export const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    bookmarksIndexReceived: (state, action) => {
      bookmarksIndexAdapter.upsertOne(state.bookmarksIndex, action.payload);
    },
    anyCollectionsReceived: (state, action) => {
      const bookmarksCollections = action.payload.filter(
        (collection: BookmarksCollection) =>
          schemas.Bookmarks === collection.schemaDocID
      );
      const bookmarksListsCollections = action.payload.filter(
        (collection: BookmarksListsCollection) =>
          schemas.BookmarksLists === collection.schemaDocID
      );
      bookmarksCollectionsAdapter.upsertMany(
        state.bookmarksCollections,
        bookmarksCollections
      );
      bookmarksListsCollectionsAdapter.upsertMany(
        state.bookmarksListsCollections,
        bookmarksListsCollections
      );
    },
    bookmarksReceived: (state, action) => {
      bookmarksAdapter.upsertMany(state.bookmarks, action.payload);
    },
    bookmarksCollectionUpdated: (state, action) => {
      bookmarksCollectionsAdapter.updateOne(state.bookmarksCollections, {
        id: action.payload.docID,
        changes: { bookmarks: action.payload.bookmarks },
      });
    },
  },
  extraReducers: (builder) => {
    addAsyncMatchers(builder, 'bookmarks');
  },
});

export const bookmarksReducer = bookmarksSlice.reducer;

export const {
  bookmarksIndexReceived,
  anyCollectionsReceived,
  bookmarksReceived,
  bookmarksCollectionUpdated,
} = bookmarksSlice.actions;

export default {
  bookmarksSlice,
  bookmarksReducer,
  ...bookmarksSlice.actions,
};
