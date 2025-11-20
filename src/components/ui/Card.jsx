/**
 * Card Component
 * General purpose card container
 */

import React from 'react';
import clsx from 'clsx';

const Card = ({
  children,
  className,
  padding = true,
  shadow = true,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'bg-white rounded-lg border border-gray-200',
        padding && 'p-6',
        shadow && 'shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;

