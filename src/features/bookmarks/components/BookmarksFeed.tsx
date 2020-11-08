import React from 'react';

import { BookmarkPost } from './BookmarkPost';

import type { Bookmark } from 'features/bookmarks/types';

type Props = {
  bookmarks: Array<Bookmark>;
};

export function BookmarksFeed(props: Props): JSX.Element {
  return (
    <div className="mx-auto container">
      <div className="flex w-960 mx-auto">
        <div className="w-full">
          <div className="py-2">
            {props.bookmarks.map((bookmark) => (
              <BookmarkPost key={bookmark.docID} bookmark={bookmark} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
