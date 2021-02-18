import React from 'react';
import { DateTime } from 'luxon';

type Props = {
  creationDateISO: string;
  url: string;
};

export function PostHeader(props: Props): JSX.Element {
  const favicon =
    'https://s2.googleusercontent.com/s2/favicons?domain=' + props.url;
  /* might need a fallback for icons googleusercontent does not have */

  return (
    <div className="flex flex-row justify-start">
      <div className="mr-2 my-2">
        <img src={favicon} alt="icon" className="h-4 flex-shrink-0" />
      </div>
      <div className="text-xs text-grey-lighter flex items-center hover:underline">
        <a href={props.url}>{props.url}</a>
      </div>
      <span className="mx-2">·</span>
      <div className="text-xs text-grey-lighter flex items-center">
        {DateTime.fromISO(props.creationDateISO).toRelativeCalendar()}
      </div>
    </div>
  );
}
