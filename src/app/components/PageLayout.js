import React from 'react';

import { SidebarLeft } from './SidebarLeft.js';
import { SidebarRight } from './SidebarRight.js';

import 'styles/custom.css';

export function PageLayout(props) {
  return (
    <div className="bg-gray-100 h-full flex flex-row">
      <SidebarLeft />
      <div className="w-full">
        <div className="flex justify-center ">
          <div className="text-gray-700 text-center py-2 w-full">
            {props.children}
          </div>
        </div>
      </div>
      <SidebarRight />
    </div>
  );
}
