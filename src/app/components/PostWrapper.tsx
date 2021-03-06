import React from 'react';

type Props = {
  children: JSX.Element | JSX.Element[];
  customClasses?: string;
};

export function PostWrapper(props: Props): JSX.Element {
  return (
    <div
      className={`py-4 px-8 mb-4 shadow-default rounded-lg flex border border-grey-light-alt hover:border-grey bg-white hover:bg-gray-100 ${
        props.customClasses || ''
      }`}
    >
      {props.children}
    </div>
  );
}
