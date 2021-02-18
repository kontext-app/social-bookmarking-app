import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RecommendedBookmarkPost } from 'features/bookmarks/components/RecommendedBookmarkPost';

import { selectRecommendedBookmarkByDocID } from 'features/bookmarks/selectors';
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

export function RecommendedBookmarkPostContainer(
  props: Props
): JSX.Element | null {
  const dispatch = useDispatch();
  const bookmark = useSelector((state: State) =>
    selectRecommendedBookmarkByDocID(state, props.docID)
  );
  const dotMenuItems = useDotMenuItems(props.docID);

  const didUpVote = useSelector((state: State) =>
    selectDidUpVoteDocID(state, props.docID)
  );
  const didDownVote = useSelector((state: State) =>
    selectDidDownVoteDocID(state, props.docID)
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
    <RecommendedBookmarkPost
      recommendedBookmark={bookmark}
      onClickDownVote={handleClickDownVote}
      onClickUpVote={handleClickUpVote}
      didCurrentUserDownVote={didDownVote}
      didCurrentUserUpVote={didUpVote}
      dotMenuItems={dotMenuItems}
    />
  );
}
