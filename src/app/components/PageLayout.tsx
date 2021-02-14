import React from 'react';

import { SidebarLeftContainer } from 'app/containers/SidebarLeft';

import type { ReactNode } from 'react';

import 'styles/custom.css';

type Props = {
  children?: ReactNode;
};

export function PageLayout(props: Props): JSX.Element {
  return (
    <div className="bg-gray-100 h-full flex flex-row container mx-auto">
      <SidebarLeftContainer />
      <div className="w-full">
        <div className="flex justify-center ">
          <div className="text-gray-700 text-center py-2 w-full">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}
