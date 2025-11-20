/**
 * SelectionCard Component
 * Card for selecting options (services, bedrooms, etc.)
 */

import React from 'react';
import clsx from 'clsx';

const SelectionCard = ({
  selected = false,
  onClick,
  children,
  className,
  disabled = false,
  icon,
  title,
  subtitle,
  badge,
}) => {
  return (
    <div
      className={clsx(
        'selection-card p-6 cursor-pointer transition-all',
        'bg-white border rounded-lg',
        'hover:shadow-md',
        selected
          ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-600'
          : 'border-gray-200 hover:border-primary-300',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={disabled ? undefined : onClick}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
          onClick?.();
        }
      }}
    >
      {badge && (
        <div className="absolute top-2 right-2">
          <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
            {badge}
          </span>
        </div>
      )}

      {icon && (
        <div className="mb-3 text-4xl">
          {typeof icon === 'string' ? icon : icon}
        </div>
      )}

      {title && (
        <h3 className={clsx(
          'text-lg font-semibold mb-1',
          selected ? 'text-primary-700' : 'text-gray-900'
        )}>
          {title}
        </h3>
      )}

      {subtitle && (
        <p className="text-sm text-gray-600 mb-2">
          {subtitle}
        </p>
      )}

      {children}
    </div>
  );
};

export default SelectionCard;

