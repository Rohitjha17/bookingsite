/**
 * ServiceSelection Page
 * Second step: Select service type
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setServiceType } from '@store/slices/bookingSlice';
import { useFormNavigation } from '@hooks/useFormNavigation';
import { Button, SelectionCard } from '@components/ui';
import { SERVICE_OPTIONS } from '@constants';

const ServiceSelection = () => {
  const dispatch = useDispatch();
  const { goToNextStep, goToPreviousStep } = useFormNavigation();
  const selectedService = useSelector((state) => state.booking.serviceType);

  const handleServiceSelect = (serviceId) => {
    dispatch(setServiceType(serviceId));
  };

  const handleContinue = () => {
    if (selectedService) {
      goToNextStep('/booking/service');
    }
  };

  const handleBack = () => {
    goToPreviousStep('/booking/service');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <button
          onClick={handleBack}
          className="flex items-center text-primary-600 hover:text-primary-700 mb-4"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Select Service
        </h1>
        <p className="text-gray-600">
          Choose the cleaning service that best fits your needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {SERVICE_OPTIONS.map((service) => (
          <SelectionCard
            key={service.id}
            selected={selectedService === service.id}
            onClick={() => handleServiceSelect(service.id)}
            icon={service.icon}
            title={service.name}
            subtitle={service.description}
          />
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleContinue}
          disabled={!selectedService}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ServiceSelection;

