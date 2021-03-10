import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CuratedBookmarkPost } from 'features/bookmarks/components/CuratedBookmarkPost';

import { selectBookmarkByDocID } from 'features/bookmarks/selectors';
import { selectAggregatedBookmarkRatingByRatedDocID } from 'features/aggregatedRatings/selectors';
import { useDotMenuItems } from 'features/bookmarks/hooks';
import {
  selectDidUpVoteDocID,
  selectDidDownVoteDocID,
} from 'features/ratings/selectors';
import { addRating } from 'features/ratings/asyncThunks';
import { State } from 'app/store';

type Props = {
  docID: string;
};

export function CuratedBookmarkPostContainer(props: Props): JSX.Element | null {
  const dispatch = useDispatch();
  const bookmark = useSelector((state: State) =>
    selectBookmarkByDocID(state, props.docID)
  );
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

  if (!bookmark) {
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
