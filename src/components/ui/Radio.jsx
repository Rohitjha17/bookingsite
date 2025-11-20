/**
 * Radio Component
 * Reusable radio button
 */

import React from 'react';
import clsx from 'clsx';

const Radio = ({
  label,
  checked,
  onChange,
  name,
  value,
  disabled = false,
  className,
}) => {
  return (
    <label
      className={clsx(
        'flex items-center cursor-pointer',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-5 h-5 text-primary-600 border-gray-300 focus:ring-primary-500 focus:ring-2 cursor-pointer"
      />
      {label && (
        <span className="ml-3 text-sm text-gray-700">
          {label}
        </span>
      )}
    </label>
  );
};

export default Radio;

