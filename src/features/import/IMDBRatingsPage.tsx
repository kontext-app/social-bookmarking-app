import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { PageLayout } from 'app/components/PageLayout';
import { IMDBFeed } from 'features/import/components/IMDBFeed';

import { selectBookmarksIndex } from 'features/bookmarks/selectors';
import { fetchBookmarksOfIndexKey } from 'features/bookmarks/asyncThunks';
import { selectRatingsIndex } from 'features/ratings/selectors';
import { fetchRatingsFromIndexKey } from 'features/ratings/asyncThunks';

import { RatingsImportSource } from 'app/constants';

import type { State } from 'app/store';

export function IMDBRatingsPage(): JSX.Element | null {
  const dispatch = useDispatch();
  const bookmarksIndex = useSelector((state: State) =>
    selectBookmarksIndex(state)
  );
  const ratingsIndex = useSelector(selectRatingsIndex);

  const imdbBookmarkDocIDs = bookmarksIndex
    ? bookmarksIndex[RatingsImportSource.IMDB]
    : [];

  useEffect(() => {
    if (imdbBookmarkDocIDs.length) {
      dispatch(
        fetchBookmarksOfIndexKey({ indexKey: RatingsImportSource.IMDB })
      );
    }
  }, [dispatch, imdbBookmarkDocIDs]);

  useEffect(() => {
    if (ratingsIndex) {
      dispatch(fetchRatingsFromIndexKey(RatingsImportSource.IMDB));
    }
  }, [dispatch, ratingsIndex]);

  return (
    <PageLayout title="Your imported IMDb ratings">
      {imdbBookmarkDocIDs.length ? (
        <IMDBFeed imdbBookmarkDocIDs={imdbBookmarkDocIDs} />
      ) : null}
    </PageLayout>
  );
}
