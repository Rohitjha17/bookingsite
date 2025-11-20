/**
 * BoroughSelection Page
 * First step: Select borough/location
 */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setBorough } from '@store/slices/bookingSlice';
import { Button, Input } from '@components/ui';
import { BOROUGHS } from '@constants';

const BoroughSelection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedBorough = useSelector((state) => state.booking.borough);
  const [searchTerm, setSearchTerm] = useState('');

  const handleBoroughSelect = (boroughId) => {
    dispatch(setBorough(boroughId));
  };

  const handleContinue = () => {
    if (selectedBorough) {
      navigate('/booking/service');
    }
  };

  const filteredBoroughs = BOROUGHS.filter((borough) =>
    borough.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Book Online
        </h1>
        <p className="text-lg text-gray-600">
          Let's get started by selecting your borough.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Search borough..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-3">
          {filteredBoroughs.map((borough) => (
            <div
              key={borough.id}
              className={`
                flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all
                ${
                  selectedBorough === borough.id
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                }
                ${!borough.available && 'opacity-50 cursor-not-allowed'}
              `}
              onClick={() => borough.available && handleBoroughSelect(borough.id)}
            >
              <span className="text-lg font-medium text-gray-900">
                {borough.name}
              </span>
              {selectedBorough === borough.id && (
                <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleContinue}
            disabled={!selectedBorough}
            className="w-full sm:w-auto"
          >
            <span className="flex items-center">
              Continue
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BoroughSelection;

