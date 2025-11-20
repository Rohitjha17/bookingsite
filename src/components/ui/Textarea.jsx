/**
 * Textarea Component
 * Multi-line text input
 */

import React from 'react';
import clsx from 'clsx';

const Textarea = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = false,
  disabled = false,
  rows = 4,
  className,
  ...props
}) => {
  return (
    <div className={clsx('w-full', className)}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={clsx(
          'w-full px-4 py-3 border rounded-lg transition-all',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          'resize-none',
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300',
          disabled && 'bg-gray-100 cursor-not-allowed'
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Textarea;

