import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PageLayout } from 'app/components/PageLayout';
import { BookmarksFeed } from 'features/bookmarks/components/BookmarksFeed';

import { fetchRecentBookmarksFromRecommender } from 'features/bookmarks/asyncThunks';
import { selectRecentRecommendedBookmarkDocIDs } from 'features/bookmarks/selectors';

import { State } from 'app/store';

export function RecentBookmarksPage(): JSX.Element {
  const dispatch = useDispatch();
  const recentPublicBookmarkDocIDs = useSelector((state: State) =>
    selectRecentRecommendedBookmarkDocIDs(state)
  );

  useEffect(() => {
    dispatch(fetchRecentBookmarksFromRecommender());
  }, []);

  return (
    <PageLayout>
      <div className="text-xl">Recent bookmarks</div>
      <BookmarksFeed isPublic bookmarkDocIDs={recentPublicBookmarkDocIDs} />
    </PageLayout>
  );
}
