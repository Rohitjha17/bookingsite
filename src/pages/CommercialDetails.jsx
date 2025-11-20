/**
 * CommercialDetails Page
 * Service details for commercial cleaning
 */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setBuildingType,
  setBestContactTime,
  setCommercialComments,
  setCommercialImages,
} from '@store/slices/bookingSlice';
import { useFormNavigation } from '@hooks/useFormNavigation';
import { useBookingPrice } from '@hooks/useBookingPrice';
import { Button, SelectionCard, Textarea } from '@components/ui';
import { BUILDING_TYPES, CONTACT_TIMES } from '@constants';

const CommercialDetails = () => {
  const dispatch = useDispatch();
  const { goToNextStep, goToPreviousStep } = useFormNavigation();
  const booking = useSelector((state) => state.booking);
  useBookingPrice();

  const handleContinue = () => {
    if (booking.buildingType && booking.bestContactTime) {
      goToNextStep('/booking/commercial-details');
    }
  };

  const handleBack = () => {
    goToPreviousStep('/booking/commercial-details');
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // In a real app, you would upload these to a server
    // For now, just store the file names
    const fileNames = files.map((file) => file.name);
    dispatch(setCommercialImages([...booking.commercialImages, ...fileNames]));
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
          Commercial Cleaning
        </h1>
        <p className="text-gray-600">
          Tell us about your commercial space
        </p>
      </div>

      {/* Building Type */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Building Type
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {BUILDING_TYPES.map((type) => (
            <SelectionCard
              key={type.id}
              selected={booking.buildingType === type.id}
              onClick={() => dispatch(setBuildingType(type.id))}
              icon={type.icon}
              title={type.name}
            />
          ))}
        </div>
      </section>

      {/* Best Contact Time */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Best Contact Time
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {CONTACT_TIMES.map((time) => (
            <SelectionCard
              key={time.id}
              selected={booking.bestContactTime === time.id}
              onClick={() => dispatch(setBestContactTime(time.id))}
              title={time.name}
            />
          ))}
        </div>
      </section>

      {/* Comments or Questions */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Comments or Questions
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Please provide any additional information that may be unique to your facility.
          Such as, if you have a kitchen and/or restroom, or if you know the square footage of your facility.
        </p>

        <Textarea
          placeholder="Tell us about your space..."
          value={booking.commercialComments}
          onChange={(e) => dispatch(setCommercialComments(e.target.value))}
          rows={4}
        />
      </section>

      {/* Images (Optional) */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Images (Optional)
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Please provide images of the space.
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

          {booking.commercialImages.length > 0 && (
            <div className="mt-4 text-sm text-gray-700">
              {booking.commercialImages.length} image(s) selected
            </div>
          )}
        </div>
      </section>

      {/* Continue Button */}
      <div className="flex justify-end pb-8">
        <Button
          onClick={handleContinue}
          disabled={!booking.buildingType || !booking.bestContactTime}
          size="lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default CommercialDetails;

