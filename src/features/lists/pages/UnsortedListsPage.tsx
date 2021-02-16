import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PageLayout } from 'app/components/PageLayout';
import { ListsFeedContainer } from 'features/lists/containers/ListsFeed';

import { fetchListsOfIndexKey } from 'features/lists/asyncThunks';
import { selectListsIndex } from 'features/lists/selectors';

import { State } from 'app/store';

import type { ListsIndex } from 'features/lists/types';

export function UnsortedListsPage(): JSX.Element {
  const dispatch = useDispatch();
  const listsIndex = useSelector<State, ListsIndex | undefined>((state) =>
    selectListsIndex(state)
  ) || { unsorted: [] };
  const unsortedListDocIDs = listsIndex.unsorted;

  useEffect(() => {
    dispatch(fetchListsOfIndexKey({ indexKey: 'unsorted' }));
  }, [dispatch]);

  return (
    <PageLayout>
      <ListsFeedContainer listDocIDs={unsortedListDocIDs} />
    </PageLayout>
  );
}
