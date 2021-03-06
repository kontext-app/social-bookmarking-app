import React from 'react';

import { CuratedBookmarkPostContainer } from 'features/bookmarks/containers/CuratedBookmarkPost';

import { EntityId } from '@reduxjs/toolkit';

type Props = {
  bookmarkDocIDs: EntityId[];
};

export function CuratedBookmarksFeedContainer(props: Props): JSX.Element {
  return (
    <>
      {props.bookmarkDocIDs.map((bookmarkDocID, i) => (
        <CuratedBookmarkPostContainer
          key={bookmarkDocID}
          index={i}
          docID={String(bookmarkDocID)}
        />
      ))}
    </>
  );
}
