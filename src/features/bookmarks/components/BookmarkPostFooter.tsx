import React from 'react';

import comment from 'assets/icons/speech-bubble.svg';
import save from 'assets/icons/save.svg';
import userpicPlaceholder from 'assets/icons/userpicPlaceholder.jpg';
import share from 'assets/icons/share.svg';

type Props = {
  author: string;
};

export function BookmarkPostFooter(props: Props): JSX.Element {
  return (
    <div className="flex items-center mt-2">
      <div className="flex hover:bg-grey-lighter p-1 items-center cursor-pointer">
        <img src={comment} alt="Comments" className="h-3 flex-shrink-0" />
        <span className="ml-1 text-xs font-normal text-grey">3k comments</span>
      </div>
      <span className="mx-2">·</span>
      <div className="flex hover:bg-grey-lighter p-1 items-center ml-2 cursor-pointer">
        <img src={share} alt="Share" className="h-3 flex-shrink-0" />
        <span className="ml-1 text-xs font-normal text-grey">120 shares</span>
      </div>
      <span className="mx-2">·</span>
      <div className="flex hover:bg-grey-lighter p-1 items-center ml-2 cursor-pointer">
        <img src={save} alt="Save" className="h-3 flex-shrink-0" />
        <span className="ml-1 text-xs font-normal text-grey">3 saves</span>
      </div>
      <div className="flex hover:bg-grey-lighter p-1 items-center ml-2 rotate-90 cursor-pointer">
        <svg
          className="w-3 fill-current text-grey"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
        </svg>
      </div>
      <div className="flex hover:bg-grey-lighter p-1 items-center ml-2 truncate text-xs font-normal text-grey cursor-pointer">
        <img
          src={userpicPlaceholder}
          title={props.author}
          alt="user"
          className="rounded-full h-6 flex-shrink-0"
        />
      </div>
    </div>
  );
}
