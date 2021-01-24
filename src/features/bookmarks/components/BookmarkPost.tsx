import React from 'react';

import share from 'assets/icons/share.svg';
// import heart from 'assets/icons/heart.svg';
import comment from 'assets/icons/speech-bubble.svg';
import upVote from 'assets/icons/arrow-up.svg';
import downVote from 'assets/icons/arrow-down.svg';
import save from 'assets/icons/save.svg';
import userpicPlaceholder from 'assets/icons/userpicPlaceholder.jpg';

import type {
  Bookmark,
  BookmarkFromRecommender,
} from 'features/bookmarks/types';

type Props = {
  bookmark: Partial<Bookmark> | Partial<BookmarkFromRecommender>;
  onClickUpVote?: (docID: string) => void;
  onClickDownVote?: (docID: string) => void;
  isPublic?: boolean;
  didUpVote?: boolean;
  didDownVote?: boolean;
};

export function BookmarkPost(props: Props): JSX.Element {
  const handleClickUpVote = () => {
    props.onClickUpVote && props.onClickUpVote(props.bookmark.docID as string);
  };

  const handleClickDownVote = () => {
    props.onClickDownVote &&
      props.onClickDownVote(props.bookmark.docID as string);
  };

  const favicon =
    'https://s2.googleusercontent.com/s2/favicons?domain=' + props.bookmark.url;
  /* might need a fallback for icons googleusercontent does not have */

  return (
    <div className="px-16 flex border border-grey-light-alt hover:border-grey rounded bg-white hover:bg-gray-100">
      <div className="m-2">
        <img src={favicon} alt="icon" className="h-4 flex-shrink-0" />
      </div>
      {props.isPublic && (
        <div className="mr-8 my-auto flex flex-col text-center items-center">
          <button
            className={`text-xs ${props.didUpVote ? 'bg-green-100' : ''}`}
            onClick={handleClickUpVote}
          >
            <img src={upVote} alt="Favorites" className="flex-shrink-0" />
          </button>
          <span className="text-xs font-semibold my-1">
            {(props.bookmark as BookmarkFromRecommender).upVotes.length -
              (props.bookmark as BookmarkFromRecommender).downVotes.length}
          </span>
          <button
            className={`text-xs ${props.didDownVote ? 'bg-red-100' : ''}`}
            onClick={handleClickDownVote}
          >
            <img src={downVote} alt="Favorites" className="flex-shrink-0" />
          </button>
        </div>
      )}
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
          {/* <div className="flex hover:bg-grey-lighter p-1 items-center mr-2">
            <img src={heart} alt="Favorites" className="flex-shrink-0" />
          </div> */}
          <div className="flex hover:bg-grey-lighter p-1 items-center cursor-pointer">
            <img src={comment} alt="Comments" className="h-3 flex-shrink-0" />
            <span className="ml-1 text-xs font-normal text-grey">
              3k comments
            </span>
          </div>
          <span className="mx-2">·</span>
          <div className="flex hover:bg-grey-lighter p-1 items-center ml-2 cursor-pointer">
            <img src={share} alt="Share" className="h-3 flex-shrink-0" />
            <span className="ml-1 text-xs font-normal text-grey">
              120 shares
            </span>
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
            {/* {props.bookmark.author} */}
            <img
              src={userpicPlaceholder}
              title={props.bookmark.author}
              alt="user"
              className="rounded-full h-6 flex-shrink-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
