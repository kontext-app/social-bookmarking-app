import { State } from 'app/store';
import {
  curatedDocsAdapter,
  curatedDocsIndexAdapter,
} from 'features/curatedDocs/curatedDocsSlice';

import type { LoadingStatus } from 'kontext-common';
import type { CuratedDocs, CuratedDocsIndex } from 'features/curatedDocs/types';

const curatedDocsIndexSelectors = curatedDocsIndexAdapter.getSelectors(
  (state: State) => state.curatedDocs.curatedDocsIndex
);

const curatedDocsSelectors = curatedDocsAdapter.getSelectors(
  (state: State) => state.curatedDocs.curatedDocs
);

export function selectCuratedDocsLoadingStatus(state: State): LoadingStatus {
  return state.curatedDocs.loadingStatus;
}

export function selectCuratedDocsIndex(
  state: State
): CuratedDocsIndex | undefined {
  const [curatedDocsIndex] = curatedDocsIndexSelectors.selectAll(state);
  return curatedDocsIndex;
}

export function selectCuratedDocsByDocID(
  state: State,
  docID: string
): CuratedDocs | undefined {
  return curatedDocsSelectors.selectById(state, docID);
}

export function selectCuratedBookmarkDocs(
  state: State
): CuratedDocs | undefined {
  const allCuratedDocs = curatedDocsSelectors.selectAll(state);
  return allCuratedDocs.find((curated) => curated.indexKey === 'bookmarks');
}

export function selectRecentCuratedBookmarkDocIDs(state: State): string[] {
  const curatedBookmarkDocs = selectCuratedBookmarkDocs(state);

  if (!curatedBookmarkDocs) {
    return [];
  }

  return curatedBookmarkDocs.recent || [];
}
