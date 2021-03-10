import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PageLayout } from 'app/components/PageLayout';
import { CuratedBookmarksFeedContainer } from 'features/bookmarks/containers/CuratedBookmarksFeed';

import { fetchRecentCuratedBookmarks } from 'features/bookmarks/asyncThunks';
import { selectRecentCuratedBookmarkDocIDs } from 'features/curatedDocs/selectors';

import { State } from 'app/store';

export function RecentBookmarksPage(): JSX.Element {
  const dispatch = useDispatch();
  const recentCuratedBookmarkDocIDs = useSelector((state: State) =>
    selectRecentCuratedBookmarkDocIDs(state)
  );

  console.log(recentCuratedBookmarkDocIDs);

  useEffect(() => {
    dispatch(fetchRecentCuratedBookmarks());
  }, [dispatch]);

  return (
    <PageLayout title="Most recent public bookmarks">
      <CuratedBookmarksFeedContainer
        bookmarkDocIDs={recentCuratedBookmarkDocIDs}
      />
    </PageLayout>
  );
}
