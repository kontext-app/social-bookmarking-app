import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectProfileDoc } from 'features/profile/selectors';
import { useComponentVisible } from 'app/hooks/useIsComponentVisible';
import { logout } from 'features/profile/profileSlice';

import user_icon from 'assets/icons/user_placeholder.svg';

export function SidebarLeftDropDown(): JSX.Element {
  const {
    setIsComponentVisible,
    isComponentVisible,
    ref,
  } = useComponentVisible<HTMLDivElement>(false);
  const profileDoc = useSelector(selectProfileDoc) || { name: 'Unknown' };
  const dispatch = useDispatch();
  const history = useHistory();

  const dropDownData = [
    {
      onClick: () => history.push('/profile/my'),
      label: 'Profile',
    },
    {
      onClick: () => history.push('/settings'),
      label: 'Settings',
    },
    {
      onClick: () => {
        dispatch(logout());
        history.push('/');
      },
      label: 'Log out',
    },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsComponentVisible(!isComponentVisible)}
        className="flex flex-row space-x-2 w-full items-center px-4 py-3 my-1 text-sm font-semibold text-gray-900 rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
      >
        <img src={user_icon} alt="user_icon" className="" />
        <span className="px-4 py-2 md:p-0">{profileDoc.name}</span>
        <svg
          fill="currentColor"
          viewBox="0 0 20 20"
          className="flex w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform align-middle"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      {isComponentVisible && (
        <div className="absolute right-0 w-full origin-top-right rounded-md shadow-lg px-2 py-2 bg-white shadow z-10">
          {dropDownData.map((item) => (
            <DropDownItem
              label={item.label}
              key={item.label}
              onClick={() => {
                setIsComponentVisible(false);
                item.onClick();
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function DropDownItem(props: { label?: string; onClick: () => any }) {
  const { label = '', onClick } = props;
  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex space-x-2 items-center px-4 py-2 text-sm font-semibold rounded-lg mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
    >
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
  );
}
