import React from 'react';

export function Button(props) {
  const { className = '', loading = false, ...restProps } = props;
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${className} ${
        loading ? 'opacity-50' : ''
      }`}
      disabled={loading}
      {...restProps}
    />
  );
}

export default Button;
