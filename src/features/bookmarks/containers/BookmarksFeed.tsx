import React from 'react';

import { BookmarkPostContainer } from 'features/bookmarks/containers/BookmarkPost';

import { EntityId } from '@reduxjs/toolkit';

type Props = {
  bookmarkDocIDs: EntityId[];
};

export function BookmarksFeedContainer(props: Props): JSX.Element {
  return (
    <div className="mx-auto container">
      <div className="flex w-960 mx-auto">
        <div className="w-full">
          <div className="py-2">
            {props.bookmarkDocIDs.map((bookmarkDocID) => (
              <BookmarkPostContainer
                key={String(bookmarkDocID)}
                docID={String(bookmarkDocID)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
