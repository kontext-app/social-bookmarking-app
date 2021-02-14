import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PageLayout } from 'app/components/PageLayout';
import { BookmarksFeedContainer } from 'features/bookmarks/containers/BookmarksFeed';

import { fetchBookmarksOfIndexKey } from 'features/bookmarks/asyncThunks';
import { selectBookmarksIndex } from 'features/bookmarks/selectors';

import { State } from 'app/store';

import type { BookmarksIndex } from 'features/bookmarks/types';

export function UnsortedBookmarksPage(): JSX.Element {
  const dispatch = useDispatch();
  const bookmarksIndex = useSelector<State, BookmarksIndex | undefined>(
    (state) => selectBookmarksIndex(state)
  ) || { unsorted: [] };
  const unsortedBookmarkDocIDs = bookmarksIndex.unsorted;

  useEffect(() => {
    dispatch(fetchBookmarksOfIndexKey({ indexKey: 'unsorted' }));
  }, [dispatch]);

  return (
    <PageLayout>
      <BookmarksFeedContainer bookmarkDocIDs={unsortedBookmarkDocIDs} />
    </PageLayout>
  );
}
