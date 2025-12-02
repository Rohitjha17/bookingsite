/**
 * HourlyStandardDetails Page
 * Service details for hourly standard cleaning
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setHours,
  setNumberOfCleaners,
  setBedrooms,
  setBathrooms,
  toggleExtra,
  setHasPets,
  setPetsDescription,
  setAccessMethod,
  setKeyLocation,
  setOtherAccessInfo,
  setSpecialNotes,
} from '@store/slices/bookingSlice';
import { useFormNavigation } from '@hooks/useFormNavigation';
import { useBookingPrice } from '@hooks/useBookingPrice';
import { Button, SelectionCard, Textarea, Input } from '@components/ui';
import {
  BEDROOM_OPTIONS,
  BATHROOM_OPTIONS,
  EXTRAS,
  ACCESS_METHODS,
} from '@constants';
import { formatPrice } from '@utils/pricing';

const HourlyStandardDetails = () => {
  const dispatch = useDispatch();
  const { goToNextStep, goToPreviousStep } = useFormNavigation();
  const booking = useSelector((state) => state.booking);
  useBookingPrice();

  const handleContinue = () => {
    if (
      booking?.hours >= 1 &&
      booking?.numberOfCleaners >= 1 &&
      booking?.bedrooms &&
      booking?.bathrooms &&
      booking?.accessMethod &&
      booking?.hasPets !== null
    ) {
      goToNextStep('/booking/hourly-details');
    }
  };

  const handleBack = () => {
    goToPreviousStep('/booking/hourly-details');
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
          Hourly Standard Home Cleaning
        </h1>
        <p className="text-gray-600">
          For how many hours would you like to schedule a cleaning?
        </p>
      </div>

      {/* Hours */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Number of Hours
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          ${formatPrice(55)} per hour
        </p>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => dispatch(setHours(Math.max(1, (booking?.hours || 3) - 1)))}
            className="w-12 h-12 rounded-full bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-50 flex items-center justify-center font-bold text-xl"
          >
            −
          </button>
          <div className="text-3xl font-bold text-gray-900 min-w-[60px] text-center">
            {booking?.hours || 3}
          </div>
          <button
            onClick={() => dispatch(setHours((booking?.hours || 3) + 1))}
            className="w-12 h-12 rounded-full bg-primary-600 text-white hover:bg-primary-700 flex items-center justify-center font-bold text-xl"
          >
            +
          </button>
        </div>
      </section>

      {/* Number of Cleaners */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Number of Cleaners
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Displayed total is showing the price for selected number of hours for one cleaner. Amount will later be adjusted by the number of cleaners selected.
        </p>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => dispatch(setNumberOfCleaners(Math.max(1, (booking?.numberOfCleaners || 1) - 1)))}
            className="w-12 h-12 rounded-full bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-50 flex items-center justify-center font-bold text-xl"
          >
            −
          </button>
          <div className="text-3xl font-bold text-gray-900 min-w-[60px] text-center">
            {booking?.numberOfCleaners || 1}
          </div>
          <button
            onClick={() => dispatch(setNumberOfCleaners((booking?.numberOfCleaners || 1) + 1))}
            className="w-12 h-12 rounded-full bg-primary-600 text-white hover:bg-primary-700 flex items-center justify-center font-bold text-xl"
          >
            +
          </button>
        </div>
      </section>

      {/* Bedrooms */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Number of Bedrooms
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {BEDROOM_OPTIONS.map((bedroom) => (
            <SelectionCard
              key={bedroom.id}
              selected={booking?.bedrooms === bedroom.id}
              onClick={() => dispatch(setBedrooms(bedroom.id))}
              title={bedroom.name}
            />
          ))}
        </div>
      </section>

      {/* Bathrooms */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Number of Bathrooms
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {BATHROOM_OPTIONS.map((bathroom) => (
            <SelectionCard
              key={bathroom.id}
              selected={booking?.bathrooms === bathroom.id}
              onClick={() => dispatch(setBathrooms(bathroom.id))}
              title={bathroom.name}
            />
          ))}
        </div>
      </section>

      {/* Extras */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Extras
        </h2>
        <p className="text-gray-600 mb-4">
          Add on extras for a cleaning upgrade
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {EXTRAS.map((extra) => (
            <SelectionCard
              key={extra.id}
              selected={booking?.extras?.includes(extra.id) || false}
              onClick={() => dispatch(toggleExtra(extra.id))}
              icon={extra.icon}
              title={extra.name}
              subtitle={formatPrice(extra.price)}
            />
          ))}
        </div>
      </section>

      {/* Pets */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Any Pets?
        </h2>

        <div className="grid grid-cols-2 gap-4 max-w-md">
          <SelectionCard
            selected={booking?.hasPets === true}
            onClick={() => dispatch(setHasPets(true))}
            title="Yes"
          />
          <SelectionCard
            selected={booking?.hasPets === false}
            onClick={() => dispatch(setHasPets(false))}
            title="No"
          />
        </div>

        {/* Conditional: Pet Description */}
        {booking?.hasPets === true && (
          <div className="mt-4 max-w-2xl">
            <Input
              label="Pet Details"
              placeholder="E.g., Dog and cat in house, friendly but may bark"
              value={booking?.petsDescription || ''}
              onChange={(e) => dispatch(setPetsDescription(e.target.value))}
            />
          </div>
        )}
      </section>

      {/* Access Method */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How do we get in?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ACCESS_METHODS.map((method) => (
            <SelectionCard
              key={method.id}
              selected={booking?.accessMethod === method.id}
              onClick={() => dispatch(setAccessMethod(method.id))}
              title={method.name}
            />
          ))}
        </div>

        {/* Conditional: Key Location */}
        {booking?.accessMethod === 'hidden_key' && (
          <div className="mt-4 max-w-2xl">
            <Input
              label="Where is the key hidden?"
              placeholder="E.g., Under the mat, in the mailbox"
              value={booking?.keyLocation || ''}
              onChange={(e) => dispatch(setKeyLocation(e.target.value))}
            />
          </div>
        )}

        {/* Conditional: Other Access Description */}
        {booking?.accessMethod === 'other' && (
          <div className="mt-4 max-w-2xl">
            <Textarea
              label="Please describe how we can access your home"
              placeholder="E.g., Call me when you arrive, neighbor has the key"
              value={booking?.otherAccessInfo || ''}
              onChange={(e) => dispatch(setOtherAccessInfo(e.target.value))}
              rows={3}
            />
          </div>
        )}
      </section>

      {/* Special Notes */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Special Notes or Instructions
        </h2>

        <Textarea
          placeholder="E.g. please dust under the bed and empty the dishwasher..."
          value={booking?.specialNotes || ''}
          onChange={(e) => dispatch(setSpecialNotes(e.target.value))}
          rows={4}
        />
      </section>

      {/* Continue Button */}
      <div className="flex justify-end pb-8">
        <Button
          onClick={handleContinue}
          disabled={
            !booking?.hours ||
            !booking?.numberOfCleaners ||
            !booking?.bedrooms ||
            !booking?.bathrooms ||
            !booking?.accessMethod ||
            booking?.hasPets === null
          }
          size="lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default HourlyStandardDetails;

