import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BookmarkPost } from 'features/bookmarks/components/BookmarkPost';

import { selectPublicBookmarkByDocID } from 'features/bookmarks/selectors';
import {
  selectDidUpVoteDocID,
  selectDidDownVoteDocID,
} from 'features/ratings/selectors';
import { addRating } from 'features/ratings/asyncThunks';
import { State } from 'app/store';

type Props = {
  docID: string;
};

export function PublicBookmarkPostContainer(props: Props): JSX.Element | null {
  const dispatch = useDispatch();
  const bookmark = useSelector((state: State) =>
    selectPublicBookmarkByDocID(state, props.docID)
  );

  const didUpVote = useSelector((state: State) =>
    selectDidUpVoteDocID(state, props.docID)
  );
  const didDownVote = useSelector((state: State) =>
    selectDidDownVoteDocID(state, props.docID)
  );

  console.log({ didUpVote, didDownVote, bookmark });

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
    <BookmarkPost
      bookmark={bookmark}
      onClickDownVote={handleClickDownVote}
      onClickUpVote={handleClickUpVote}
      didDownVote={didDownVote}
      didUpVote={didUpVote}
      isPublic
    />
  );
}