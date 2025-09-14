import React from 'react';
import PropTypes from 'prop-types';

const CustomTextField = ({
  value,
  onChange,
  placeholder,
  disabled,
  label,
  error,
  helperText,
  className = '',
  ...props
}) => {
  return (
    <div className={`w-full mb-4 ${className}`}>
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full px-4 py-2 rounded-lg border
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'}
          focus:ring-2 outline-none
          text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 transition-all duration-300
          placeholder:text-gray-400 placeholder:opacity-80
          disabled:opacity-100 disabled:bg-gray-100 dark:disabled:bg-gray-700
        `}
        {...props}
      />
      {helperText && (
        <p className={`mt-1 text-xs ${error ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
          {helperText}
        </p>
      )}
    </div>
  );
};

CustomTextField.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  className: PropTypes.string,
};

export default CustomTextField;
