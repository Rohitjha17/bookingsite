/**
 * BookingConfirmation Page
 * Booking confirmation and thank you page
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@components/ui';
import { formatPrice } from '@utils/pricing';
import { formatDateDisplay } from '@utils/dateTime';
import { SERVICE_OPTIONS } from '@constants';

const BookingConfirmation = () => {
  const booking = useSelector((state) => state.booking);

  const service = SERVICE_OPTIONS.find((s) => s.id === booking.serviceType);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Booking Confirmed!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for choosing K&D Cleaning. We're excited to serve you!
        </p>

        {/* Booking Details */}
        <div className="bg-gray-50 rounded-lg p-6 text-left mb-8 space-y-4">
          <div className="border-b border-gray-200 pb-4">
            <div className="text-sm text-gray-600 mb-1">Booking ID</div>
            <div className="text-lg font-semibold text-gray-900">
              {booking.bookingId}
            </div>
          </div>

          <div className="border-b border-gray-200 pb-4">
            <div className="text-sm text-gray-600 mb-1">Service</div>
            <div className="text-lg font-semibold text-gray-900">
              {service?.name}
            </div>
          </div>

          <div className="border-b border-gray-200 pb-4">
            <div className="text-sm text-gray-600 mb-1">Date & Time</div>
            <div className="text-lg font-semibold text-gray-900">
              {formatDateDisplay(booking.dateTime.date)}
            </div>
            <div className="text-gray-700">
              {booking.dateTime.time}
            </div>
          </div>

          <div className="border-b border-gray-200 pb-4">
            <div className="text-sm text-gray-600 mb-1">Address</div>
            <div className="text-lg font-semibold text-gray-900">
              {booking.address.fullAddress}
            </div>
            {booking.address.apt && (
              <div className="text-gray-700">
                {booking.address.apt}
              </div>
            )}
          </div>

          <div className="border-b border-gray-200 pb-4">
            <div className="text-sm text-gray-600 mb-1">Duration</div>
            <div className="text-lg font-semibold text-gray-900">
              {booking.duration} hours
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-600 mb-1">Total</div>
            <div className="text-2xl font-bold text-primary-600">
              {formatPrice(booking.pricing.finalTotal || booking.pricing.total)}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-left">
          <h3 className="font-semibold text-gray-900 mb-2">
            📧 Confirmation Sent
          </h3>
          <p className="text-sm text-gray-700">
            A confirmation email has been sent to{' '}
            <span className="font-medium">{booking.contact.email}</span>
          </p>
          {booking.contact.smsNotifications && (
            <p className="text-sm text-gray-700 mt-1">
              You'll also receive SMS notifications at{' '}
              <span className="font-medium">{booking.contact.phone}</span>
            </p>
          )}
        </div>

        {/* What's Next */}
        <div className="text-left mb-8">
          <h3 className="font-semibold text-gray-900 mb-3">
            What's Next?
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>We'll send you a reminder 24 hours before your appointment</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Our professional cleaning team will arrive on time</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Payment will be charged after service completion</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="secondary"
            onClick={() => window.print()}
          >
            Print Confirmation
          </Button>
          <Link to="/booking/borough">
            <Button variant="primary">
              Book Another Service
            </Button>
          </Link>
        </div>
      </div>

      {/* Need Help */}
      <div className="mt-8 text-center text-gray-600">
        <p>
          Need to make changes or have questions?{' '}
          <a href="tel:+1234567890" className="text-primary-600 hover:underline font-medium">
            Call us at (123) 456-7890
          </a>
        </p>
      </div>
    </div>
  );
};

export default BookingConfirmation;

