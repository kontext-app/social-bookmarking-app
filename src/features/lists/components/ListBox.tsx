import React from 'react';
import { DateTime } from 'luxon';

import { PostBody } from 'app/components/PostBody';
import { PostFooter } from 'app/components/PostFooter';

import type { MainMenuItem } from 'app/components/DotMenu';

type Props = {
  title: string;
  description: string;
  numOfItems: number;
  author: string;
  creationDateISO: string;
  onClick: () => any;
  dotMenuItems: MainMenuItem[];
};

export function ListBox(props: Props): JSX.Element {
  return (
    <div
      className="p-2 bg-white rounded-default shadow-default h-64 flex flex-col justify-between hover:bg-gray-100 cursor-pointer"
      onClick={props.onClick}
    >
      <div className="text-xs text-grey-lighter flex items-center">
        {props.numOfItems} item/s
        <span className="mx-2">·</span>
        created by you{' '}
        {DateTime.fromISO(props.creationDateISO).toRelativeCalendar()}
      </div>
      <PostBody title={props.title} description={props.description} />
      <PostFooter
        hideSaves
        author={props.author}
        dotMenuItems={props.dotMenuItems}
      />
    </div>
  );
}
