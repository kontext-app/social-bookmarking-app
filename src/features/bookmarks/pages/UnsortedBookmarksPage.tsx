import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { enums } from 'kontext-common';

import { PageLayout } from 'app/components/PageLayout';
import { BookmarksFeedContainer } from 'features/bookmarks/containers/BookmarksFeed';

import { fetchBookmarksOfIndexKey } from 'features/bookmarks/asyncThunks';
import { selectBookmarksIndex } from 'features/bookmarks/selectors';

import { State } from 'app/store';

import type { BookmarksIndex } from 'features/bookmarks/types';

const { DefaultBookmarksIndexKeys } = enums;

export function UnsortedBookmarksPage(): JSX.Element {
  const dispatch = useDispatch();
  const bookmarksIndex = useSelector<State, BookmarksIndex | undefined>(
    (state) => selectBookmarksIndex(state)
  ) || { [DefaultBookmarksIndexKeys.UNSORTED]: [] };
  const unsortedBookmarkDocIDs =
    bookmarksIndex[DefaultBookmarksIndexKeys.UNSORTED];

  useEffect(() => {
    dispatch(
      fetchBookmarksOfIndexKey({
        indexKey: DefaultBookmarksIndexKeys.UNSORTED,
      })
    );
  }, [unsortedBookmarkDocIDs, dispatch]);

  return (
    <PageLayout>
      <div className="text-lg px-16 pt-8 pb-6 bg-white">Inbox</div>
      <BookmarksFeedContainer bookmarkDocIDs={unsortedBookmarkDocIDs} />
    </PageLayout>
  );
}
