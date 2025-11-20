/**
 * Payload Builders
 * Maps frontend booking state to backend API payloads
 */

import {
  BOROUGHS,
  SERVICE_TYPES,
  FREQUENCY_OPTIONS,
  BEDROOM_OPTIONS,
  BATHROOM_OPTIONS,
  EXTRAS,
  BUILDING_TYPES,
  CONTACT_TIMES,
} from '@constants';

const FREQUENCY_LABELS = FREQUENCY_OPTIONS.reduce((acc, option) => {
  acc[option.id] = option.backendValue || option.name;
  return acc;
}, {});

const ACCESS_METHOD_LABELS = {
  someone_home: 'SomeoneHome',
  doorman: 'Doorman',
  hidden_key: 'HideKey',
  other: 'Other',
};

const DEFAULT_PAYMENT_REFERENCE = 'manual-payment';

const getFrequencyLabel = (frequencyId) =>
  FREQUENCY_LABELS[frequencyId] || 'One Time';

const getBoroughName = (boroughId) =>
  BOROUGHS.find((borough) => borough.id === boroughId)?.name;

const parseCountFromLabel = (label) => {
  if (!label) return 0;
  if (label.toLowerCase() === 'studio') {
    return 0;
  }
  const match = label.match(/\d+/);
  return match ? Number(match[0]) : 0;
};

const getBedroomsCount = (bedroomId) => {
  const bedroom = BEDROOM_OPTIONS.find((option) => option.id === bedroomId);
  return parseCountFromLabel(bedroom?.name);
};

const getBathroomsCount = (bathroomId) => {
  const bathroom = BATHROOM_OPTIONS.find((option) => option.id === bathroomId);
  return parseCountFromLabel(bathroom?.name || '1');
};

const getExtrasNames = (extraIds = []) =>
  extraIds
    .map((extraId) => EXTRAS.find((extra) => extra.id === extraId)?.name)
    .filter(Boolean);

const getCleaningProductsLabel = (productId) => {
  if (productId === 'green') return 'Green';
  if (productId === 'normal') return 'Normal';
  return 'Normal'; // Default fallback
};

const getAccessMethodLabel = (accessMethod) =>
  ACCESS_METHOD_LABELS[accessMethod] || 'SomeoneHome';

const getAddressString = (address = {}) => {
  if (address.fullAddress) {
    return address.fullAddress;
  }

  const segments = [
    address.street,
    address.apt,
    address.city,
    address.state,
    address.zipCode,
  ].filter(Boolean);

  return segments.join(', ') || 'Address not provided';
};

const getLocation = (booking) =>
  booking.address?.city || getBoroughName(booking.borough) || 'Unknown';

const formatDateTimeISO = (dateTime) => {
  if (!dateTime?.date) {
    return new Date().toISOString();
  }

  const baseDate = new Date(dateTime.date);

  if (dateTime.time) {
    const [timePart, meridiem] = dateTime.time.split(' ');
    const [hoursRaw, minutesRaw] = timePart.split(':');
    let hours = Number(hoursRaw);
    const minutes = Number(minutesRaw) || 0;

    if (meridiem === 'PM' && hours < 12) {
      hours += 12;
    }
    if (meridiem === 'AM' && hours === 12) {
      hours = 0;
    }

    baseDate.setHours(hours, minutes, 0, 0);
  }

  return baseDate.toISOString();
};

const getPaymentReference = (payment = {}) =>
  payment.reference ||
  payment.paymentIntentId ||
  payment.transactionId ||
  DEFAULT_PAYMENT_REFERENCE;

const getContactInfo = (contact = {}) => ({
  fname: contact.fullName || 'ND Cleaners Client',
  email: contact.email || 'client@ndcleaners.com',
  mobile: contact.phone || '',
});

const getBuildingTypeLabel = (buildingTypeId) =>
  BUILDING_TYPES.find((type) => type.id === buildingTypeId)?.name || 'Office';

const getContactTimingLabel = (contactTimingId) =>
  CONTACT_TIMES.find((time) => time.id === contactTimingId)?.name || 'Morning';

const getImagesArray = (images = []) => images.filter(Boolean);

