import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  disabled?: boolean;
}

export function Button(props: Props): JSX.Element {
  const { className = '', loading, disabled, children, ...restProps } = props;
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex flex-row justify-center ${className} ${
        loading || disabled ? 'opacity-50' : ''
      }`}
      disabled={loading || disabled}
      {...restProps}
    >
      {children}
    </button>
  );
}

export default Button;
