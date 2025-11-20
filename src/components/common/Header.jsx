/**
 * Header Component
 * Main header with logo
 */

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold">
              <span className="text-primary-600">ND</span>
              <span className="text-gray-700">Cleaners</span>
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

