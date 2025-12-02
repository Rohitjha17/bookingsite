/**
 * Redux Store Configuration
 * Centralized state management for the booking application
 */

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import bookingReducer from './slices/bookingSlice';
import uiReducer from './slices/uiSlice';

// Persist configuration - only persist booking data
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['booking'], // Only persist booking slice, not UI state
};

const rootReducer = combineReducers({
  booking: bookingReducer,
  ui: uiReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore date objects in actions and redux-persist actions
        ignoredActions: [
          'booking/setDateTime',
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PURGE',
        ],
        ignoredPaths: ['booking.dateTime.date', '_persist'],
      },
    }),
});

export const persistor = persistStore(store);

export default store;

