/**
 * Validation Utilities
 * Form validation functions
 */

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (US format)
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[\d\s\-\(\)]+$/;
  const digitsOnly = phone.replace(/\D/g, '');
  return phoneRegex.test(phone) && digitsOnly.length === 10;
};

/**
 * Validate credit card number (basic Luhn algorithm)
 */
export const isValidCardNumber = (cardNumber) => {
  const cleanNumber = cardNumber.replace(/\s/g, '');
  
  if (!/^\d+$/.test(cleanNumber) || cleanNumber.length < 13 || cleanNumber.length > 19) {
    return false;
  }

  let sum = 0;
  let isEven = false;

  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

/**
 * Validate expiry date (MM/YY format)
 */
export const isValidExpiryDate = (expiryDate) => {
  const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!regex.test(expiryDate)) {
    return false;
  }

  const [month, year] = expiryDate.split('/');
  const expiry = new Date(2000 + parseInt(year), parseInt(month));
  const now = new Date();

  return expiry > now;
};

/**
 * Validate CVV
 */
export const isValidCVV = (cvv) => {
  return /^\d{3,4}$/.test(cvv);
};

/**
 * Validate zip code (US format)
 */
export const isValidZipCode = (zipCode) => {
  return /^\d{5}(-\d{4})?$/.test(zipCode);
};

/**
 * Check if residential booking is complete
 */
export const isResidentialComplete = (booking) => {
  return !!(
    booking.bedrooms &&
    booking.bathrooms &&
    booking.cleaningProducts &&
    booking.hasPets !== null &&
    booking.accessMethod
  );
};

/**
 * Check if hourly booking is complete
 */
export const isHourlyComplete = (booking) => {
  return !!(
    booking.hours >= 1 &&
    booking.numberOfCleaners >= 1 &&
    booking.bedrooms &&
    booking.bathrooms &&
    booking.hasPets !== null &&
    booking.accessMethod
  );
};

/**
 * Check if commercial booking is complete
 */
export const isCommercialComplete = (booking) => {
  return !!(
    booking.buildingType &&
    booking.bestContactTime
  );
};

/**
 * Check if organizing booking is complete
 */
export const isOrganizingComplete = (booking) => {
  return !!(
    booking.organizingHours >= 3 &&
    booking.organizingDescription
  );
};

/**
 * Check if date/time selection is complete
 */
export const isDateTimeComplete = (dateTime) => {
  return !!(dateTime.date && dateTime.time);
};

/**
 * Check if address is complete
 */
export const isAddressComplete = (address) => {
  return !!(
    address.street &&
    address.city &&
    address.state &&
    address.zipCode
  );
};

/**
 * Check if payment info is complete
 */
export const isPaymentComplete = (payment, contact) => {
  return !!(
    isValidCardNumber(payment.cardNumber) &&
    isValidExpiryDate(payment.expiryDate) &&
    isValidCVV(payment.cvv) &&
    contact.fullName &&
    isValidPhone(contact.phone) &&
    isValidEmail(contact.email)
  );
};

/**
 * Format card number with spaces
 */
export const formatCardNumber = (value) => {
  const cleaned = value.replace(/\s/g, '');
  const groups = cleaned.match(/.{1,4}/g);
  return groups ? groups.join(' ') : cleaned;
};

/**
 * Format expiry date as MM/YY
 */
export const formatExpiryDate = (value) => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length >= 2) {
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
  }
  return cleaned;
};

/**
 * Format phone number
 */
export const formatPhoneNumber = (value) => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length >= 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  }
  return value;
};

