import React from 'react';

import { BookmarkPostContainer } from 'features/bookmarks/containers/BookmarkPost';
import { PublicBookmarkPostContainer } from 'features/bookmarks/containers/PublicBookmarkPost';

import { EntityId } from '@reduxjs/toolkit';

type Props = {
  bookmarkDocIDs: EntityId[];
  isPublic?: boolean;
};

export function BookmarksFeed(props: Props): JSX.Element {
  return (
    <div className="mx-auto container">
      <div className="flex w-960 mx-auto">
        <div className="w-full">
          <div className="py-2">
            {props.bookmarkDocIDs.map((bookmarkDocID) =>
              props.isPublic ? (
                <PublicBookmarkPostContainer
                  key={String(bookmarkDocID)}
                  docID={String(bookmarkDocID)}
                />
              ) : (
                <BookmarkPostContainer
                  key={String(bookmarkDocID)}
                  docID={String(bookmarkDocID)}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
