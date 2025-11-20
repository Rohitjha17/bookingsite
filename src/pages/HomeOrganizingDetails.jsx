/**
 * HomeOrganizingDetails Page
 * Service details for home organizing
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setOrganizingHours,
  setOrganizingDescription,
  setOrganizingImages,
} from '@store/slices/bookingSlice';
import { useFormNavigation } from '@hooks/useFormNavigation';
import { useBookingPrice } from '@hooks/useBookingPrice';
import { Button, Textarea } from '@components/ui';
import { DURATION_HOURS } from '@constants';
import { formatPrice } from '@utils/pricing';

const HomeOrganizingDetails = () => {
  const dispatch = useDispatch();
  const { goToNextStep, goToPreviousStep } = useFormNavigation();
  const booking = useSelector((state) => state.booking);
  useBookingPrice();

  const handleContinue = () => {
    if (
      booking.organizingHours >= DURATION_HOURS.ORGANIZING_MIN &&
      booking.organizingDescription
    ) {
      goToNextStep('/booking/organizing-details');
    }
  };

  const handleBack = () => {
    goToPreviousStep('/booking/organizing-details');
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const fileNames = files.map((file) => file.name);
    dispatch(setOrganizingImages([...booking.organizingImages, ...fileNames]));
  };

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center text-primary-600 hover:text-primary-700"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Home Organizing
        </h1>
        <p className="text-gray-600">
          Professional organizing services for your home
        </p>
      </div>

      {/* Organizing Duration */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Organizing Duration
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Hours ${formatPrice(55)} - Please select 3 hours or more of organizing as this is our minimum number of hours we provide.
        </p>

        <div className="flex items-center space-x-4">
          <button
            onClick={() =>
              dispatch(
                setOrganizingHours(
                  Math.max(DURATION_HOURS.ORGANIZING_MIN, booking.organizingHours - 1)
                )
              )
            }
            className="w-12 h-12 rounded-full bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-50 flex items-center justify-center font-bold text-xl"
          >
            −
          </button>
          <div className="text-3xl font-bold text-gray-900 min-w-[60px] text-center">
            {booking.organizingHours}
          </div>
          <button
            onClick={() => dispatch(setOrganizingHours(booking.organizingHours + 1))}
            className="w-12 h-12 rounded-full bg-primary-600 text-white hover:bg-primary-700 flex items-center justify-center font-bold text-xl"
          >
            +
          </button>
          <span className="text-gray-600">hours</span>
        </div>
      </section>

      {/* Description */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Please describe what you would like to be organized.
        </h2>

        <Textarea
          placeholder="Describe the areas or items you'd like us to organize..."
          value={booking.organizingDescription}
          onChange={(e) => dispatch(setOrganizingDescription(e.target.value))}
          rows={5}
          required
        />
      </section>

      {/* Images (Optional) */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Do you have any pictures?
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          (Optional)
        </p>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors">
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />
          <label
            htmlFor="image-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm text-gray-600">
              Click to upload images
            </span>
          </label>

          {booking.organizingImages.length > 0 && (
            <div className="mt-4 text-sm text-gray-700">
              {booking.organizingImages.length} image(s) selected
            </div>
          )}
        </div>
      </section>

      {/* Continue Button */}
      <div className="flex justify-end pb-8">
        <Button
          onClick={handleContinue}
          disabled={
            booking.organizingHours < DURATION_HOURS.ORGANIZING_MIN ||
            !booking.organizingDescription
          }
          size="lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default HomeOrganizingDetails;

