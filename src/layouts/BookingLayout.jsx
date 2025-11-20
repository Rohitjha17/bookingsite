/**
 * BookingLayout
 * Main layout for booking flow
 */

import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Header, ProgressBar, CookieConsent } from '@components/common';
import BookingSummary from '@components/booking/BookingSummary';
import { selectServiceType } from '@store/slices/bookingSlice';

const BookingLayout = () => {
  const location = useLocation();
  const serviceType = useSelector(selectServiceType);

  // Show summary after service selection
  const showSummary = serviceType && !location.pathname.includes('/confirmation');

  // Hide progress bar on certain pages
  const hideProgressBar = location.pathname.includes('/confirmation');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {!hideProgressBar && <ProgressBar />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`grid ${showSummary ? 'lg:grid-cols-3' : 'grid-cols-1'} gap-8`}>
          {/* Main Content */}
          <div className={showSummary ? 'lg:col-span-2' : 'col-span-1'}>
            <Outlet />
          </div>

          {/* Booking Summary Sidebar */}
          {showSummary && (
            <div className="lg:col-span-1">
              <BookingSummary />
            </div>
          )}
        </div>
      </div>

      <CookieConsent />
    </div>
  );
};

export default BookingLayout;

