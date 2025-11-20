/**
 * Custom Hook: useFormNavigation
 * Handles navigation between booking steps
 */

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStep } from '@store/slices/uiSlice';
import { selectServiceType } from '@store/slices/bookingSlice';
import { SERVICE_TYPES } from '@constants';

export const useFormNavigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const serviceType = useSelector(selectServiceType);

  const goToNextStep = (currentPath) => {
    const routes = {
      '/booking/borough': '/booking/service',
      '/booking/service': getServiceDetailsPath(serviceType),
      '/booking/residential-details': '/booking/datetime',
      '/booking/hourly-details': '/booking/datetime',
      '/booking/commercial-details': '/booking/datetime',
      '/booking/organizing-details': '/booking/datetime',
      '/booking/datetime': '/booking/address',
      '/booking/address': '/booking/payment',
      '/booking/payment': '/booking/confirmation',
    };

    const nextPath = routes[currentPath];
    if (nextPath) {
      navigate(nextPath);
      updateStep(nextPath);
    }
  };

  const goToPreviousStep = (currentPath) => {
    const routes = {
      '/booking/service': '/booking/borough',
      '/booking/residential-details': '/booking/service',
      '/booking/hourly-details': '/booking/service',
      '/booking/commercial-details': '/booking/service',
      '/booking/organizing-details': '/booking/service',
      '/booking/datetime': getServiceDetailsPath(serviceType),
      '/booking/address': '/booking/datetime',
      '/booking/payment': '/booking/address',
    };

    const prevPath = routes[currentPath];
    if (prevPath) {
      navigate(prevPath);
      updateStep(prevPath);
    }
  };

  const goToStep = (path) => {
    navigate(path);
    updateStep(path);
  };

  const updateStep = (path) => {
    const stepMap = {
      '/booking/borough': 1,
      '/booking/service': 2,
      '/booking/residential-details': 3,
      '/booking/hourly-details': 3,
      '/booking/commercial-details': 3,
      '/booking/organizing-details': 3,
      '/booking/datetime': 4,
      '/booking/address': 5,
      '/booking/payment': 6,
    };

    const step = stepMap[path];
    if (step) {
      dispatch(setCurrentStep(step));
    }
  };

  const getServiceDetailsPath = (type) => {
    const pathMap = {
      [SERVICE_TYPES.RESIDENTIAL]: '/booking/residential-details',
      [SERVICE_TYPES.HOURLY_STANDARD]: '/booking/hourly-details',
      [SERVICE_TYPES.COMMERCIAL]: '/booking/commercial-details',
      [SERVICE_TYPES.HOME_ORGANIZING]: '/booking/organizing-details',
    };

    return pathMap[type] || '/booking/service';
  };

  return {
    goToNextStep,
    goToPreviousStep,
    goToStep,
    getServiceDetailsPath,
  };
};

