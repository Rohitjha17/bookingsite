/**
 * DateTimeSelection Page
 * Select date and time for cleaning
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDate, setTime } from '@store/slices/bookingSlice';
import { useFormNavigation } from '@hooks/useFormNavigation';
import { Button } from '@components/ui';
import { generateAvailableDates, generateTimeSlots } from '@utils/dateTime';
import clsx from 'clsx';

const DateTimeSelection = () => {
  const dispatch = useDispatch();
  const { goToNextStep, goToPreviousStep } = useFormNavigation();
  const booking = useSelector((state) => state.booking);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [currentWeekStart, setCurrentWeekStart] = useState(0);

  useEffect(() => {
    // Generate dates
    const dates = generateAvailableDates();
    setAvailableDates(dates);

    // Generate time slots
    const slots = generateTimeSlots();
    setAvailableSlots(slots);
  }, []);

  const visibleDates = availableDates.slice(currentWeekStart, currentWeekStart + 7);

  const handleDateSelect = (date) => {
    dispatch(setDate(date.date));
  };

  const handleTimeSelect = (slot) => {
    dispatch(setTime(slot.label));
  };

  const handleContinue = () => {
    if (booking?.dateTime?.date && booking?.dateTime?.time) {
      goToNextStep('/booking/datetime');
    }
  };

  const handleBack = () => {
    goToPreviousStep('/booking/datetime');
  };

  const handleNextWeek = () => {
    if (currentWeekStart + 7 < availableDates.length) {
      setCurrentWeekStart(currentWeekStart + 7);
    }
  };

  const handlePrevWeek = () => {
    if (currentWeekStart - 7 >= 0) {
      setCurrentWeekStart(currentWeekStart - 7);
    }
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
          Date & Time
        </h1>
        <p className="text-gray-600">
          Pick a date and time for your appointment, and we'll be there.
        </p>
      </div>

      {/* Date Selection */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handlePrevWeek}
            disabled={currentWeekStart === 0}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="grid grid-cols-7 gap-2 flex-1 mx-4">
            {visibleDates.map((date, index) => {
              const isSelected =
                booking?.dateTime?.date &&
                new Date(booking.dateTime.date).toDateString() === date.date.toDateString();

              return (
                <button
                  key={index}
                  onClick={() => handleDateSelect(date)}
                  className={clsx(
                    'p-3 rounded-lg border-2 transition-all text-center',
                    isSelected
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-primary-300'
                  )}
                >
                  <div className="text-xs font-medium text-gray-600">
                    {date.dayName}
                  </div>
                  <div className="text-sm font-medium">
                    {date.monthName} {date.dayNumber}
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={handleNextWeek}
            disabled={currentWeekStart + 7 >= availableDates.length}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      {/* Time Slots */}
      {booking?.dateTime?.date && (
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Select Time
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {availableSlots.map((slot, index) => {
              const isSelected = booking?.dateTime?.time === slot.label;

              return (
                <button
                  key={index}
                  onClick={() => handleTimeSelect(slot)}
                  className={clsx(
                    'p-4 rounded-lg border-2 transition-all font-medium',
                    isSelected
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-primary-300'
                  )}
                >
                  {slot.label}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Continue Button */}
      <div className="flex justify-end pb-8">
        <Button
          onClick={handleContinue}
          disabled={!booking?.dateTime?.date || !booking?.dateTime?.time}
          size="lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default DateTimeSelection;

