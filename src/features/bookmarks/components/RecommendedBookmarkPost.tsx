import React from 'react';

import { PostHeader } from 'app/components/PostHeader';
import { PostWrapper } from 'app/components/PostWrapper';
import { PostBody } from 'app/components/PostBody';
import { PostFooter } from 'app/components/PostFooter';
import { UpAndDownVote } from 'app/components/UpAndDownVote';

import type { BookmarkFromRecommender } from 'features/bookmarks/types';

type Props = {
  recommendedBookmark: BookmarkFromRecommender;
  onClickUpVote: () => void;
  onClickDownVote: () => void;
  didCurrentUserUpVote: boolean;
  didCurrentUserDownVote: boolean;
};

export function RecommendedBookmarkPost(props: Props): JSX.Element {
  return (
    <PostWrapper>
      <UpAndDownVote
        docID={props.recommendedBookmark.docID}
        score={
          props.recommendedBookmark.upVotes.length -
          props.recommendedBookmark.downVotes.length
        }
        onClickUpVote={props.onClickUpVote}
        onClickDownVote={props.onClickDownVote}
        didCurrentUserUpVote={props.didCurrentUserUpVote}
        didCurrentUserDownVote={props.didCurrentUserDownVote}
      />
      <div className="flex flex-col">
        <PostHeader
          url={props.recommendedBookmark.url}
          creationDateISO={props.recommendedBookmark.creationDate}
        />
        <PostBody
          title={props.recommendedBookmark.title}
          description={props.recommendedBookmark.description}
        />
        <PostFooter author={props.recommendedBookmark.author} />
      </div>
    </PostWrapper>
  );
}
