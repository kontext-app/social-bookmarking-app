import React from 'react';

type Props = {
  url: string;
  title: string;
  description: string;
  rating: number;
  creationDate: string;
};

export function IMDBPost(props: Props): JSX.Element {
  return (
    <div className="px-16 flex border border-grey-light-alt hover:border-grey rounded bg-white hover:bg-gray-100">
      <div className="mr-8 my-auto flex flex-col text-center items-center">
        <div className="text-xs">Your IMDb Rating:</div>
        <div className="font-medium">{props.rating}</div>
      </div>
      <div className="w-11/12 py-2 text-left">
        <div className="flex items-center text-xs mb-2">
          <div className="text-grey-lighter flex items-center">
            <a href={props.url}>{props.url}</a>
          </div>
          <span className="mx-2">·</span>
          <div className="text-grey-lighter flex items-center">
            {props.creationDate}
          </div>
        </div>
        <div>
          <h2 className="font-medium">{props.title}</h2>
        </div>
        <div>
          <p className="font-normal mb-1">{props.description}</p>
        </div>
      </div>
    </div>
  );
}
