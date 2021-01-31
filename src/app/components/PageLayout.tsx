import React from 'react';

import { SidebarLeft } from './SidebarLeft';

import 'styles/custom.css';
import type { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export function PageLayout(props: Props): JSX.Element {
  return (
    <div className="bg-gray-100 h-full flex flex-row container mx-auto">
      <SidebarLeft />
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
