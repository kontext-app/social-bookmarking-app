import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PageLayout } from 'app/components/PageLayout';
import { BookmarksFeed } from 'features/bookmarks/components/BookmarksFeed';

import { fetchRecentBookmarksFromRecommender } from 'features/bookmarks/asyncThunks';
import { selectRecentPublicBookmarks } from 'features/bookmarks/selectors';
import { addRating } from 'features/ratings/asyncThunks';

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

  const upVoteBookmark = (bookmarkDocID: string) => {
    dispatch(
      addRating({
        ratingToAdd: {
          ratedDocId: bookmarkDocID,
          bestRating: 1,
          worstRating: -1,
          rating: 1,
        },
        ratingsIndexKey: 'bookmarks',
      })
    );
  };

  const downVoteBookmark = (bookmarkDocID: string) => {
    dispatch(
      addRating({
        ratingToAdd: {
          ratedDocId: bookmarkDocID,
          bestRating: 1,
          worstRating: -1,
          rating: -1,
        },
        ratingsIndexKey: 'bookmarks',
      })
    );
  };

  return (
    <PageLayout>
      <div className="text-xl">Recent bookmarks</div>
      <BookmarksFeed
        isPublic
        bookmarks={recentPublicBookmarks}
        onClickDownVote={downVoteBookmark}
        onClickUpVote={upVoteBookmark}
      />
    </PageLayout>
  );
}
