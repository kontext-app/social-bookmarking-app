import { createSelector } from '@reduxjs/toolkit';

import { State } from 'app/store';
import { bookmarksIndexAdapter } from 'features/bookmarks/bookmarksSlice';

import type { LoadingStatusType } from 'app/constants/enums';
import type { BookmarksIndex } from 'features/bookmarks/types';

const bookmarksIndexSelectors = bookmarksIndexAdapter.getSelectors(
  (state: State) => state.bookmarks.bookmarksIndex
);

export function selectBookmarksLoadingStatus(state: State): LoadingStatusType {
  return state.bookmarks.loadingStatus;
}

export function selectBookmarksIndex(state: State): BookmarksIndex | null {
  const [bookmarksIndex] = bookmarksIndexSelectors.selectAll(state);
  return bookmarksIndex;
}
