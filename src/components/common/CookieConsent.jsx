/**
 * CookieConsent Component
 * Cookie consent banner
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCookieConsent } from '@store/slices/uiSlice';
import Button from '@components/ui/Button';

const CookieConsent = () => {
  const dispatch = useDispatch();
  const cookieConsent = useSelector((state) => state.ui.cookieConsent);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem('cookieConsent');
    if (consent) {
      dispatch(setCookieConsent(consent === 'true'));
    } else {
      setShow(true);
    }
  }, [dispatch]);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    dispatch(setCookieConsent(true));
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'false');
    dispatch(setCookieConsent(false));
    setShow(false);
  };

  if (!show || cookieConsent !== null) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm">
          Please provide consent for the use of cookies and data processing to allow us to analyze your interaction
          with the site, improve its functionality, and provide personalized content.
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleDecline}
            className="!bg-gray-700 !text-white !border-gray-600 hover:!bg-gray-600"
          >
            Decline
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleAccept}
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;

