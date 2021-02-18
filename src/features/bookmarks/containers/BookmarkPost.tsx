import React from 'react';
import { useSelector } from 'react-redux';

import { BookmarkPost } from 'features/bookmarks/components/BookmarkPost';

import { selectBookmarkByDocID } from 'features/bookmarks/selectors';
import { useDotMenuItems } from 'features/bookmarks/hooks';

import type { State } from 'app/store';

type Props = {
  docID: string;
  isPublic?: boolean;
};

export function BookmarkPostContainer(props: Props): JSX.Element | null {
  const bookmark = useSelector((state: State) =>
    selectBookmarkByDocID(state, props.docID)
  );
  const dotMenuItems = useDotMenuItems(props.docID);

  if (!bookmark) {
    return null;
  }

  return <BookmarkPost bookmark={bookmark} dotMenuItems={dotMenuItems} />;
}
