import React from 'react';

import { BookmarkPostHeader } from 'features/bookmarks/components/BookmarkPostHeader';
import { BookmarkPostBody } from 'features/bookmarks/components/BookmarkPostBody';
import { BookmarkPostFooter } from 'features/bookmarks/components/BookmarkPostFooter';

import type { Bookmark } from 'features/bookmarks/types';

type Props = {
  bookmark: Bookmark;
};

export function BookmarkPost(props: Props): JSX.Element {
  return (
    <div className="px-16 flex flex-col border border-grey-light-alt hover:border-grey rounded bg-white hover:bg-gray-100">
      <BookmarkPostHeader
        url={props.bookmark.url}
        creationDateISO={props.bookmark.creationDate}
      />
      <BookmarkPostBody
        title={props.bookmark.title}
        description={props.bookmark.description}
      />
      <BookmarkPostFooter author={props.bookmark.author} />
    </div>
  );
}
