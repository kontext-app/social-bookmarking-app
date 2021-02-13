import React from 'react';

type Props = {
  children: JSX.Element[];
  customClasses?: string;
};

export function PostWrapper(props: Props): JSX.Element {
  return (
    <div
      className={`px-16 flex border border-grey-light-alt hover:border-grey rounded bg-white hover:bg-gray-100 ${
        props.customClasses || ''
      }`}
    >
      {props.children}
    </div>
  );
}
