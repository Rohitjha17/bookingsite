/**
 * ProgressBar Component
 * Shows booking progress through steps
 */

import React from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectCurrentStep } from '@store/slices/uiSlice';

const steps = [
  { id: 1, name: 'Borough' },
  { id: 2, name: 'Service' },
  { id: 3, name: 'Details' },
  { id: 4, name: 'Date & Time' },
  { id: 5, name: 'Address' },
  { id: 6, name: 'Payment' },
];

const ProgressBar = () => {
  const currentStep = useSelector(selectCurrentStep);

  return (
    <div className="bg-white border-b border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center flex-1">
                <div
                  className={clsx(
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all',
                    step.id < currentStep
                      ? 'bg-primary-600 text-white'
                      : step.id === currentStep
                      ? 'bg-primary-600 text-white ring-4 ring-primary-200'
                      : 'bg-gray-200 text-gray-600'
                  )}
                >
                  {step.id < currentStep ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step.id
                  )}
                </div>
                <span
                  className={clsx(
                    'text-xs mt-2 hidden sm:block',
                    step.id <= currentStep ? 'text-primary-600 font-medium' : 'text-gray-500'
                  )}
                >
                  {step.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={clsx(
                    'h-1 flex-1 mx-2 transition-all',
                    step.id < currentStep ? 'bg-primary-600' : 'bg-gray-200'
                  )}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;

