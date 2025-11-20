/**
 * BookingSummary Component
 * Displays booking summary in the sidebar
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { selectBooking } from '@store/slices/bookingSlice';
import {
  SERVICE_OPTIONS,
  BEDROOM_OPTIONS,
  BATHROOM_OPTIONS,
  EXTRAS,
  FREQUENCY_OPTIONS,
} from '@constants';
import { formatPrice } from '@utils/pricing';
import { formatDateDisplay, formatTimeDisplay } from '@utils/dateTime';
import Card from '@components/ui/Card';

const BookingSummary = () => {
  const booking = useSelector(selectBooking);

  // Get service name
  const service = SERVICE_OPTIONS.find((s) => s.id === booking.serviceType);
  const serviceName = service?.name || '';

  // Get details based on service type
  const getServiceDetails = () => {
    const details = [];

    if (booking.serviceType === 'residential' || booking.serviceType === 'hourly_standard') {
      // Bedrooms
      const bedroom = BEDROOM_OPTIONS.find((b) => b.id === booking.bedrooms);
      if (bedroom) {
        details.push(bedroom.name);
      }

      // Bathrooms
      const bathroom = BATHROOM_OPTIONS.find((b) => b.id === booking.bathrooms);
      if (bathroom) {
        details.push(bathroom.name);
      }

      // Extras
      if (booking.extras && booking.extras.length > 0) {
        booking.extras.forEach((extraId) => {
          const extra = EXTRAS.find((e) => e.id === extraId);
          if (extra) {
            details.push(extra.name);
          }
        });
      }

      // Cleaning Products
      if (booking.cleaningProducts === 'green') {
        details.push('Green Products');
      } else {
        details.push('Normal');
      }
    }

    if (booking.serviceType === 'hourly_standard') {
      if (booking.hours) {
        details.unshift(`${booking.hours} Hours`);
      }
      if (booking.numberOfCleaners) {
        details.unshift(`${booking.numberOfCleaners} Cleaner${booking.numberOfCleaners > 1 ? 's' : ''}`);
      }
    }

    if (booking.serviceType === 'commercial') {
      if (booking.buildingType) {
        details.push(booking.buildingType.replace('_', ' '));
      }
    }

    if (booking.serviceType === 'home_organizing') {
      if (booking.organizingHours) {
        details.push(`${booking.organizingHours} Hours`);
      }
    }

    return details;
  };

  const details = getServiceDetails();

  // Get frequency
  const frequency = FREQUENCY_OPTIONS.find((f) => f.id === booking.frequency);

  return (
    <Card className="sticky top-24">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        {serviceName}
      </h2>

      {/* Service Details */}
      {details.length > 0 && (
        <div className="space-y-2 mb-4">
          {details.map((detail, index) => (
            <div key={index} className="text-sm text-gray-600">
              {detail}
            </div>
          ))}
        </div>
      )}

      {/* Address */}
      {booking.address.fullAddress && (
        <div className="flex items-start mb-4 pb-4 border-b border-gray-200">
          <svg className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <div className="text-sm">
            <div className="font-medium text-gray-900">
              {booking.address.fullAddress}
            </div>
            {booking.address.apt && (
              <div className="text-gray-600">
                {booking.address.apt}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Date & Time */}
      {booking.dateTime.date && (
        <div className="mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center mb-2">
            <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-medium text-gray-900">
              {formatDateDisplay(booking.dateTime.date)}
            </span>
          </div>
          {booking.dateTime.time && (
            <div className="text-sm text-gray-600 ml-7">
              {formatTimeDisplay(booking.dateTime.time)}
            </div>
          )}
        </div>
      )}

      {/* Frequency */}
      {frequency && frequency.id !== 'one_time' && (
        <div className="flex items-center mb-4 pb-4 border-b border-gray-200">
          <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className="text-sm font-medium text-gray-900">
            {frequency.name}
          </span>
        </div>
      )}

      {/* Duration */}
      {booking.duration > 0 && (
        <div className="flex items-center mb-4">
          <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm text-gray-600">
            {booking.duration} hr
          </span>
        </div>
      )}

      {/* Pricing */}
      <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">
            Today's Total
          </span>
          <span className="text-2xl font-bold text-primary-600">
            {formatPrice(booking.pricing.finalTotal || booking.pricing.total || 0)}
          </span>
        </div>

        {booking.pricing.discount > 0 && (
          <div className="mt-2 text-sm text-green-600">
            You save {formatPrice(booking.pricing.discount)} with {frequency?.name}
          </div>
        )}
      </div>
    </Card>
  );
};

export default BookingSummary;

