import React from 'react';

import downVote from 'assets/icons/arrow-down.svg';
import upVote from 'assets/icons/arrow-up.svg';

type Props = {
  score: number;
  onClickUpVote: () => void;
  onClickDownVote: () => void;
  didCurrentUserUpVote: boolean;
  didCurrentUserDownVote: boolean;
};

export function UpAndDownVote(props: Props): JSX.Element {
  const score =
    props.score +
    (props.didCurrentUserUpVote ? 1 : 0) -
    (props.didCurrentUserDownVote ? 1 : 0);

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
      <span className="text-xs font-semibold my-1">{score}</span>
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
