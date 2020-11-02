import React from 'react';

export function Button(props) {
  const { className = '', loading, disabled, ...restProps } = props;
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${className} ${
        loading || disabled ? 'opacity-50' : ''
      }`}
      disabled={loading || disabled}
      {...restProps}
    />
  );
}

export default Button;
