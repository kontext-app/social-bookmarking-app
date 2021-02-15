import React from 'react';
import { Link } from 'react-router-dom';

import { SidebarLeftDropDown } from 'app/components/SidebarLeftDropDown';
import {
  SidebarSection,
  Props as SidebarSectionProps,
} from 'app/components/SidebarSection';

import heart from 'assets/icons/heart.svg';

type Props = {
  isUserLoggedIn?: boolean;
  sections: SidebarSectionProps[];
};

export function SidebarLeft(props: Props): JSX.Element {
  return (
    <div className="md:flex flex-col md:flex-row md:min-h-screen fixed bottom-0 md:pt-8 md:top-0 md:left-0 w-full md:w-6">
      <div
        className="flex flex-col w-full md:w-64 text-gray-700 bg-gray-100 dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0"
        x-data="{ open: false }"
      >
        <div className="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between hidden md:block">
          <Link to="/">
            <div className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">
              Kontext
            </div>
          </Link>
        </div>
        <nav className="flex flex-row md:flex-col text-center md:text-left md:block px-4 pb-4 md:pb-0 md:overflow-y-auto w-full justify-between">
          {props.isUserLoggedIn ? (
            <SidebarLeftDropDown />
          ) : (
            <SidebarSection
              sectionLabel="Log In"
              iconSrc={heart}
              linkTo="/login"
              enabled={true}
            />
          )}
          {props.sections.map((section, i) => (
            <SidebarSection
              key={`section-${i}`}
              sectionLabel={section.sectionLabel}
              sectionData={section.sectionData}
              iconSrc={section.iconSrc}
            />
          ))}
        </nav>
      </div>
    </div>
  );
}
