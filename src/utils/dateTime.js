/**
 * Date and Time Utilities
 */

import { format, addDays, isToday, isTomorrow, startOfDay } from 'date-fns';

/**
 * Generate available dates for booking
 * Returns next 30 days
 */
export const generateAvailableDates = (startDate = new Date()) => {
  const dates = [];
  for (let i = 0; i < 30; i++) {
    const date = addDays(startDate, i);
    dates.push({
      date,
      dayName: format(date, 'EEE'),
      dayNumber: format(date, 'd'),
      monthName: format(date, 'MMM'),
      fullDate: format(date, 'MMM d'),
      isToday: isToday(date),
      isTomorrow: isTomorrow(date),
    });
  }
  return dates;
};

/**
 * Generate time slots for a given date
 */
export const generateTimeSlots = (date) => {
  const slots = [];
  const hours = [9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14];

  hours.forEach((hour) => {
    const isPM = hour >= 12;
    const displayHour = hour > 12 ? hour - 12 : hour;
    const minutes = hour % 1 === 0 ? '00' : '30';
    const hourInt = Math.floor(displayHour);
    
    slots.push({
      value: `${Math.floor(hour)}:${minutes}`,
      label: `${hourInt}:${minutes} ${isPM ? 'PM' : 'AM'}`,
      time: hour,
    });
  });

  return slots;
};

/**
 * Format date for display
 */
export const formatDateDisplay = (date) => {
  if (!date) return '';
  return format(new Date(date), 'EEEE, MMMM do');
};

/**
 * Format time for display
 */
export const formatTimeDisplay = (time) => {
  if (!time) return '';
  return time;
};

/**
 * Check if date is in the past
 */
export const isPastDate = (date) => {
  return startOfDay(new Date(date)) < startOfDay(new Date());
};

/**
 * Get day of week
 */
export const getDayOfWeek = (date) => {
  return format(new Date(date), 'EEEE');
};

