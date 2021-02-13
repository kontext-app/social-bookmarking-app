import React from 'react';

import { PostWrapper } from 'app/components/PostWrapper';
import { PostBody } from 'app/components/PostBody';
import { PostHeader } from 'app/components/PostHeader';

type Props = {
  url: string;
  title: string;
  description: string;
  rating: number;
  creationDate: string;
};

export function IMDBPost(props: Props): JSX.Element {
  return (
    <PostWrapper>
      <div className="mr-8 my-auto flex flex-col text-center items-center">
        <div className="text-xs">Your IMDb Rating:</div>
        <div className="font-medium">{props.rating}</div>
      </div>
      <div className="flex flex-col">
        <PostHeader creationDateISO={props.creationDate} url={props.url} />
        <PostBody title={props.title} description={props.description} />
      </div>
    </PostWrapper>
  );
}
