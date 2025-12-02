/**
 * API Service Layer
 * Handles all API communication with the backend
 */

import axios from 'axios';

// Determine base URL based on environment
const isDevelopment = import.meta.env.MODE === 'development';
const baseURL = isDevelopment 
  ? '/api'  // Use Vite proxy in development to avoid CORS
  : import.meta.env.VITE_API_BASE_URL || 'https://dev.shinehub.de';

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

  /**
   * Hourly bookings
   */
  createHourlyBooking: async (payload) => api.post('/hourly-booking/', payload),

  /**
   * Commercial bookings
   */
  createCommercialBooking: async (payload) => api.post('/commercial-booking/', payload),

  /**
   * Home organizing bookings
   */
  createHomeOrganizationBooking: async (payload) => api.post('/home-organization-booking/', payload),
};

export default api;

