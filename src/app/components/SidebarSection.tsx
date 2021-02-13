import React from 'react';
import { Link } from 'react-router-dom';

export type SectionItem = {
  label?: string;
  iconSrc?: string;
  numOfItems?: number;
  linkTo?: string;
  enabled?: boolean;
};

export type Props = {
  sectionLabel?: string;
  iconSrc?: string;
  sectionData?: SectionItem[];
  linkTo?: string;
  enabled?: boolean;
};

export function SidebarSection(props: Props): JSX.Element {
  const sections = props.sectionData || [];

  return (
    <>
      {props.sectionLabel ? (
        <Link to={props.enabled ? props.linkTo || '' : ''}>
          <img
            src={props.iconSrc}
            alt="icon"
            className="flex-shrink-0 md:hidden mx-auto mt-2"
          />
          <p className="text-gray-500 block px-4 py-2 text-sm font-semibold">
            {props.sectionLabel}
          </p>
        </Link>
      ) : null}
      {sections.map((item) => (
        <SidebarLeftItem
          key={item.label}
          label={item.label}
          iconSrc={item.iconSrc}
          linkTo={item.linkTo}
          enabled={item.enabled}
          numOfItems={item.numOfItems}
        />
      ))}
    </>
  );
}

function SidebarLeftItem(props: SectionItem) {
  const { label = '', iconSrc = '', linkTo = '', enabled = false } = props;
  return (
    <Link
      to={enabled ? linkTo : ''}
      className={`${!enabled && 'cursor-default opacity-25'} hidden md:flex`}
    >
      <div className="flex justify-between space-x-2 items-center px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
        <img src={iconSrc} alt="icon" className="flex-shrink-0" />
        <span className="flex-1 font-semibold text-gray-900">{label}</span>
        {/* <span className="flex-shrink-0 text-gray-500">{numOfItems}</span> */}
      </div>
    </Link>
  );
}
