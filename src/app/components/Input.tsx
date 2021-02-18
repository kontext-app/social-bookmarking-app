import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  inputClassName?: string;
  label?: string;
  id?: string;
  loading?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, Props>(
  (props: Props, ref) => {
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
          <label
            className="flex text-gray-700 text-sm font-bold mb-2"
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${inputClassName}`}
          id={id}
          type="text"
          disabled={loading}
          ref={ref}
          {...restProps}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
