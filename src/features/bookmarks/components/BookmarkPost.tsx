import React from 'react';

import { PostWrapper } from 'app/components/PostWrapper';
import { PostHeader } from 'app/components/PostHeader';
import { PostBody } from 'app/components/PostBody';
import { PostFooter } from 'app/components/PostFooter';

import type { Bookmark } from 'features/bookmarks/types';

type Props = {
  bookmark: Bookmark;
};

export function BookmarkPost(props: Props): JSX.Element {
  return (
    <PostWrapper customClasses="flex-col">
      <PostHeader
        url={props.bookmark.url}
        creationDateISO={props.bookmark.creationDate}
      />
      <PostBody
        title={props.bookmark.title}
        description={props.bookmark.description}
      />
      <PostFooter author={props.bookmark.author} />
    </PostWrapper>
  );
}
