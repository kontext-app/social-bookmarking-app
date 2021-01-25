import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BookmarkPost } from 'features/bookmarks/components/BookmarkPost';

import { selectBookmarkByDocID } from 'features/bookmarks/selectors';
import { State } from 'app/store';

type Props = {
  docID: string;
  isPublic?: boolean;
};

export function BookmarkPostContainer(props: Props): JSX.Element | null {
  const bookmark = useSelector((state: State) =>
    selectBookmarkByDocID(state, props.docID)
  );

  if (!bookmark) {
    return null;
  }

  return <BookmarkPost bookmark={bookmark} />;
}
