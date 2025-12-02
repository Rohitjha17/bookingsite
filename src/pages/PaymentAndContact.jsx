/**
 * PaymentAndContact Page
 * Enter payment and contact information
 */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setPayment,
  setTip,
  setContact,
  setCouponCode,
  setBookingStatus,
  setBookingId,
} from '@store/slices/bookingSlice';
import { setLoading, setError } from '@store/slices/uiSlice';
import { useFormNavigation } from '@hooks/useFormNavigation';
import { Button, Input, Checkbox, LoadingSpinner } from '@components/ui';
import { SERVICE_TYPES, TIP_OPTIONS } from '@constants';
import {
  formatCardNumber,
  formatExpiryDate,
  formatPhoneNumber,
  isValidCardNumber,
  isValidExpiryDate,
  isValidCVV,
  isValidEmail,
  isValidPhone,
} from '@utils/validation';
import { bookingAPI } from '@services/api';
import {
  buildResidentialBookingPayload,
  buildHourlyBookingPayload,
  buildCommercialBookingPayload,
  buildHomeOrganizingBookingPayload,
} from '@utils/payloadBuilders';
import clsx from 'clsx';

const PaymentAndContact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { goToPreviousStep } = useFormNavigation();
  const booking = useSelector((state) => state.booking);
  const loading = useSelector((state) => state.ui.loading);

  const [formData, setFormData] = useState({
    cardNumber: booking.payment.cardNumber || '',
    expiryDate: booking.payment.expiryDate || '',
    cvv: booking.payment.cvv || '',
    fullName: booking.contact.fullName || '',
    phone: booking.contact.phone || '',
    email: booking.contact.email || '',
    smsNotifications: booking.contact.smsNotifications,
  });

  const [errors, setErrors] = useState({});
  const [selectedTip, setSelectedTip] = useState(booking.tip.type || 'none');
  const [customTip, setCustomTip] = useState('');
  const [couponInput, setCouponInput] = useState(booking.couponCode || '');
  const [submissionError, setSubmissionError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let formattedValue = value;

    // Format card number
    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    }

    // Format expiry date
    if (name === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    }

    // Format phone number
    if (name === 'phone') {
      formattedValue = formatPhoneNumber(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : formattedValue,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleTipSelect = (tipOption) => {
    setSelectedTip(tipOption.id);
    if (tipOption.id !== 'custom') {
      dispatch(setTip({ type: tipOption.id, amount: tipOption.amount }));
    }
  };

  const handleCustomTipChange = (e) => {
    const value = e.target.value;
    setCustomTip(value);
    const amount = parseFloat(value) || 0;
    dispatch(setTip({ type: 'custom', amount }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!isValidCardNumber(formData.cardNumber)) {
      newErrors.cardNumber = 'Invalid card number';
    }

    if (!isValidExpiryDate(formData.expiryDate)) {
      newErrors.expiryDate = 'Invalid expiry date (MM/YY)';
    }

    if (!isValidCVV(formData.cvv)) {
      newErrors.cvv = 'Invalid CVV';
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Name is required';
    }

    if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getBookingPayloadDetails = () => {
    switch (booking.serviceType) {
      case SERVICE_TYPES.RESIDENTIAL:
        return {
          payload: buildResidentialBookingPayload(booking),
          apiCall: bookingAPI.createResidentialBooking,
        };
      case SERVICE_TYPES.HOURLY_STANDARD:
        return {
          payload: buildHourlyBookingPayload(booking),
          apiCall: bookingAPI.createHourlyBooking,
        };
      case SERVICE_TYPES.COMMERCIAL:
        return {
          payload: buildCommercialBookingPayload(booking),
          apiCall: bookingAPI.createCommercialBooking,
        };
      case SERVICE_TYPES.HOME_ORGANIZING:
        return {
          payload: buildHomeOrganizingBookingPayload(booking),
          apiCall: bookingAPI.createHomeOrganizationBooking,
        };
      default:
        return null;
    }
  };

  const handleBookNow = async () => {
    if (!validateForm()) {
      return;
    }

    // Save form data to Redux
    dispatch(
      setPayment({
        cardNumber: formData.cardNumber,
        expiryDate: formData.expiryDate,
        cvv: formData.cvv,
      })
    );

    dispatch(
      setContact({
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        smsNotifications: formData.smsNotifications,
      })
    );

    // Submit booking
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      setSubmissionError('');

      const bookingDetails = getBookingPayloadDetails();

      if (!bookingDetails) {
        throw new Error('Please select a service type before booking.');
      }

      const response = await bookingDetails.apiCall(bookingDetails.payload);

      if (response?.success === false) {
        throw new Error(response?.message || 'Unable to submit booking. Please try again.');
      }

      const bookingData = response?.data || response?.result || {};
      const backendBookingId = bookingData?._id || bookingData?.id || `BK-${Date.now()}`;

      dispatch(setBookingId(backendBookingId));
      dispatch(setBookingStatus('confirmed'));

      // Navigate to confirmation
      navigate('/booking/confirmation');
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Booking failed. Please try again.';
      dispatch(setError(errorMessage));
      setSubmissionError(errorMessage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleBack = () => {
    goToPreviousStep('/booking/payment');
  };

  const handleApplyCoupon = () => {
    if (couponInput.trim()) {
      dispatch(setCouponCode(couponInput));
      // TODO: Implement coupon validation via API
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center text-primary-600 hover:text-primary-700"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      {/* Error Alert */}
      {submissionError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-red-800">Booking Error</h3>
              <p className="text-sm text-red-700 mt-1">{submissionError}</p>
            </div>
            <button
              onClick={() => setSubmissionError('')}
              className="ml-auto text-red-400 hover:text-red-600"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Almost Done!
        </h1>
        <p className="text-gray-600">
          Enter your payment & contact info to finalize your appointment.
        </p>
      </div>

      {/* Credit Card */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Credit Card
        </h2>

        <div className="grid grid-cols-1 gap-4">
          <Input
            label="Card number"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            error={errors.cardNumber}
            required
            maxLength={19}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="MM / YY"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              placeholder="MM/YY"
              error={errors.expiryDate}
              required
              maxLength={5}
            />
            <Input
              label="CVC"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="123"
              error={errors.cvv}
              required
              maxLength={4}
            />
          </div>
        </div>

        <p className="text-sm text-gray-600">
          No payment due until after your cleaning. Satisfaction guaranteed.{' '}
          <a href="#" className="text-primary-600 hover:underline">
            View our refund policy
          </a>
        </p>
      </section>

      {/* Add a Tip */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Add a tip?
        </h2>

        <div className="grid grid-cols-5 gap-3">
          {TIP_OPTIONS.map((tip) => (
            <button
              key={tip.id}
              onClick={() => handleTipSelect(tip)}
              className={clsx(
                'p-3 rounded-lg border-2 transition-all font-medium text-center',
                selectedTip === tip.id
                  ? 'border-primary-600 bg-primary-50 text-primary-700'
                  : 'border-gray-200 hover:border-primary-300'
              )}
            >
              {tip.name}
            </button>
          ))}
        </div>

        {selectedTip === 'custom' && (
          <Input
            type="number"
            placeholder="Enter custom tip amount"
            value={customTip}
            onChange={handleCustomTipChange}
          />
        )}
      </section>

      {/* Contact Information */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Contact Information
        </h2>

        <Input
          label="Your Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="John Doe"
          error={errors.fullName}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(123) 456-7890"
            error={errors.phone}
            required
          />
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            error={errors.email}
            required
          />
        </div>

        <Checkbox
          label="Send me notifications about this appointment via text message"
          name="smsNotifications"
          checked={formData.smsNotifications}
          onChange={handleChange}
        />
      </section>

      {/* Apply Coupon */}
      <div>
        <button
          onClick={() => {
            const input = document.getElementById('coupon-input');
            input?.classList.toggle('hidden');
          }}
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Apply coupon
        </button>
        <div id="coupon-input" className="hidden mt-3 flex gap-2">
          <Input
            placeholder="Enter coupon code"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
          />
          <Button onClick={handleApplyCoupon} variant="secondary">
            Apply
          </Button>
        </div>
      </div>

      {/* Book Now Button */}
      <div className="flex justify-end pb-8">
        {submissionError && (
          <p className="text-sm text-red-600 text-right mb-3 w-full">
            {submissionError}
          </p>
        )}
        {loading && (
          <div className="flex items-center justify-center mb-4 w-full">
            <LoadingSpinner size="md" />
            <span className="ml-3 text-gray-600">Processing your booking...</span>
          </div>
        )}
        <Button
          onClick={handleBookNow}
          loading={loading}
          disabled={loading}
          size="lg"
          className="w-full sm:w-auto"
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default PaymentAndContact;

