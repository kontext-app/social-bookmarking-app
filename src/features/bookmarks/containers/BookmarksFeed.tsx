import React from 'react';

import { BookmarkPostContainer } from 'features/bookmarks/containers/BookmarkPost';

import { EntityId } from '@reduxjs/toolkit';

type Props = {
  bookmarkDocIDs: EntityId[];
};

export function BookmarksFeedContainer(props: Props): JSX.Element {
  return (
    <>
      {props.bookmarkDocIDs.map((bookmarkDocID) => (
        <BookmarkPostContainer
          key={String(bookmarkDocID)}
          docID={String(bookmarkDocID)}
        />
      ))}
    </>
  );
}
