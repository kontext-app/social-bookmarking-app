import React from 'react';

import { RecommendedBookmarkPostContainer } from 'features/bookmarks/containers/RecommendedBookmarkPost';

import { EntityId } from '@reduxjs/toolkit';

type Props = {
  bookmarkDocIDs: EntityId[];
};

export function RecommendedBookmarksFeedContainer(props: Props): JSX.Element {
  return (
    <>
      {props.bookmarkDocIDs.map((bookmarkDocID) => (
        <RecommendedBookmarkPostContainer
          key={bookmarkDocID}
          docID={String(bookmarkDocID)}
        />
      ))}
    </>
  );
}
