/**
 * Booking Slice
 * Manages all booking-related state
 */

import { createSlice } from '@reduxjs/toolkit';
import { SERVICE_TYPES } from '@constants';

const initialState = {
  // Step 1: Borough
  borough: null,

  // Step 2: Service Type
  serviceType: null,

  // Step 3: Service Details
  frequency: 'one_time',
  bedrooms: null,
  bathrooms: null,
  extras: [],
  cleaningProducts: 'normal',
  hasPets: null,
  petsDescription: '',
  accessMethod: null,
  keyLocation: '',
  otherAccessInfo: '',
  specialNotes: '',

  // Hourly Standard specific
  hours: 3,
  numberOfCleaners: 1,

  // Commercial specific
  buildingType: null,
  bestContactTime: null,
  commercialComments: '',
  commercialImages: [],

  // Home Organizing specific
  organizingHours: 3,
  organizingDescription: '',
  organizingImages: [],

  // Step 4: Date & Time
  dateTime: {
    date: null,
    time: null,
  },

  // Step 5: Address
  address: {
    street: '',
    apt: '',
    city: '',
    state: '',
    zipCode: '',
    fullAddress: '',
  },

  // Step 6: Payment & Contact
  payment: {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  },
  tip: {
    type: 'none',
    amount: 0,
  },
  contact: {
    fullName: '',
    phone: '',
    email: '',
    smsNotifications: true,
  },
  couponCode: '',

  // Pricing
  pricing: {
    basePrice: 0,
    extrasTotal: 0,
    subtotal: 0,
    discount: 0,
    tip: 0,
    total: 0,
  },

  // Duration
  duration: 0,

  // Booking metadata
  bookingId: null,
  status: 'draft', // draft, confirmed, cancelled
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    // Borough
    setBorough: (state, action) => {
      state.borough = action.payload;
    },

    // Service Type
    setServiceType: (state, action) => {
      state.serviceType = action.payload;
      // Reset service-specific fields when service type changes
      state.frequency = 'one_time';
      state.bedrooms = null;
      state.bathrooms = null;
      state.extras = [];
      state.hours = 3;
      state.numberOfCleaners = 1;
      state.buildingType = null;
      state.organizingHours = 3;
    },

    // Frequency
    setFrequency: (state, action) => {
      state.frequency = action.payload;
    },

    // Bedrooms & Bathrooms
    setBedrooms: (state, action) => {
      state.bedrooms = action.payload;
    },
    setBathrooms: (state, action) => {
      state.bathrooms = action.payload;
    },

    // Extras
    toggleExtra: (state, action) => {
      const extraId = action.payload;
      const index = state.extras.indexOf(extraId);
      if (index > -1) {
        state.extras.splice(index, 1);
      } else {
        state.extras.push(extraId);
      }
    },
    setExtras: (state, action) => {
      state.extras = action.payload;
    },

    // Cleaning Products
    setCleaningProducts: (state, action) => {
      state.cleaningProducts = action.payload;
    },

    // Pets
    setHasPets: (state, action) => {
      state.hasPets = action.payload;
    },
    setPetsDescription: (state, action) => {
      state.petsDescription = action.payload;
    },

    // Access Method
    setAccessMethod: (state, action) => {
      state.accessMethod = action.payload;
    },
    setKeyLocation: (state, action) => {
      state.keyLocation = action.payload;
    },
    setOtherAccessInfo: (state, action) => {
      state.otherAccessInfo = action.payload;
    },

    // Special Notes
    setSpecialNotes: (state, action) => {
      state.specialNotes = action.payload;
    },

    // Hourly Standard
    setHours: (state, action) => {
      state.hours = action.payload;
    },
    setNumberOfCleaners: (state, action) => {
      state.numberOfCleaners = action.payload;
    },

    // Commercial
    setBuildingType: (state, action) => {
      state.buildingType = action.payload;
    },
    setBestContactTime: (state, action) => {
      state.bestContactTime = action.payload;
    },
    setCommercialComments: (state, action) => {
      state.commercialComments = action.payload;
    },
    setCommercialImages: (state, action) => {
      state.commercialImages = action.payload;
    },

    // Home Organizing
    setOrganizingHours: (state, action) => {
      state.organizingHours = action.payload;
    },
    setOrganizingDescription: (state, action) => {
      state.organizingDescription = action.payload;
    },
    setOrganizingImages: (state, action) => {
      state.organizingImages = action.payload;
    },

    // Date & Time
    setDateTime: (state, action) => {
      state.dateTime = action.payload;
    },
    setDate: (state, action) => {
      state.dateTime.date = action.payload;
    },
    setTime: (state, action) => {
      state.dateTime.time = action.payload;
    },

    // Address
    setAddress: (state, action) => {
      state.address = { ...state.address, ...action.payload };
    },

    // Payment
    setPayment: (state, action) => {
      state.payment = { ...state.payment, ...action.payload };
    },

    // Tip
    setTip: (state, action) => {
      state.tip = action.payload;
    },

    // Contact
    setContact: (state, action) => {
      state.contact = { ...state.contact, ...action.payload };
    },

    // Coupon
    setCouponCode: (state, action) => {
      state.couponCode = action.payload;
    },

    // Pricing
    updatePricing: (state, action) => {
      state.pricing = action.payload;
    },

    // Duration
    setDuration: (state, action) => {
      state.duration = action.payload;
    },

    // Booking Status
    setBookingStatus: (state, action) => {
      state.status = action.payload;
    },
    setBookingId: (state, action) => {
      state.bookingId = action.payload;
    },

    // Reset
    resetBooking: () => initialState,
  },
});

export const {
  setBorough,
  setServiceType,
  setFrequency,
  setBedrooms,
  setBathrooms,
  toggleExtra,
  setExtras,
  setCleaningProducts,
  setHasPets,
  setPetsDescription,
  setAccessMethod,
  setKeyLocation,
  setOtherAccessInfo,
  setSpecialNotes,
  setHours,
  setNumberOfCleaners,
  setBuildingType,
  setBestContactTime,
  setCommercialComments,
  setCommercialImages,
  setOrganizingHours,
  setOrganizingDescription,
  setOrganizingImages,
  setDateTime,
  setDate,
  setTime,
  setAddress,
  setPayment,
  setTip,
  setContact,
  setCouponCode,
  updatePricing,
  setDuration,
  setBookingStatus,
  setBookingId,
  resetBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;

// Selectors
export const selectBooking = (state) => state.booking;
export const selectServiceType = (state) => state.booking.serviceType;
export const selectPricing = (state) => state.booking.pricing;
export const selectDateTime = (state) => state.booking.dateTime;
export const selectAddress = (state) => state.booking.address;

