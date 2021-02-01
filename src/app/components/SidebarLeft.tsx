import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { SidebarLeftDropDown } from 'app/components/SidebarLeftDropDown';

import { selectBookmarksIndex } from 'features/bookmarks/selectors';
import { RatingsImportSource } from 'app/constants';

import cloud from 'assets/icons/cloud.svg';
import inbox from 'assets/icons/inbox.svg';
import heart from 'assets/icons/heart.svg';
import plus from 'assets/icons/plus.svg';

import type { BookmarksIndex } from 'features/bookmarks/types';

type Section = {
  sectionLabel?: string;
  iconSrc?: string;
  sectionData?: SectionItem[];
  linkTo?: string;
};

function SidebarLeftSection(props: Section) {
  const {
    sectionLabel = '',
    iconSrc = '',
    sectionData = [],
    linkTo = '',
  } = props;

  return (
    <>
      {sectionLabel ? (
        <Link to={linkTo}>
          <img
            src={iconSrc}
            alt="icon"
            className="flex-shrink-0 md:hidden mx-auto mt-2"
          />
          <p className="text-gray-500 block px-4 py-2 text-sm font-semibold">
            {sectionLabel}
          </p>
        </Link>
      ) : null}
      {sectionData.map((item) => (
        <SidebarLeftItem
          key={item.label}
          label={item.label}
          iconSrc={item.iconSrc}
          linkTo={item.linkTo}
          numOfItems={item.numOfItems}
        />
      ))}
    </>
  );
}

export function SidebarLeft(): JSX.Element {
  const bookmarksIndex = useSelector(selectBookmarksIndex);
  const sidebarData = getSidebarData(bookmarksIndex);

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
          {bookmarksIndex ? (
            <SidebarLeftDropDown />
          ) : (
            <SidebarLeftSection
              sectionLabel="Log In"
              iconSrc={heart}
              linkTo="/login"
            />
          )}
          {sidebarData.map((section, i) => (
            <SidebarLeftSection
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

function getSidebarData(bookmarksIndex?: BookmarksIndex): Section[] {
  const sidebarDataOfLoggedOutUser = [
    {
      sectionLabel: 'Explore',
      iconSrc: cloud,
      linkTo: '/explore',
      sectionData: [
        {
          label: 'Recommended',
          iconSrc: cloud,
          linkTo: '/recommended',
        },
        {
          label: 'Popular',
          iconSrc: cloud,
          linkTo: '/popular',
        },
        {
          label: 'Recent',
          iconSrc: cloud,
          linkTo: '/recent',
        },
      ],
    },
  ];

  if (!bookmarksIndex) {
    return sidebarDataOfLoggedOutUser;
  }

  const bookmarksSectionData = [
    {
      label: 'Add bookmark',
      iconSrc: plus,
      linkTo: '/add-bookmark',
    },
    {
      label: 'Inbox',
      iconSrc: inbox,
      linkTo: '/unsorted',
    },
    {
      label: 'Public',
      iconSrc: inbox,
      linkTo: '/public',
    },
  ];

  if (bookmarksIndex[RatingsImportSource.IMDB]) {
    bookmarksSectionData.push({
      label: 'IMDb',
      iconSrc: inbox,
      linkTo: '/imdb',
    });
  }

  // instead of public private, we should show an icon next to each list, indicating if it's `public` or `private`
  const sidebarDataOfLoggedInUser = [
    {
      sectionLabel: 'My Bookmarks',
      iconSrc: cloud,
      linkTo: '/my-bookmarks',
      sectionData: bookmarksSectionData,
    },
    { ...sidebarDataOfLoggedOutUser[0] },
  ];

  return sidebarDataOfLoggedInUser;
}

type SectionItem = {
  label?: string;
  iconSrc?: string;
  numOfItems?: number;
  linkTo?: string;
};

function SidebarLeftItem(props: SectionItem) {
  const { label = '', iconSrc = '', numOfItems = 0, linkTo = '' } = props;
  return (
    <Link to={linkTo} className="hidden md:flex">
      <div className="flex justify-between space-x-2 items-center px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
        <img src={iconSrc} alt="icon" className="flex-shrink-0" />
        <span className="flex-1 font-semibold text-gray-900">{label}</span>
        {/* <span className="flex-shrink-0 text-gray-500">{numOfItems}</span> */}
      </div>
    </Link>
  );
}
