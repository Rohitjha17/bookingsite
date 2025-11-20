/**
 * Custom Hook: useBookingPrice
 * Automatically calculates and updates booking price
 */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBooking, updatePricing, setDuration } from '@store/slices/bookingSlice';
import { calculatePrice } from '@utils/pricing';

export const useBookingPrice = () => {
  const dispatch = useDispatch();
  const booking = useSelector(selectBooking);

  useEffect(() => {
    // Calculate pricing whenever relevant booking data changes
    const pricing = calculatePrice(booking);
    
    dispatch(updatePricing(pricing));
    dispatch(setDuration(pricing.duration));
  }, [
    booking.serviceType,
    booking.bedrooms,
    booking.bathrooms,
    booking.extras,
    booking.frequency,
    booking.hours,
    booking.numberOfCleaners,
    booking.organizingHours,
    booking.buildingType,
    booking.tip,
    dispatch,
  ]);

  return booking.pricing;
};

