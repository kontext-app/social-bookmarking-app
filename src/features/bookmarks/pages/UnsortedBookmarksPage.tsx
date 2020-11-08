import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PageLayout } from 'app/components/PageLayout';
import { BookmarksFeed } from 'features/bookmarks/components/BookmarksFeed';

import { fetchBookmarksOfCollection } from 'features/bookmarks/asyncThunks';
import {
  selectBookmarksCollectionByIndexKey,
  selectBookmarksOfCollectionDocID,
} from 'features/bookmarks/selectors';

import { State } from 'app/store';

import type { BookmarksCollection, Bookmark } from 'features/bookmarks/types';

export function UnsortedBookmarksPage(): JSX.Element {
  const dispatch = useDispatch();
  const unsortedBookmarksCollection = useSelector<
    State,
    BookmarksCollection | undefined
  >((state) => selectBookmarksCollectionByIndexKey(state, 'unsorted'));
  const unsortedBookmarks = useSelector<State, Array<Bookmark>>((state) =>
    selectBookmarksOfCollectionDocID(state, unsortedBookmarksCollection?.docID)
  );

  useEffect(() => {
    if (typeof unsortedBookmarksCollection !== 'undefined') {
      dispatch(fetchBookmarksOfCollection(unsortedBookmarksCollection.docID));
    }
  }, [unsortedBookmarksCollection]);

  return (
    <PageLayout>
      <BookmarksFeed bookmarks={unsortedBookmarks} />
    </PageLayout>
  );
}
