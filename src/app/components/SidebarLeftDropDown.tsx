import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getProfileDoc } from 'features/profile/selectors';

import user_icon from 'assets/icons/user_placeholder.svg';

function DropDownItem(props: { linkTo?: string; label?: string }) {
  const { linkTo = '', label = '' } = props;
  return (
    <Link to={linkTo}>
      <div className="flex space-x-2 items-center px-4 py-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
        <svg
          width="18"
          height="18"
          viewBox="0 0 2048 1792"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M480 1280q-66 0-113-47t-47-113v-704q0-66 47-113t113-47h1088q66 0 113 47t47 113v704q0 66-47 113t-113 47h-1088zm-32-864v704q0 13 9.5 22.5t22.5 9.5h1088q13 0 22.5-9.5t9.5-22.5v-704q0-13-9.5-22.5t-22.5-9.5h-1088q-13 0-22.5 9.5t-9.5 22.5zm1376 928h160v96q0 40-47 68t-113 28h-1600q-66 0-113-28t-47-68v-96h1760zm-720 96q16 0 16-16t-16-16h-160q-16 0-16 16t16 16h160z" />
        </svg>
        <span>{label}</span>
      </div>
    </Link>
  );
}

const dropDownData = [
  {
    linkTo: '/profile',
    label: 'Profile',
  },
  {
    linkTo: '/settings',
    label: 'Settings',
  },
  {
    linkTo: '/import',
    label: 'Import Bookmarks',
  },
  {
    linkTo: '/logout',
    label: 'Log out',
  },
];

export function SidebarLeftDropDown() {
  const profileDoc = useSelector(getProfileDoc) || { name: 'Unknown' };

  return (
    <div className="dropdown relative" x-data="{ open: false }">
      <Link to="/profile">
        <button className="flex space-x-2 w-full items-center px-4 py-2 text-sm font-semibold text-gray-900 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
          <img src={user_icon} alt="user_icon" className="" />
          <span>{profileDoc.name}</span>
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            className="inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </Link>
      <div className="dropdown-menu hidden absolute right-0 w-full origin-top-right rounded-md shadow-lg">
        <div className="px-2 py-2 bg-white rounded-md shadow dark-mode:bg-gray-800">
          {dropDownData.map((item) => (
            <DropDownItem
              linkTo={item.linkTo}
              label={item.label}
              key={item.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
