/**
 * Pricing Calculation Utilities
 * Handles all pricing logic for different service types
 */

import {
  BASE_PRICES,
  BEDROOM_OPTIONS,
  BATHROOM_OPTIONS,
  EXTRAS,
  FREQUENCY_OPTIONS,
  DURATION_HOURS,
  SERVICE_TYPES,
} from '@constants';

/**
 * Calculate residential cleaning price
 */
export const calculateResidentialPrice = (bookingData) => {
  const { bedrooms, bathrooms, extras, frequency } = bookingData;

  // Base price
  let basePrice = BASE_PRICES.RESIDENTIAL_BASE;

  // Add bedroom price
  const bedroomOption = BEDROOM_OPTIONS.find((b) => b.id === bedrooms);
  if (bedroomOption) {
    basePrice += bedroomOption.price;
  }

  // Add bathroom price
  const bathroomOption = BATHROOM_OPTIONS.find((b) => b.id === bathrooms);
  if (bathroomOption) {
    basePrice += bathroomOption.price;
  }

  // Calculate extras
  let extrasTotal = 0;
  extras.forEach((extraId) => {
    const extra = EXTRAS.find((e) => e.id === extraId);
    if (extra) {
      extrasTotal += extra.price;
    }
  });

  // Calculate subtotal
  const subtotal = basePrice + extrasTotal;

  // Apply frequency discount
  const frequencyOption = FREQUENCY_OPTIONS.find((f) => f.id === frequency);
  const discountPercent = frequencyOption ? frequencyOption.discount : 0;
  const discount = (subtotal * discountPercent) / 100;

  // Calculate duration
  const bedroomKey = bedrooms;
  const duration = DURATION_HOURS.RESIDENTIAL[bedroomKey] || 3;

  return {
    basePrice,
    extrasTotal,
    subtotal,
    discount,
    discountPercent,
    total: subtotal - discount,
    duration,
  };
};

/**
 * Calculate hourly standard cleaning price
 */
export const calculateHourlyPrice = (bookingData) => {
  const { hours, numberOfCleaners, extras } = bookingData;

  // Base price: hours * rate * cleaners
  const basePrice = hours * BASE_PRICES.HOURLY_RATE * numberOfCleaners;

  // Calculate extras
  let extrasTotal = 0;
  extras.forEach((extraId) => {
    const extra = EXTRAS.find((e) => e.id === extraId);
    if (extra) {
      extrasTotal += extra.price;
    }
  });

  const subtotal = basePrice + extrasTotal;

  return {
    basePrice,
    extrasTotal,
    subtotal,
    discount: 0,
    discountPercent: 0,
    total: subtotal,
    duration: hours,
  };
};

/**
 * Calculate commercial cleaning price
 * Note: Commercial pricing might be custom - this is a placeholder
 */
export const calculateCommercialPrice = (bookingData) => {
  const { buildingType } = bookingData;

  // Base price (would typically be determined by building size/type)
  const basePrice = BASE_PRICES.COMMERCIAL_BASE;

  return {
    basePrice,
    extrasTotal: 0,
    subtotal: basePrice,
    discount: 0,
    discountPercent: 0,
    total: basePrice,
    duration: 0, // TBD
  };
};

/**
 * Calculate home organizing price
 */
export const calculateOrganizingPrice = (bookingData) => {
  const { organizingHours } = bookingData;

  const hours = Math.max(organizingHours, DURATION_HOURS.ORGANIZING_MIN);
  const basePrice = hours * BASE_PRICES.ORGANIZING_RATE;

  return {
    basePrice,
    extrasTotal: 0,
    subtotal: basePrice,
    discount: 0,
    discountPercent: 0,
    total: basePrice,
    duration: hours,
  };
};

/**
 * Main pricing calculation function
 * Routes to appropriate calculator based on service type
 */
export const calculatePrice = (bookingData) => {
  const { serviceType } = bookingData;

  let pricing;

  switch (serviceType) {
    case SERVICE_TYPES.RESIDENTIAL:
      pricing = calculateResidentialPrice(bookingData);
      break;
    case SERVICE_TYPES.HOURLY_STANDARD:
      pricing = calculateHourlyPrice(bookingData);
      break;
    case SERVICE_TYPES.COMMERCIAL:
      pricing = calculateCommercialPrice(bookingData);
      break;
    case SERVICE_TYPES.HOME_ORGANIZING:
      pricing = calculateOrganizingPrice(bookingData);
      break;
    default:
      pricing = {
        basePrice: 0,
        extrasTotal: 0,
        subtotal: 0,
        discount: 0,
        discountPercent: 0,
        total: 0,
        duration: 0,
      };
  }

  // Add tip to final total
  const tipAmount = bookingData.tip?.amount || 0;
  pricing.tip = tipAmount;
  pricing.finalTotal = pricing.total + tipAmount;

  return pricing;
};

/**
 * Format price for display
 */
export const formatPrice = (price) => {
  return `$${Math.round(price)}`;
};

/**
 * Calculate savings based on frequency
 */
export const calculateSavings = (subtotal, discountPercent) => {
  return (subtotal * discountPercent) / 100;
};

