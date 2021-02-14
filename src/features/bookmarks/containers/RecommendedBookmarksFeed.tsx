import React from 'react';

import { RecommendedBookmarkPostContainer } from 'features/bookmarks/containers/RecommendedBookmarkPost';

import { EntityId } from '@reduxjs/toolkit';

type Props = {
  bookmarkDocIDs: EntityId[];
};

export function RecommendedBookmarksFeedContainer(props: Props): JSX.Element {
  return (
    <div className="mx-auto container">
      <div className="flex w-960 mx-auto">
        <div className="w-full">
          <div className="py-2">
            {props.bookmarkDocIDs.map((bookmarkDocID) => (
              <RecommendedBookmarkPostContainer
                key={bookmarkDocID}
                docID={String(bookmarkDocID)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
