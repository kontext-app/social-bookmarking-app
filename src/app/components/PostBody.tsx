import React from 'react';

type Props = {
  title: string;
  description: string;
};

export function PostBody(props: Props): JSX.Element {
  return (
    <div className="flex flex-col items-start">
      <div>
        <h2 className="font-medium">{props.title}</h2>
      </div>
      <div>
        <p className="font-normal mb-1">{props.description}</p>
      </div>
    </div>
  );
}
