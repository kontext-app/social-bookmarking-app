import React from 'react';

export function InputWithLabel(props) {
  const {
    containerClassName = '',
    inputClassName = '',
    loading = false,
    label,
    id,
    ...restProps
  } = props;
  return (
    <div className={`mb-2  ${containerClassName}`}>
      {label && (
        <label class="block text-gray-700 text-sm font-bold mb-2" for={id}>
          {label}
        </label>
      )}
      <input
        class={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${inputClassName}`}
        id={id}
        type="text"
        disabled={loading}
        {...restProps}
      />
    </div>
  );
}

export default InputWithLabel;
