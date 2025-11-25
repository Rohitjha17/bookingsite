/**
 * ResidentialDetails Page
 * Service details for residential cleaning
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFrequency,
  setBedrooms,
  setBathrooms,
  toggleExtra,
  setCleaningProducts,
  setHasPets,
  setPetsDescription,
  setAccessMethod,
  setKeyLocation,
  setOtherAccessInfo,
  setSpecialNotes,
} from '@store/slices/bookingSlice';
import { useFormNavigation } from '@hooks/useFormNavigation';
import { useBookingPrice } from '@hooks/useBookingPrice';
import { Button, SelectionCard, Radio, Textarea, Input } from '@components/ui';
import {
  FREQUENCY_OPTIONS,
  BEDROOM_OPTIONS,
  BATHROOM_OPTIONS,
  EXTRAS,
  CLEANING_PRODUCTS,
  ACCESS_METHODS,
  FAQ_ITEMS,
} from '@constants';
import { formatPrice } from '@utils/pricing';

const ResidentialDetails = () => {
  const dispatch = useDispatch();
  const { goToNextStep, goToPreviousStep } = useFormNavigation();
  const booking = useSelector((state) => state.booking);
  useBookingPrice(); // Auto-calculate pricing

  const handleContinue = () => {
    if (booking.bedrooms && booking.bathrooms && booking.accessMethod && booking.hasPets !== null) {
      goToNextStep('/booking/residential-details');
    }
  };

  const handleBack = () => {
    goToPreviousStep('/booking/residential-details');
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

      {/* Frequency Selection */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          How Often?
        </h2>
        <p className="text-gray-600 mb-4">
          Save by selecting a recurring cleaning plan
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FREQUENCY_OPTIONS.map((freq) => (
            <SelectionCard
              key={freq.id}
              selected={booking.frequency === freq.id}
              onClick={() => dispatch(setFrequency(freq.id))}
              title={freq.name}
              badge={freq.discount > 0 ? `${freq.discount}% off` : null}
            />
          ))}
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
              selected={booking.bedrooms === bedroom.id}
              onClick={() => dispatch(setBedrooms(bedroom.id))}
              title={bedroom.name}
              subtitle={bedroom.price > 0 ? `+${formatPrice(bedroom.price)}` : null}
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
              selected={booking.bathrooms === bathroom.id}
              onClick={() => dispatch(setBathrooms(bathroom.id))}
              title={bathroom.name}
              subtitle={bathroom.price > 0 ? `+${formatPrice(bathroom.price)}` : null}
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
              selected={booking.extras.includes(extra.id)}
              onClick={() => dispatch(toggleExtra(extra.id))}
              icon={extra.icon}
              title={extra.name}
              subtitle={formatPrice(extra.price)}
            />
          ))}
        </div>
      </section>

      {/* Cleaning Products */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Cleaning Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CLEANING_PRODUCTS.map((product) => (
            <SelectionCard
              key={product.id}
              selected={booking.cleaningProducts === product.id}
              onClick={() => dispatch(setCleaningProducts(product.id))}
              title={product.name}
              subtitle={product.description}
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
            selected={booking.hasPets === true}
            onClick={() => dispatch(setHasPets(true))}
            title="Yes"
          />
          <SelectionCard
            selected={booking.hasPets === false}
            onClick={() => dispatch(setHasPets(false))}
            title="No"
          />
        </div>

        {/* Conditional: Pet Description */}
        {booking.hasPets === true && (
          <div className="mt-4 max-w-2xl">
            <Input
              label="Pet Details"
              placeholder="E.g., Dog and cat in house, friendly but may bark"
              value={booking.petsDescription}
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
              selected={booking.accessMethod === method.id}
              onClick={() => dispatch(setAccessMethod(method.id))}
              title={method.name}
            />
          ))}
        </div>

        {/* Conditional: Key Location */}
        {booking.accessMethod === 'hidden_key' && (
          <div className="mt-4 max-w-2xl">
            <Input
              label="Where is the key hidden?"
              placeholder="E.g., Under the mat, in the mailbox"
              value={booking.keyLocation}
              onChange={(e) => dispatch(setKeyLocation(e.target.value))}
            />
          </div>
        )}

        {/* Conditional: Other Access Description */}
        {booking.accessMethod === 'other' && (
          <div className="mt-4 max-w-2xl">
            <Textarea
              label="Please describe how we can access your home"
              placeholder="E.g., Call me when you arrive, neighbor has the key"
              value={booking.otherAccessInfo}
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
          value={booking.specialNotes}
          onChange={(e) => dispatch(setSpecialNotes(e.target.value))}
          rows={4}
        />
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {FAQ_ITEMS.map((faq, index) => (
            <details
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer"
            >
              <summary className="font-medium text-gray-900 flex items-center justify-between">
                {faq.question}
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-3 text-gray-600 text-sm">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Continue Button */}
      <div className="flex justify-end pb-8">
        <Button
          onClick={handleContinue}
          disabled={!booking.bedrooms || !booking.bathrooms || !booking.accessMethod || booking.hasPets === null}
          size="lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ResidentialDetails;

