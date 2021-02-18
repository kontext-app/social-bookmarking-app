import React from 'react';

type Props = {
  iconSrc: string;
  label: string;
};

export function PostFooterLink(props: Props): JSX.Element {
  return (
    <div className="flex p-1 items-center cursor-pointer hover:bg-blue-200 ">
      <img src={props.iconSrc} alt="Comments" className="h-3 flex-shrink-0" />
      <span className="ml-1 text-xs font-normal text-grey">{props.label}</span>
    </div>
  );
}
