import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { enums } from 'kontext-common';

import { PageLayout } from 'app/components/PageLayout';
import { ListsFeedContainer } from 'features/lists/containers/ListsFeed';

import { fetchListsOfIndexKey } from 'features/lists/asyncThunks';
import { selectListsIndex } from 'features/lists/selectors';

import { State } from 'app/store';

import type { ListsIndex } from 'features/lists/types';

const { DefaultListsIndexKeys } = enums;

export function UnsortedListsPage(): JSX.Element {
  const dispatch = useDispatch();
  const listsIndex = useSelector<State, ListsIndex | undefined>((state) =>
    selectListsIndex(state)
  ) || { [DefaultListsIndexKeys.UNSORTED]: [] };
  const unsortedListDocIDs = listsIndex[DefaultListsIndexKeys.UNSORTED];

  useEffect(() => {
    dispatch(
      fetchListsOfIndexKey({ indexKey: DefaultListsIndexKeys.UNSORTED })
    );
  }, [unsortedListDocIDs, dispatch]);

  return (
    <PageLayout title="Lists Inbox">
      <ListsFeedContainer listDocIDs={unsortedListDocIDs} />
    </PageLayout>
  );
}
