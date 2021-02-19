import React from 'react';

import type { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  customClassName?: string;
  title?: string;
};

export function PageLayout(props: Props): JSX.Element {
  return (
    <div
      id="page"
      className={`bg-gray-100 h-full flex flex-col p-2 w-full overflow-y-scroll ${
        props.customClassName || ''
      }`}
    >
      {props.title && <div className="text-lg pt-8 pb-6">{props.title}</div>}
      {props.children}
    </div>
  );
}
