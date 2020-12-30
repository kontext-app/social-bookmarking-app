import { State } from 'app/store';
import {
  bookmarksIndexAdapter,
  bookmarksCollectionsAdapter,
  bookmarksAdapter,
  publicBookmarksAdapter,
} from 'features/bookmarks/bookmarksSlice';

import type { LoadingStatus } from 'kontext-common';
import type {
  BookmarksCollection,
  BookmarksIndex,
  Bookmark,
  BookmarkFromRecommender,
} from 'features/bookmarks/types';

const bookmarksIndexSelectors = bookmarksIndexAdapter.getSelectors(
  (state: State) => state.bookmarks.bookmarksIndex
);

const bookmarksCollectionsSelectors = bookmarksCollectionsAdapter.getSelectors(
  (state: State) => state.bookmarks.bookmarksCollections
);

const bookmarksSelectors = bookmarksAdapter.getSelectors(
  (state: State) => state.bookmarks.bookmarks
);

const publicBookmarksSelectors = publicBookmarksAdapter.getSelectors(
  (state: State) => state.bookmarks.publicBookmarks
);

export function selectBookmarksLoadingStatus(state: State): LoadingStatus {
  return state.bookmarks.loadingStatus;
}

export function selectBookmarksIndex(state: State): BookmarksIndex | undefined {
  const [bookmarksIndex] = bookmarksIndexSelectors.selectAll(state);
  return bookmarksIndex;
}

export function selectBookmarksCollectionByDocID(
  state: State,
  docID: string
): BookmarksCollection | undefined {
  return bookmarksCollectionsSelectors.selectById(state, docID);
}

export function selectBookmarksCollectionByIndexKey(
  state: State,
  indexKey: string
): BookmarksCollection | undefined {
  const bookmarksIndex = selectBookmarksIndex(state);

  if (!bookmarksIndex) {
    return;
  }

  const docID = bookmarksIndex[indexKey];
  return selectBookmarksCollectionByDocID(state, docID);
}

export function selectBookmarksOfCollectionDocID(
  state: State,
  collectionDocID?: string
): Array<Bookmark> {
  if (!collectionDocID) {
    return [];
  }

  const bookmarksCollection = selectBookmarksCollectionByDocID(
    state,
    collectionDocID
  );

  if (!bookmarksCollection) {
    return [];
  }

  return selectBookmarksByDocIDs(state, bookmarksCollection.bookmarks);
}

export function selectBookmarksByDocIDs(
  state: State,
  docIDs: Array<string>
): Array<Bookmark> {
  return bookmarksSelectors
    .selectAll(state)
    .filter((bookmark) => docIDs.includes(bookmark.docID));
}

export function selectRecentPublicBookmarks(
  state: State
): BookmarkFromRecommender[] {
  return publicBookmarksSelectors.selectAll(state);
}