export const buildResidentialBookingPayload = (booking) => ({
  location: getLocation(booking),
  Frequency: getFrequencyLabel(booking.frequency),
  NoOfBathrooms: getBathroomsCount(booking.bathrooms),
  NoOfBedrooms: getBedroomsCount(booking.bedrooms),
  Extras: getExtrasNames(booking.extras),
  CleaningProducts: getCleaningProductsLabel(booking.cleaningProducts),
  isPets: Boolean(booking.hasPets),
  isPetsDescription: booking.hasPets ? 'Pets present' : 'No pets',
  HowGetIn: getAccessMethodLabel(booking.accessMethod),
  KeyHiddenLocation:
    booking.accessMethod === 'hidden_key' ? 'Shared upon arrival' : '',
  OtherDescriptionGetIn:
    booking.accessMethod === 'other'
      ? booking.specialNotes || 'Additional instructions provided'
      : '',
  Notes: booking.specialNotes || 'No additional notes',
  DateTime: formatDateTimeISO(booking.dateTime),
  Address: getAddressString(booking.address),
  TotalPrice: Math.round(booking.pricing?.finalTotal || booking.pricing?.total || 0),
});

export const buildHourlyBookingPayload = (booking) => ({
  location: getLocation(booking),
  Frequency: getFrequencyLabel(booking.frequency),
  NoOfHours: Number(booking.hours) || 1,
  NoOfCleaners: Number(booking.numberOfCleaners) || 1,
  NoOfBedrooms: getBedroomsCount(booking.bedrooms),
  NoOfBathrooms: getBathroomsCount(booking.bathrooms),
  Extras: getExtrasNames(booking.extras),
  isPets: Boolean(booking.hasPets),
  isPetsDescription: booking.hasPets ? 'Pets present' : 'No pets',
  HowGetIn: getAccessMethodLabel(booking.accessMethod),
  KeyHiddenLocation:
    booking.accessMethod === 'hidden_key' ? 'Shared upon arrival' : '',
  OtherDescriptionGetIn:
    booking.accessMethod === 'other'
      ? booking.specialNotes || 'Additional instructions provided'
      : '',
  Notes: booking.specialNotes || 'No additional notes',
  DateTime: formatDateTimeISO(booking.dateTime),
  Address: getAddressString(booking.address),
  TotalPrice: Math.round(booking.pricing?.finalTotal || booking.pricing?.total || 0),
  Payment: getPaymentReference(booking.payment),
});

export const buildCommercialBookingPayload = (booking) => ({
  location: getLocation(booking),
  Frequency: getFrequencyLabel(booking.frequency),
  BuildingType: getBuildingTypeLabel(booking.buildingType),
  ContactTiming: getContactTimingLabel(booking.bestContactTime),
  Comments: booking.commercialComments || 'No additional comments',
  Images: getImagesArray(booking.commercialImages),
  DateTime: formatDateTimeISO(booking.dateTime),
  Address: getAddressString(booking.address),
  TotalPrice: Math.round(booking.pricing?.finalTotal || booking.pricing?.total || 0),
  ContactInfo: getContactInfo(booking.contact),
});

export const buildHomeOrganizingBookingPayload = (booking) => ({
  location: getLocation(booking),
  NoOfHours: Number(booking.organizingHours) || 3,
  Description: booking.organizingDescription || 'Home organizing service',
  Images: getImagesArray(booking.organizingImages),
  DateTime: formatDateTimeISO(booking.dateTime),
  Address: getAddressString(booking.address),
  Payment: getPaymentReference(booking.payment),
  TotalPrice: Math.round(booking.pricing?.finalTotal || booking.pricing?.total || 0),
});

export const getBookingPayloadBuilder = (serviceType) => {
  switch (serviceType) {
    case SERVICE_TYPES.RESIDENTIAL:
      return buildResidentialBookingPayload;
    case SERVICE_TYPES.HOURLY_STANDARD:
      return buildHourlyBookingPayload;
    case SERVICE_TYPES.COMMERCIAL:
      return buildCommercialBookingPayload;
    case SERVICE_TYPES.HOME_ORGANIZING:
      return buildHomeOrganizingBookingPayload;
    default:
      return null;
  }
};

