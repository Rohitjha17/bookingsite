/**
 * API Service Layer
 * Handles all API communication with the backend
 */

import axios from 'axios';

// Backend API URL (hard coded)
// Check if running on localhost (development)
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// In production, use Vercel serverless function as proxy to avoid Mixed Content error
// (HTTPS page can't call HTTP API directly, browser blocks it)
const baseURL = isDevelopment 
  ? '/api'  // Use Vite proxy in development to avoid CORS
  : '/api/proxy'; // Production: Use Vercel serverless function as proxy

// Debug: Log environment info
console.log('🌐 API Config:', {
  hostname: window.location.hostname,
  isDevelopment,
  baseURL,
  note: isDevelopment ? 'Using Vite proxy' : 'Using Vercel serverless proxy',
  fullURL: window.location.href
});

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

    // If using Vercel proxy in production, add path as query parameter
    if (!isDevelopment && config.url) {
      const apiPath = config.url.startsWith('/') ? config.url : `/${config.url}`;
      config.url = `?path=${encodeURIComponent(apiPath)}`;
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

