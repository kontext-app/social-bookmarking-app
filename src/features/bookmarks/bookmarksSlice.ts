import {
  createSlice,
  createEntityAdapter,
  EntityState,
} from '@reduxjs/toolkit';

import { addAsyncMatchers } from 'app/utils/slice';
import { LoadingStatus, LoadingStatusType } from 'app/constants/enums';
import { PUBLISHED_SCHEMAS } from 'app/constants/definitions';

import {
  BookmarksIndex,
  Bookmark,
  BookmarksCollection,
  BookmarksList,
  BookmarksListsCollection,
} from 'features/bookmarks/types';

export type BookmarksSliceState = {
  bookmarksIndex: EntityState<BookmarksIndex>;
  bookmarks: EntityState<Bookmark>;
  bookmarksCollections: EntityState<BookmarksCollection>;
  bookmarksLists: EntityState<BookmarksList>;
  bookmarksListsCollections: EntityState<BookmarksListsCollection>;
  loadingStatus: LoadingStatusType;
  error: null | Error;
  lastUpdated: null | number;
};

export const bookmarksIndexAdapter = createEntityAdapter<BookmarksIndex>({
  selectId: (bookmarksIndex) => bookmarksIndex.docID,
});

const bookmarksAdapter = createEntityAdapter<Bookmark>({
  selectId: (bookmark) => bookmark.docID,
  sortComparer: (a, b) =>
    Date.parse(b.creationDate) - Date.parse(a.creationDate),
});

const bookmarksCollectionsAdapter = createEntityAdapter<BookmarksCollection>({
  selectId: (bookmarksCollection) => bookmarksCollection.docID,
});

const bookmarksListsAdapter = createEntityAdapter<BookmarksList>({
  selectId: (bookmarksIndex) => bookmarksIndex.docID,
  sortComparer: (a, b) =>
    Date.parse(b.creationDate) - Date.parse(a.creationDate),
});

const bookmarksListsCollectionsAdapter = createEntityAdapter<
  BookmarksListsCollection
>({
  selectId: (bookmarksCollection) => bookmarksCollection.docID,
});

const initialState: BookmarksSliceState = {
  bookmarksIndex: bookmarksIndexAdapter.getInitialState(),
  bookmarks: bookmarksAdapter.getInitialState(),
  bookmarksCollections: bookmarksCollectionsAdapter.getInitialState(),
  bookmarksLists: bookmarksListsAdapter.getInitialState(),
  bookmarksListsCollections: bookmarksListsCollectionsAdapter.getInitialState(),
  loadingStatus: LoadingStatus.IDLE,
  error: null,
  lastUpdated: null,
};

export const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    bookmarksIndexReceived: (state, action) => {
      bookmarksIndexAdapter.addOne(state.bookmarksIndex, action.payload);
    },
    anyCollectionsReceived: (state, action) => {
      const bookmarksCollections = action.payload.filter(
        (collection: BookmarksCollection) =>
          PUBLISHED_SCHEMAS.Bookmarks === collection.schemaDocID
      );
      const bookmarksListsCollections = action.payload.filter(
        (collection: BookmarksListsCollection) =>
          PUBLISHED_SCHEMAS.BookmarksLists === collection.schemaDocID
      );
      bookmarksCollectionsAdapter.addMany(
        state.bookmarksCollections,
        bookmarksCollections
      );
      bookmarksListsCollectionsAdapter.addMany(
        state.bookmarksListsCollections,
        bookmarksListsCollections
      );
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
} = bookmarksSlice.actions;

export default {
  bookmarksSlice,
  bookmarksReducer,
  ...bookmarksSlice.actions,
};
