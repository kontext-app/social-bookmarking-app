import { State } from 'app/store';
import {
  bookmarksIndexAdapter,
  bookmarksAdapter,
} from 'features/bookmarks/bookmarksSlice';

import type { LoadingStatus } from 'kontext-common';
import type { BookmarksIndex, Bookmark } from 'features/bookmarks/types';

const bookmarksIndexSelectors = bookmarksIndexAdapter.getSelectors(
  (state: State) => state.bookmarks.bookmarksIndex
);

const bookmarksSelectors = bookmarksAdapter.getSelectors(
  (state: State) => state.bookmarks.bookmarks
);

export function selectBookmarksSearchInput(state: State): string {
  return state.bookmarks.searchInput;
}

export function selectBookmarksLoadingStatus(state: State): LoadingStatus {
  return state.bookmarks.loadingStatus;
}

export function selectBookmarksIndex(state: State): BookmarksIndex | undefined {
  const [bookmarksIndex] = bookmarksIndexSelectors.selectAll(state);
  return bookmarksIndex;
}

export function selectBookmarksOfIndexKey(
  state: State,
  indexKey: string
): Array<Bookmark> {
  const bookmarksIndex = selectBookmarksIndex(state);

  if (!bookmarksIndex || !(bookmarksIndex as BookmarksIndex)[indexKey]) {
    return [];
  }

  const bookmarkDocIDsOfIndexKey = (bookmarksIndex as BookmarksIndex)[indexKey];

  const allBookmarks = bookmarksSelectors.selectAll(state);
  return allBookmarks.filter((bookmark) =>
    bookmarkDocIDsOfIndexKey.includes(bookmark.docID)
  );
}

export function selectBookmarkByDocID(
  state: State,
  docID: string
): Bookmark | undefined {
  return bookmarksSelectors.selectById(state, docID);
}
