import React, { useState } from 'react';

import share from 'assets/icons/share.svg';
import heart from 'assets/icons/heart.svg';
import comment from 'assets/icons/speech-bubble.svg';
import upVote from 'assets/icons/arrow-up.svg';
import downVote from 'assets/icons/arrow-down.svg';
import save from 'assets/icons/save.svg';
//import favicon from 'assets/icons/favicon.svg';

import type { Bookmark } from 'features/bookmarks/types';

type Props = {
  bookmark: Bookmark;
};

export function BookmarkPost(props: Props): JSX.Element {
  const [upVotes, setUpVotes] = useState(0);
  const [downVotes, setDownVotes] = useState(0);
  const favicon = 'https://s2.googleusercontent.com/s2/favicons?domain=' + props.bookmark.url;


  return (
    <div className="px-16 flex border border-grey-light-alt hover:border-grey rounded bg-white hover:bg-gray-100 cursor-pointer">
      <div className="m-2">
        <img src={favicon} alt="icon" className="h-4 flex-shrink-0" />
      </div>
      {/*<div className="mr-8 my-auto flex flex-col text-center items-center">
        <button className="text-xs" onClick={() => setUpVotes(upVotes + 1)}>
          <img src={upVote} alt="Favorites" className="flex-shrink-0" />
        </button>
        <span className="text-xs font-semibold my-1">
          {upVotes - downVotes}
        </span>
        <button className="text-xs" onClick={() => setDownVotes(downVotes + 1)}>
          <img src={downVote} alt="Favorites" className="flex-shrink-0" />
        </button>
      </div>*/}
      <div className="w-11/12 py-2 text-left">
        <div className="flex items-center text-xs mb-2">
          <div className="text-grey-lighter flex items-center">
            <a href={props.bookmark.url}>{props.bookmark.url}</a>
          </div>
          <span className="mx-2">·</span>
          <div className="text-grey-lighter flex items-center">
            {props.bookmark.creationDate}
          </div>
        </div>
        {/*<div className="flex items-center text-xs mb-2">
          <span className="text-grey">Posted by</span>
          <div className="text-grey mx-1 no-underline hover:underline max-w-xs truncate">
            {props.bookmark.author}
          </div>
          <span className="text-grey">{props.bookmark.creationDate}</span>
        </div>*/}
        <div>
          <h2 className="font-medium">{props.bookmark.title}</h2>
        </div>
        <div>
          <p className="font-normal mb-1">{props.bookmark.description}</p>
        </div>
        <div className="flex items-center mt-2">
          {/*<div className="flex hover:bg-grey-lighter p-1 items-center mr-2">
            <img src={heart} alt="Favorites" className="flex-shrink-0" />
          </div>*/}
          <div className="flex hover:bg-grey-lighter p-1 items-center">
            <img src={comment} alt="Comments" className="h-3 flex-shrink-0" />
            <span className="ml-1 text-xs font-normal text-grey">
              3k comments
            </span>
          </div>
          <span className="mx-2">·</span>
          <div className="flex hover:bg-grey-lighter p-1 items-center ml-2">
            <img src={share} alt="Share" className="h-3 flex-shrink-0" />
            <span className="ml-1 text-xs font-normal text-grey">
              120 shares
            </span>
          </div>
          <span className="mx-2">·</span>
          <div className="flex hover:bg-grey-lighter p-1 items-center ml-2">
            <img src={save} alt="Save" className="h-3 flex-shrink-0" />
            <span className="ml-1 text-xs font-normal text-grey">3 saves</span>
          </div>
          <div className="flex hover:bg-grey-lighter p-1 items-center ml-2 rotate-90">
            <svg
              className="w-3 fill-current text-grey"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
            </svg>
          </div>
          <div className="flex hover:bg-grey-lighter p-1 items-center ml-2 truncate text-xs font-normal text-grey">
            {props.bookmark.author}
          </div>
        </div>
      </div>
    </div>
  );
}
