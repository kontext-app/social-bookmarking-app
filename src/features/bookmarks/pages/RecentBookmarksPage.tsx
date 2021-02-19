import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PageLayout } from 'app/components/PageLayout';
import { RecommendedBookmarksFeedContainer } from 'features/bookmarks/containers/RecommendedBookmarksFeed';

import { fetchRecentBookmarksFromRecommender } from 'features/bookmarks/asyncThunks';
import { selectRecentRecommendedBookmarkDocIDs } from 'features/bookmarks/selectors';

import { State } from 'app/store';

export function RecentBookmarksPage(): JSX.Element {
  const dispatch = useDispatch();
  const recentRecommendedBookmarkDocIDs = useSelector((state: State) =>
    selectRecentRecommendedBookmarkDocIDs(state)
  );

  useEffect(() => {
    dispatch(fetchRecentBookmarksFromRecommender());
  }, [dispatch]);

  return (
    <PageLayout title="Most recent public bookmarks">
      <RecommendedBookmarksFeedContainer
        bookmarkDocIDs={recentRecommendedBookmarkDocIDs}
      />
    </PageLayout>
  );
}
