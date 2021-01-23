import React from 'react';

import { BookmarkPost } from './BookmarkPost';

import type { Bookmark } from 'features/bookmarks/types';

type Props = {
  bookmarks: Array<Partial<Bookmark>>;
  isPublic?: boolean;
  onClickUpVote?: (bookmarkDocID: string) => void;
  onClickDownVote?: (bookmarkDocID: string) => void;
};

export function BookmarksFeed(props: Props): JSX.Element {
  return (
    <div className="mx-auto container">
      <div className="flex w-960 mx-auto">
        <div className="w-full">
          <div className="py-2">
            {props.bookmarks.map((bookmark) => (
              <BookmarkPost
                key={bookmark.docID}
                bookmark={bookmark}
                isPublic={props.isPublic}
                onClickDownVote={props.onClickDownVote}
                onClickUpVote={props.onClickUpVote}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
