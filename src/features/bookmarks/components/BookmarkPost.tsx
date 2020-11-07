import React from 'react';
// import ProfileHover from 'profile-hover';

import share from 'assets/icons/share.svg';
import heart from 'assets/icons/heart.svg';
import comment from 'assets/icons/speech-bubble.svg';
import upvote from 'assets/icons/arrow-up.svg';
import downvote from 'assets/icons/arrow-down.svg';
import save from 'assets/icons/save.svg';

type Props = {
  authorAddress?: string;
};

export function BookmarkPost(props: Props): JSX.Element {
  return (
    <div className="px-16 flex border border-grey-light-alt hover:border-grey rounded bg-white hover:bg-gray-100 cursor-pointer">
      <div className="mr-8 my-auto flex flex-col text-center items-center">
        <button className="text-xs">
          <img src={upvote} alt="Favorites" className="flex-shrink-0" />
        </button>
        <span className="text-xs font-semibold my-1">20k</span>
        <button className="text-xs">
          <img src={downvote} alt="Favorites" className="flex-shrink-0" />
        </button>
      </div>
      <div className="w-11/12 pt-2 text-left">
        <div className="flex items-center text-xs mb-2">
          <div className="font-semibold no-underline hover:underline text-black flex items-center">
            <svg
              className="rounded-full border h-5 w-5"
              viewBox="0 0 16 16"
              version="1.1"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              ></path>
            </svg>
            <span className="ml-2">github.com</span>
          </div>
          <span className="text-grey-light mx-1 text-xs">•</span>
          <span className="text-grey">Posted by</span>
          <div className="text-grey mx-1 no-underline hover:underline">
            <div>
              {/* <ProfileHover address={props.authorAddress} showName={true} /> */}
            </div>
          </div>
          <span className="text-grey">2 hours ago</span>
        </div>
        <div>
          <h2 className="font-medium mb-1">unknown</h2>
        </div>
        <div className="flex items-center my-1">
          <div className="flex hover:bg-grey-lighter p-1 mr-2">
            <img src={heart} alt="Favorites" className="flex-shrink-0" />
          </div>
          <div className="flex hover:bg-grey-lighter p-1">
            <img src={comment} alt="Comments" className="flex-shrink-0" />
            <span className="ml-1 text-xs font-normal text-grey">
              3k comments
            </span>
          </div>
          <div className="flex hover:bg-grey-lighter p-1 ml-2">
            <img src={share} alt="Share" className="flex-shrink-0" />
            <span className="ml-1 text-xs font-normal text-grey">
              120 shares
            </span>
          </div>
          <div className="flex hover:bg-grey-lighter p-1 ml-2">
            <img src={save} alt="Save" className="flex-shrink-0" />
            <span className="ml-1 text-xs font-normal text-grey">3 saves</span>
          </div>
          <div className="flex hover:bg-grey-lighter p-1 ml-2 rotate-90">
            <svg
              className="w-3 fill-current text-grey"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
