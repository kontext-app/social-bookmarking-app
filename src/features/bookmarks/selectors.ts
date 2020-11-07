import { createSelector } from '@reduxjs/toolkit';

import { State } from 'app/store';

import type { LoadingStatusType } from 'app/constants/enums';
import type {
  BookmarksIndexData,
  BookmarksIndex,
} from 'features/bookmarks/types';

export function selectBookmarksLoadingStatus(state: State): LoadingStatusType {
  return state.bookmarks.loadingStatus;
}

export function selectBookmarksIndexData(
  state: State
): BookmarksIndexData | null {
  return state.bookmarks.bookmarksIndexData;
}

export const selectBookmarksIndex = createSelector(
  selectBookmarksIndexData,
  (bookmarksIndexData) => {
    if (!bookmarksIndexData) {
      return null;
    }
    // NOTE: For now assume there is only one bookmarksIndex in store
    const [key] = Object.keys(bookmarksIndexData);
    return bookmarksIndexData[key];
  }
);
