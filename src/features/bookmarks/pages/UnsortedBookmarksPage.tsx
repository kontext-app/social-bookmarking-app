import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PageLayout } from 'app/components/PageLayout';
import { BookmarksFeed } from 'features/bookmarks/components/BookmarksFeed';

import { fetchBookmarksOfIndexKey } from 'features/bookmarks/asyncThunks';
import { selectBookmarksOfIndexKey } from 'features/bookmarks/selectors';

import { State } from 'app/store';

import type { Bookmark } from 'features/bookmarks/types';

export function UnsortedBookmarksPage(): JSX.Element {
  const dispatch = useDispatch();
  const unsortedBookmarksCollection =
    useSelector<State, Bookmark[]>((state) =>
      selectBookmarksOfIndexKey(state, 'unsorted')
    ) || [];

  useEffect(() => {
    dispatch(fetchBookmarksOfIndexKey({ indexKey: 'unsorted' }));
  }, [dispatch]);

  return (
    <PageLayout>
      <BookmarksFeed
        bookmarkDocIDs={unsortedBookmarksCollection.map(
          (bookmark) => bookmark.docID
        )}
      />
    </PageLayout>
  );
}
