import { State } from 'app/store';

import type { LoadingStatusType } from 'app/constants/enums';
import type { BookmarksIndexDoc } from 'features/bookmarks/types';

export function selectBookmarksLoadingStatus(state: State): LoadingStatusType {
  return state.bookmarks.loadingStatus;
}

export function selectBookmarksIndexDoc(
  state: State
): BookmarksIndexDoc | null {
  return state.bookmarks.bookmarksIndexDoc;
}
