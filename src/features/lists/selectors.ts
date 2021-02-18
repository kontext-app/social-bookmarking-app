import { State } from 'app/store';
import { listsIndexAdapter, listsAdapter } from 'features/lists/listsSlice';

import type { LoadingStatus } from 'kontext-common';
import type { ListsIndex, List } from 'features/lists/types';

const listsIndexSelectors = listsIndexAdapter.getSelectors(
  (state: State) => state.lists.listsIndex
);

const listsSelectors = listsAdapter.getSelectors(
  (state: State) => state.lists.lists
);

export function selectListsLoadingStatus(state: State): LoadingStatus {
  return state.lists.loadingStatus;
}

export function selectListsIndex(state: State): ListsIndex | undefined {
  const [listsIndex] = listsIndexSelectors.selectAll(state);
  return listsIndex;
}

export function selectListsOfIndexKey(
  state: State,
  indexKey: string
): Array<List> {
  const listsIndex = selectListsIndex(state);

  if (!listsIndex || !(listsIndex as ListsIndex)[indexKey]) {
    return [];
  }

  const listDocIDsOfIndexKey = (listsIndex as ListsIndex)[indexKey];

  const allLists = listsSelectors.selectAll(state);
  return allLists.filter((list) => listDocIDsOfIndexKey.includes(list.docID));
}

export function selectListByDocID(
  state: State,
  docID: string
): List | undefined {
  return listsSelectors.selectById(state, docID);
}
