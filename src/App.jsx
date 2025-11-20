import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import BookingLayout from './layouts/BookingLayout';
import BoroughSelection from './pages/BoroughSelection';
import ServiceSelection from './pages/ServiceSelection';
import ResidentialDetails from './pages/ResidentialDetails';
import HourlyStandardDetails from './pages/HourlyStandardDetails';
import CommercialDetails from './pages/CommercialDetails';
import HomeOrganizingDetails from './pages/HomeOrganizingDetails';
import DateTimeSelection from './pages/DateTimeSelection';
import AddressInput from './pages/AddressInput';
import PaymentAndContact from './pages/PaymentAndContact';
import BookingConfirmation from './pages/BookingConfirmation';

function App() {
  return (
    <Routes>
      <Route path="/" element={<BookingLayout />}>
        <Route index element={<Navigate to="/booking/borough" replace />} />
        <Route path="booking">
          <Route path="borough" element={<BoroughSelection />} />
          <Route path="service" element={<ServiceSelection />} />
          <Route path="residential-details" element={<ResidentialDetails />} />
          <Route path="hourly-details" element={<HourlyStandardDetails />} />
          <Route path="commercial-details" element={<CommercialDetails />} />
          <Route path="organizing-details" element={<HomeOrganizingDetails />} />
          <Route path="datetime" element={<DateTimeSelection />} />
          <Route path="address" element={<AddressInput />} />
          <Route path="payment" element={<PaymentAndContact />} />
          <Route path="confirmation" element={<BookingConfirmation />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

