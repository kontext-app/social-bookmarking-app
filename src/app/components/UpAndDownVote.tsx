import React from 'react';

import downVote from 'assets/icons/arrow-down.svg';
import upVote from 'assets/icons/arrow-up.svg';

type Props = {
  docID: string;
  score: number;
  onClickUpVote: () => any;
  onClickDownVote: () => any;
  didCurrentUserUpVote: boolean;
  didCurrentUserDownVote: boolean;
};

export function UpAndDownVote(props: Props): JSX.Element {
  return (
    <div className="mr-8 my-auto flex flex-col text-center items-center">
      <button
        className={`text-xs ${
          props.didCurrentUserUpVote ? 'bg-green-100' : ''
        }`}
        onClick={props.onClickUpVote}
      >
        <img src={upVote} alt="Favorites" className="flex-shrink-0" />
      </button>
      <span className="text-xs font-semibold my-1">{props.score}</span>
      <button
        className={`text-xs ${
          props.didCurrentUserDownVote ? 'bg-red-100' : ''
        }`}
        onClick={props.onClickDownVote}
      >
        <img src={downVote} alt="Favorites" className="flex-shrink-0" />
      </button>
    </div>
  );
}
