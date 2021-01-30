import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { PageLayout } from 'app/components/PageLayout';
import { IMDBFeed } from 'features/import/components/IMDBFeed';

import { selectBookmarksCollectionByIndexKey } from 'features/bookmarks/selectors';
import { fetchBookmarksOfCollection } from 'features/bookmarks/asyncThunks';
import { selectRatingsIndex } from 'features/ratings/selectors';
import { fetchRatingsFromIndexKey } from 'features/ratings/asyncThunks';

import { RatingsImportSource } from 'app/constants';

import type { State } from 'app/store';

export function IMDBRatingsPage(): JSX.Element | null {
  const dispatch = useDispatch();
  const imdbBookmarksCollection = useSelector((state: State) =>
    selectBookmarksCollectionByIndexKey(state, RatingsImportSource.IMDB)
  );
  const ratingsIndex = useSelector(selectRatingsIndex);

  useEffect(() => {
    if (imdbBookmarksCollection) {
      dispatch(fetchBookmarksOfCollection(imdbBookmarksCollection.docID));
    }
  }, [imdbBookmarksCollection]);

  useEffect(() => {
    if (ratingsIndex) {
      dispatch(fetchRatingsFromIndexKey(RatingsImportSource.IMDB));
    }
  }, [ratingsIndex]);

  return (
    <PageLayout>
      {imdbBookmarksCollection ? (
        <IMDBFeed imdbBookmarkDocIDs={imdbBookmarksCollection.bookmarks} />
      ) : null}
    </PageLayout>
  );
}
