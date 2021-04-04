import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { enums } from 'kontext-common';

import { CuratedBookmarkPost } from 'features/bookmarks/components/CuratedBookmarkPost';
import { BookmarkPostLoader } from 'features/bookmarks/components/BookmarkPostLoader';

import { fetchBookmarksByDocIDs } from 'features/bookmarks/asyncThunks';
import {
  selectBookmarkByDocID,
  selectBookmarksSearchInput,
} from 'features/bookmarks/selectors';
import { selectAggregatedBookmarkRatingByRatedDocID } from 'features/aggregatedRatings/selectors';
import { useDotMenuItems } from 'features/bookmarks/hooks';
import {
  selectDidUpVoteDocID,
  selectDidDownVoteDocID,
} from 'features/ratings/selectors';
import { addRating } from 'features/ratings/asyncThunks';
import { State } from 'app/store';

import type { Bookmark } from 'features/bookmarks/types';
import type { LoadingStatus } from 'kontext-common';
import type { AppDispatch } from 'app/store';

type Props = {
  docID: string;
  index: number;
};

export function CuratedBookmarkPostContainer(props: Props): JSX.Element | null {
  const dispatch: AppDispatch = useDispatch();
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>(
    enums.LoadingStatus.IDLE
  );

  const bookmark = useSelector((state: State) =>
    selectBookmarkByDocID(state, props.docID)
  );
  const bookmarksSearchInput = useSelector(selectBookmarksSearchInput);
  const dotMenuItems = useDotMenuItems(props.docID);

  const didUpVote = useSelector((state: State) =>
    selectDidUpVoteDocID(state, props.docID)
  );
  const didDownVote = useSelector((state: State) =>
    selectDidDownVoteDocID(state, props.docID)
  );
  const aggregatedRating = useSelector((state: State) =>
    selectAggregatedBookmarkRatingByRatedDocID(state, props.docID)
  );
  const feedEndIndex = useSelector(
    (state: State) => state.bookmarks.feedEndIndex
  );

  useEffect(() => {
    if (
      props.index <= feedEndIndex &&
      loadingStatus === enums.LoadingStatus.IDLE
    ) {
      setLoadingStatus(enums.LoadingStatus.PENDING);
      dispatch(fetchBookmarksByDocIDs({ docIDs: [props.docID] }))
        .then(() => {
          setLoadingStatus(enums.LoadingStatus.FULFILLED);
        })
        .catch(() => setLoadingStatus(enums.LoadingStatus.REJECTED));
    }
  }, [props.index, feedEndIndex, props.docID]);

  const handleClickUpVote = () => {
    if (didUpVote) {
      return;
    }
    dispatch(
      addRating({
        ratingToAdd: {
          ratedDocId: props.docID,
          bestRating: 1,
          worstRating: -1,
          rating: 1,
        },
        ratingsIndexKey: 'bookmarks',
      })
    );
  };

  const handleClickDownVote = () => {
    if (didDownVote) {
      return;
    }
    dispatch(
      addRating({
        ratingToAdd: {
          ratedDocId: props.docID,
          bestRating: 1,
          worstRating: -1,
          rating: -1,
        },
        ratingsIndexKey: 'bookmarks',
      })
    );
  };

  if (loadingStatus === enums.LoadingStatus.IDLE) {
    return null;
  }

  if (loadingStatus === enums.LoadingStatus.PENDING) {
    return <BookmarkPostLoader />;
  }

  if (loadingStatus === enums.LoadingStatus.REJECTED) {
    return null;
  }

  if (!bookmark || !showBookmarkPost(bookmark, bookmarksSearchInput)) {
    return null;
  }

  return (
    <CuratedBookmarkPost
      bookmark={bookmark}
      score={aggregatedRating?.aggregatedRating || 0}
      onClickDownVote={handleClickDownVote}
      onClickUpVote={handleClickUpVote}
      didCurrentUserDownVote={didDownVote}
      didCurrentUserUpVote={didUpVote}
      dotMenuItems={dotMenuItems}
    />
  );
}

function showBookmarkPost(bookmark: Bookmark, searchInput: string) {
  const searchableKeys = ['author', 'description', 'docID', 'title', 'url'];

  for (const searchableKey of searchableKeys) {
    if ((bookmark as any)[searchableKey].includes(searchInput)) {
      return true;
    }
  }

  return false;
}
