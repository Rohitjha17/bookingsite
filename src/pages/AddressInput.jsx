/**
 * AddressInput Page
 * Enter service address
 */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAddress } from '@store/slices/bookingSlice';
import { useFormNavigation } from '@hooks/useFormNavigation';
import { Button, Input } from '@components/ui';
import { isAddressComplete } from '@utils/validation';

const AddressInput = () => {
  const dispatch = useDispatch();
  const { goToNextStep, goToPreviousStep } = useFormNavigation();
  const address = useSelector((state) => state.booking.address);

  const [formData, setFormData] = useState({
    street: address.street || '',
    apt: address.apt || '',
    city: address.city || 'Chicago',
    state: address.state || 'IL',
    zipCode: address.zipCode || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContinue = () => {
    // Build full address string
    const fullAddress = `${formData.street}, ${formData.city}, ${formData.state} ${formData.zipCode}`;
    
    dispatch(
      setAddress({
        ...formData,
        fullAddress,
      })
    );

    if (isAddressComplete(formData)) {
      goToNextStep('/booking/address');
    }
  };

  const handleBack = () => {
    goToPreviousStep('/booking/address');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
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
          Service Address
        </h1>
        <p className="text-gray-600">
          Where should we provide the service?
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
        {/* Street Address and Apt */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <Input
              label="Street address"
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="4925 North Broadway"
              required
            />
          </div>
          <div>
            <Input
              label="Apt, Unit, Floor"
              name="apt"
              value={formData.apt}
              onChange={handleChange}
              placeholder="Apt 4B"
            />
          </div>
        </div>

        {/* City, State, Zip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Input
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Chicago"
              required
            />
          </div>
          <div>
            <Input
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="IL"
              required
            />
          </div>
          <div>
            <Input
              label="Zip Code"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              placeholder="60640"
              required
            />
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleContinue}
          disabled={!isAddressComplete(formData)}
          size="lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default AddressInput;

