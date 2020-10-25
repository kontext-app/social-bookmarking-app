import React from 'react';
import { Link } from 'react-router-dom';

import { SidebarLeftDropDown } from './SidebarLeftDropDown';

import cloud from './../assets/icons/cloud.svg';
import inbox from './../assets/icons/inbox.svg';
import folder from './../assets/icons/folder.svg';
import heart from './../assets/icons/heart.svg';

function SidebarLeftItem(props) {
  const { label = '', iconSrc = '', numOfItems = '', linkTo = '' } = props;
  return (
    <Link to={linkTo}>
      <div className="flex justify-between space-x-2 items-center px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
        <img src={iconSrc} alt="all bookmarks" className="flex-shrink-0" />
        <span className="flex-1 font-semibold text-gray-900">{label}</span>
        <span className="flex-shrink-0 text-gray-500">{numOfItems}</span>
      </div>
    </Link>
  );
}

function SidebarLeftSection(props) {
  const { sectionLabel = '', sectionData = [], linkTo = '' } = props;

  return (
    <>
      {sectionLabel ? (
        <Link to={linkTo}>
          <p className="text-gray-500 block px-4 py-2 text-sm font-semibold">
            {sectionLabel}
          </p>
        </Link>
      ) : null}
      {sectionData.map((item) => (
        <SidebarLeftItem
          label={item.label}
          iconSrc={item.iconSrc}
          linkTo={item.linkTo}
          numOfItems={item.numOfItems}
        />
      ))}
    </>
  );
}

export function SidebarLeft() {
  const isLoggedIn = false;

  const sidebarData = [
    {
      sectionData: [
        {
          label: 'All bookmarks',
          iconSrc: cloud,
          linkTo: '/',
          numOfItems: 12,
        },
        {
          label: 'Unsorted',
          iconSrc: inbox,
          linkTo: '/',
          numOfItems: 12,
        },
      ],
    },
    {
      sectionLabel: 'My Collections',
      sectionData: [
        {
          label: 'First Collection',
          iconSrc: folder,
          linkTo: '/',
          numOfItems: 12,
        },
      ],
    },
    {
      sectionLabel: 'Filters',
      sectionData: [
        {
          label: 'Favorites',
          iconSrc: heart,
          linkTo: '/',
          numOfItems: 12,
        },
      ],
    },
  ];

  return (
    <div className="md:flex flex-col md:flex-row md:min-h-screen">
      <div
        className="flex flex-col w-full md:w-64 text-gray-700 bg-gray-100 dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0"
        x-data="{ open: false }"
      >
        <div className="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
          <Link to="/">
            <div className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">
              My Bookmarks
            </div>
          </Link>
        </div>
        <nav className="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">
          {isLoggedIn ? (
            <SidebarLeftDropDown />
          ) : (
            <SidebarLeftItem label="Log In" iconSrc={heart} linkTo="/login" />
          )}
          {sidebarData.map((section) => (
            <SidebarLeftSection
              sectionLabel={section.sectionLabel}
              sectionData={section.sectionData}
              key={section.sectionLabel}
            />
          ))}
        </nav>
      </div>
    </div>
  );
}
