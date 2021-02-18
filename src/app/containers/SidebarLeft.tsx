import React from 'react';
import { useSelector } from 'react-redux';

import { SidebarLeft } from 'app/components/SidebarLeft';

import { RatingsImportSource } from 'app/constants';
import { selectBookmarksIndex } from 'features/bookmarks/selectors';
import { selectProfileIsAuthenticated } from 'features/profile/selectors';

import cloud from 'assets/icons/cloud.svg';
import plus from 'assets/icons/plus.svg';
import inbox from 'assets/icons/inbox.svg';

import type { BookmarksIndex } from 'features/bookmarks/types';
import type { Props as SidebarSectionProps } from 'app/components/SidebarSection';

export function SidebarLeftContainer(): JSX.Element {
  const bookmarksIndex = useSelector(selectBookmarksIndex);
  const isProfileAuthenticated = useSelector(selectProfileIsAuthenticated);

  const sections = isProfileAuthenticated
    ? getSectionsOfAuthenticatedProfile(bookmarksIndex)
    : getSectionsOfUnauthenticatedProfile();

  return (
    <SidebarLeft sections={sections} isUserLoggedIn={isProfileAuthenticated} />
  );
}

function getSectionsOfUnauthenticatedProfile() {
  const sectionsOfUnauthenticatedProfile = [
    {
      sectionLabel: 'Explore',
      iconSrc: cloud,
      linkTo: '/explore',
      sectionData: [
        {
          label: 'Recent',
          iconSrc: cloud,
          linkTo: '/recent',
          enabled: true,
        },
        {
          label: 'Popular',
          iconSrc: cloud,
          linkTo: '/popular',
          enabled: false,
        },
        {
          label: 'Recommended',
          iconSrc: cloud,
          linkTo: '/recommended',
          enabled: false,
        },
      ],
    },
  ];
  return sectionsOfUnauthenticatedProfile;
}

function getSectionsOfAuthenticatedProfile(
  bookmarksIndex?: BookmarksIndex
): SidebarSectionProps[] {
  const sectionsOfUnauthenticatedProfile = getSectionsOfUnauthenticatedProfile();

  if (!bookmarksIndex) {
    return sectionsOfUnauthenticatedProfile;
  }

  const bookmarksSectionData = [
    {
      label: 'Add bookmark',
      iconSrc: plus,
      linkTo: '/add-bookmark',
      enabled: true,
    },
    {
      label: 'Inbox',
      iconSrc: inbox,
      linkTo: '/unsorted',
      enabled: true,
    },
  ];

  if (bookmarksIndex[RatingsImportSource.IMDB]) {
    bookmarksSectionData.push({
      label: 'IMDb',
      iconSrc: inbox,
      linkTo: '/imdb',
      enabled: true,
    });
  }

  const sectionsOfAuthenticatedProfile = [
    {
      sectionLabel: 'My Bookmarks',
      iconSrc: cloud,
      linkTo: '/my-bookmarks',
      sectionData: bookmarksSectionData,
      enabled: true,
    },
    {
      sectionLabel: 'My Lists',
      iconSrc: cloud,
      linkTo: '/my-lists',
      sectionData: [
        {
          label: 'Add list',
          iconSrc: plus,
          linkTo: '/add-list',
          enabled: true,
        },
        {
          label: 'Inbox',
          iconSrc: inbox,
          linkTo: '/lists/unsorted',
          enabled: true,
        },
      ],
    },
    ...sectionsOfUnauthenticatedProfile,
  ];

  return sectionsOfAuthenticatedProfile;
}
