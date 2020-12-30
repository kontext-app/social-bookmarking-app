import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PageLayout } from 'app/components/PageLayout';
import { BookmarksFeed } from 'features/bookmarks/components/BookmarksFeed';

import { fetchRecentBookmarksFromRecommender } from 'features/bookmarks/asyncThunks';
import { selectRecentPublicBookmarks } from 'features/bookmarks/selectors';

import { State } from 'app/store';

import type { BookmarkFromRecommender } from 'features/bookmarks/types';

export function RecentBookmarksPage(): JSX.Element {
  const dispatch = useDispatch();
  const recentPublicBookmarks = useSelector<State, BookmarkFromRecommender[]>(
    (state) => selectRecentPublicBookmarks(state)
  );

  useEffect(() => {
    dispatch(fetchRecentBookmarksFromRecommender());
  }, []);

  return (
    <PageLayout>
      <div className="text-xl">Recent bookmarks</div>
      <BookmarksFeed bookmarks={recentPublicBookmarks} />
    </PageLayout>
  );
}
