/**
 * UI Slice
 * Manages UI state like loading, errors, modals, etc.
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  currentStep: 1,
  showSummary: true,
  cookieConsent: null,
  modals: {
    faq: false,
    coupon: false,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    previousStep: (state) => {
      state.currentStep -= 1;
    },
    setShowSummary: (state, action) => {
      state.showSummary = action.payload;
    },
    setCookieConsent: (state, action) => {
      state.cookieConsent = action.payload;
    },
    openModal: (state, action) => {
      state.modals[action.payload] = true;
    },
    closeModal: (state, action) => {
      state.modals[action.payload] = false;
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setCurrentStep,
  nextStep,
  previousStep,
  setShowSummary,
  setCookieConsent,
  openModal,
  closeModal,
} = uiSlice.actions;

export default uiSlice.reducer;

// Selectors
export const selectLoading = (state) => state.ui.loading;
export const selectError = (state) => state.ui.error;
export const selectCurrentStep = (state) => state.ui.currentStep;
export const selectShowSummary = (state) => state.ui.showSummary;

