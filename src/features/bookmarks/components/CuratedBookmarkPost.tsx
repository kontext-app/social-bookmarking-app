import React from 'react';

import { PostHeader } from 'app/components/PostHeader';
import { PostWrapper } from 'app/components/PostWrapper';
import { PostBody } from 'app/components/PostBody';
import { PostFooter } from 'app/components/PostFooter';
import { UpAndDownVote } from 'app/components/UpAndDownVote';

import type { Bookmark } from 'features/bookmarks/types';
import type { MainMenuItem } from 'app/components/DotMenu';

type Props = {
  bookmark: Bookmark;
  score: number;
  onClickUpVote: () => void;
  onClickDownVote: () => void;
  didCurrentUserUpVote: boolean;
  didCurrentUserDownVote: boolean;
  dotMenuItems: MainMenuItem[];
};

export function CuratedBookmarkPost(props: Props): JSX.Element {
  return (
    <PostWrapper>
      <UpAndDownVote
        score={props.score}
        onClickUpVote={props.onClickUpVote}
        onClickDownVote={props.onClickDownVote}
        didCurrentUserUpVote={props.didCurrentUserUpVote}
        didCurrentUserDownVote={props.didCurrentUserDownVote}
      />
      <div className="flex flex-col">
        <PostHeader
          url={props.bookmark.url}
          creationDateISO={props.bookmark.creationDate}
        />
        <PostBody
          title={props.bookmark.title}
          description={props.bookmark.description}
        />
        <PostFooter
          author={props.bookmark.author}
          dotMenuItems={props.dotMenuItems}
        />
      </div>
    </PostWrapper>
  );
}
