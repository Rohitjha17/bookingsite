/**
 * API Service Layer
 * Handles all API communication with the backend
 */

import axios from 'axios';

// Determine base URL based on environment
const isDevelopment = import.meta.env.MODE === 'development';
const baseURL = isDevelopment 
  ? '/api'  // Use Vite proxy in development to avoid CORS
  : '/api'; // Use Vercel serverless proxy in production to handle HTTP backend

// Create axios instance with base configuration
const api = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    const enhancedError = new Error(message);
    enhancedError.response = error.response;
    return Promise.reject(enhancedError);
  }
);

/**
 * Booking API
 */
export const bookingAPI = {
  /**
   * Residential bookings
   */
  createResidentialBooking: async (payload) => api.post('/residential-booking/', payload),
  getResidentialBooking: async (bookingId) => api.get(`/residential-booking/${bookingId}`),
  updateResidentialBooking: async (bookingId, payload) =>
    api.put(`/residential-booking/${bookingId}`, payload),
  deleteResidentialBooking: async (bookingId) => api.delete(`/residential-booking/${bookingId}`),

  /**
   * Hourly bookings
   */
  createHourlyBooking: async (payload) => api.post('/hourly-booking/', payload),
  getHourlyBooking: async (bookingId) => api.get(`/hourly-booking/${bookingId}`),
  updateHourlyBooking: async (bookingId, payload) => api.put(`/hourly-booking/${bookingId}`, payload),
  deleteHourlyBooking: async (bookingId) => api.delete(`/hourly-booking/${bookingId}`),

  /**
   * Commercial bookings
   */
  createCommercialBooking: async (payload) => api.post('/commercial-booking/', payload),
  getCommercialBooking: async (bookingId) => api.get(`/commercial-booking/${bookingId}`),
  updateCommercialBooking: async (bookingId, payload) =>
    api.put(`/commercial-booking/${bookingId}`, payload),
  deleteCommercialBooking: async (bookingId) => api.delete(`/commercial-booking/${bookingId}`),

  /**
   * Home organizing bookings
   */
  createHomeOrganizationBooking: async (payload) => api.post('/home-organization-booking/', payload),
  getHomeOrganizationBooking: async (bookingId) =>
    api.get(`/home-organization-booking/${bookingId}`),
  updateHomeOrganizationBooking: async (bookingId, payload) =>
    api.put(`/home-organization-booking/${bookingId}`, payload),
  deleteHomeOrganizationBooking: async (bookingId) =>
    api.delete(`/home-organization-booking/${bookingId}`),
};

/**
 * Address API
 */
export const addressAPI = {
  /**
   * Validate address
   */
  validateAddress: async (address) => {
    return api.post('/addresses/validate', address);
  },

  /**
   * Get address suggestions (autocomplete)
   */
  getAddressSuggestions: async (query) => {
    return api.get('/addresses/suggestions', {
      params: { q: query },
    });
  },
};

/**
 * Pricing API
 */
export const pricingAPI = {
  /**
   * Calculate price for booking
   */
  calculatePrice: async (bookingData) => {
    return api.post('/pricing/calculate', bookingData);
  },
};

/**
 * File Upload API
 */
export const uploadAPI = {
  /**
   * Upload image
   */
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    return api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  /**
   * Upload multiple images
   */
  uploadImages: async (files) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    return api.post('/upload/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default api;

