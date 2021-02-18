import React from 'react';

import { PostFooterLink } from './PostFooterLink';
import { DotMenu } from './DotMenu';

import comment from 'assets/icons/speech-bubble.svg';
import save from 'assets/icons/save.svg';
import userpicPlaceholder from 'assets/icons/userpicPlaceholder.jpg';
import share from 'assets/icons/share.svg';

import type { MainMenuItem } from 'app/components/DotMenu';

type Props = {
  author: string;
  hideSaves?: boolean;
  dotMenuItems: MainMenuItem[];
};

export function PostFooter(props: Props): JSX.Element {
  return (
    <div className="flex items-center mt-2">
      <PostFooterLink iconSrc={comment} label="3k comments" />
      <span className="mx-2">·</span>
      <PostFooterLink iconSrc={share} label="120 shares" />
      {!props.hideSaves && (
        <>
          <span className="mx-2">·</span>
          <PostFooterLink iconSrc={save} label="3 saves" />
        </>
      )}
      <DotMenu menuItems={props.dotMenuItems} />
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
