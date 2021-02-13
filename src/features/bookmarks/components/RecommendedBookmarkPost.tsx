import React from 'react';

import { BookmarkPostHeader } from 'features/bookmarks/components/BookmarkPostHeader';
import { BookmarkPostBody } from 'features/bookmarks/components/BookmarkPostBody';
import { BookmarkPostFooter } from 'features/bookmarks/components/BookmarkPostFooter';
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
    <div className="px-16 flex border border-grey-light-alt hover:border-grey rounded bg-white hover:bg-gray-100">
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
        <BookmarkPostHeader
          url={props.recommendedBookmark.url}
          creationDateISO={props.recommendedBookmark.creationDate}
        />
        <BookmarkPostBody
          title={props.recommendedBookmark.title}
          description={props.recommendedBookmark.description}
        />
        <BookmarkPostFooter author={props.recommendedBookmark.author} />
      </div>
    </div>
  );
}
