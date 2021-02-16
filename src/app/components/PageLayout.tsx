import React from 'react';

import type { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export function PageLayout(props: Props): JSX.Element {
  return (
    <div
      id="page"
      className="bg-gray-100 h-full flex flex-col p-2 w-full overflow-y-scroll"
    >
      {props.children}
    </div>
  );
}
