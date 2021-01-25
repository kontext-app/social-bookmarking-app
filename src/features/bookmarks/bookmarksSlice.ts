import {
  createSlice,
  createEntityAdapter,
  EntityState,
} from '@reduxjs/toolkit';
import { enums, schemas } from 'kontext-common';

import { addAsyncMatchers } from 'app/utils/slice';

import {
  BookmarksIndex,
  Bookmark,
  BookmarksCollection,
  BookmarksList,
  BookmarksListsCollection,
  BookmarkFromRecommender,
} from 'features/bookmarks/types';
import type { LoadingStatus } from 'kontext-common';

// TODO: Split up state
export type BookmarksSliceState = {
  bookmarksIndex: EntityState<BookmarksIndex>;
  bookmarks: EntityState<Bookmark>;
  bookmarksCollections: EntityState<BookmarksCollection>;
  bookmarksLists: EntityState<BookmarksList>;
  bookmarksListsCollections: EntityState<BookmarksListsCollection>;
  publicBookmarks: EntityState<BookmarkFromRecommender>;
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

export const publicBookmarksAdapter = createEntityAdapter<BookmarkFromRecommender>(
  {
    selectId: (bookmark) => bookmark.docID,
    sortComparer: (a, b) =>
      Date.parse(b.creationDate) - Date.parse(a.creationDate),
  }
);

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
  publicBookmarks: publicBookmarksAdapter.getInitialState(),
  bookmarksCollections: bookmarksCollectionsAdapter.getInitialState(),
  bookmarksLists: bookmarksListsAdapter.getInitialState(),
  bookmarksListsCollections: bookmarksListsCollectionsAdapter.getInitialState(),
  loadingStatus: enums.LoadingStatus.IDLE,
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
    publicBookmarksReceived: (state, action) => {
      publicBookmarksAdapter.upsertMany(state.publicBookmarks, action.payload);
    },
    bookmarksCollectionUpdated: (state, action) => {
      bookmarksCollectionsAdapter.updateOne(state.bookmarksCollections, {
        id: action.payload.docID,
        changes: { bookmarks: action.payload.bookmarks },
      });
    },
    upVotePublicBookmark: (state, action) => {
      publicBookmarksAdapter.updateOne(state.publicBookmarks, {
        id: action.payload.docID,
        changes: { upVotes: action.payload.upVotes },
      });
    },
    downVotePublicBookmark: (state, action) => {
      publicBookmarksAdapter.updateOne(state.publicBookmarks, {
        id: action.payload.docID,
        changes: { downVotes: action.payload.downVotes },
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
  publicBookmarksReceived,
  bookmarksCollectionUpdated,
  upVotePublicBookmark,
  downVotePublicBookmark,
} = bookmarksSlice.actions;

export default {
  bookmarksSlice,
  bookmarksReducer,
  ...bookmarksSlice.actions,
};
