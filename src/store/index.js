/**
 * Redux Store Configuration
 * Centralized state management for the booking application
 */

import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from './slices/bookingSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore date objects in actions
        ignoredActions: ['booking/setDateTime'],
        ignoredPaths: ['booking.dateTime.date'],
      },
    }),
});

export default store;

