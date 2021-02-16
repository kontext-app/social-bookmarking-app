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
    <nav
      id="nav"
      className="flex flex-row text-gray-700 bg-gray-100 md:flex-col md:min-h-screen md:pt-8"
    >
      <div className="hidden md:flex px-8 py-4 flex-row items-center justify-between">
        <Link to="/">
          <div className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg focus:outline-none focus:shadow-outline">
            Kontext
          </div>
        </Link>
      </div>
      <div className="flex flex-row md:flex-col text-center md:text-left md:block px-4 pb-4 md:pb-0 md:overflow-y-auto w-full justify-between">
        {props.isUserLoggedIn ? (
          <SidebarLeftDropDown />
        ) : (
          <SidebarSection
            sectionLabel="Log In"
            iconSrc={heart}
            linkTo="/login"
            enabled
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
      </div>
    </nav>
  );
}
