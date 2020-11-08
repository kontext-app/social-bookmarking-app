import { State } from 'app/store';
import {
  bookmarksIndexAdapter,
  bookmarksCollectionsAdapter,
  bookmarksAdapter,
} from 'features/bookmarks/bookmarksSlice';

import type { LoadingStatusType } from 'app/constants/enums';
import type {
  BookmarksCollection,
  BookmarksIndex,
  Bookmark,
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

export function selectBookmarksLoadingStatus(state: State): LoadingStatusType {
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
