import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  inputClassName?: string;
  placeholder?: string;
  id?: string;
  loading?: boolean;
}

export function InputWithPlaceholder(props: Props) {
  const {
    containerClassName = '',
    inputClassName = '',
    loading = false,
    placeholder,
    id,
    ...restProps
  } = props;
  return (
    <div className={`mb-2  ${containerClassName}`}>
      <input
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder-gray-600 ${inputClassName}`}
        id={id}
        type="text"
        placeholder={placeholder}
        disabled={loading}
        {...restProps}
      />
    </div>
  );
}

export default InputWithPlaceholder;
