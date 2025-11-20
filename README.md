# ND Cleaners - Booking Application

A professional, production-ready cleaning service booking application built with **React**, **Redux Toolkit**, and **Tailwind CSS**.

## 🎯 Project Overview

This is a multi-step booking flow application for ND Cleaners services. Users can select their location, choose a service type, customize their booking with various options, select date/time, provide address, and complete payment.

## ✨ Features

### Core Functionality
- **Multi-step Booking Flow** with progress tracking
- **4 Service Types**:
  - Residential Home Cleaning
  - Hourly Standard Home Cleaning
  - Commercial Cleaning
  - Home Organizing

### Key Features
- ✅ Real-time price calculation
- ✅ Dynamic form validation
- ✅ Booking summary sidebar
- ✅ Frequency-based discounts
- ✅ Customizable extras and add-ons
- ✅ Date and time slot selection
- ✅ Address autocomplete ready
- ✅ Payment integration ready
- ✅ Cookie consent management
- ✅ FAQ section
- ✅ Mobile-responsive design

## 🏗️ Tech Stack

- **Frontend Framework**: React 18
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS
- **Form Handling**: Custom hooks + validation
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Date Utilities**: date-fns

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                  # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── SelectionCard.jsx
│   │   ├── Checkbox.jsx
│   │   └── ...
│   ├── common/              # Common components
│   │   ├── Header.jsx
│   │   ├── ProgressBar.jsx
│   │   └── CookieConsent.jsx
│   └── booking/             # Booking-specific components
│       └── BookingSummary.jsx
├── pages/                   # Page components
│   ├── BoroughSelection.jsx
│   ├── ServiceSelection.jsx
│   ├── ResidentialDetails.jsx
│   ├── HourlyStandardDetails.jsx
│   ├── CommercialDetails.jsx
│   ├── HomeOrganizingDetails.jsx
│   ├── DateTimeSelection.jsx
│   ├── AddressInput.jsx
│   ├── PaymentAndContact.jsx
│   └── BookingConfirmation.jsx
├── store/                   # Redux store
│   ├── index.js
│   └── slices/
│       ├── bookingSlice.js
│       └── uiSlice.js
├── services/                # API services
│   └── api.js
├── utils/                   # Utility functions
│   ├── pricing.js
│   ├── validation.js
│   └── dateTime.js
├── hooks/                   # Custom hooks
│   ├── useBookingPrice.js
│   └── useFormNavigation.js
├── constants/               # App constants
│   └── index.js
├── layouts/                 # Layout components
│   └── BookingLayout.jsx
├── App.jsx                  # Main app component
├── main.jsx                 # Entry point
└── index.css                # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your API endpoint:
   ```
   VITE_API_BASE_URL=https://your-api-url.com
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   
   The app will open at `http://localhost:3000`

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

## 🔌 API Integration

The application is designed to work with backend APIs. All API calls are centralized in `src/services/api.js`.

### Required API Endpoints

The client expects the following endpoints from the backend:

#### Bookings
- `POST /bookings` - Create new booking
- `GET /bookings/:id` - Get booking details
- `PATCH /bookings/:id` - Update booking
- `POST /bookings/:id/cancel` - Cancel booking
- `GET /bookings/available-slots` - Get available time slots

#### Payments
- `POST /payments/process` - Process payment

#### Address
- `POST /addresses/validate` - Validate address
- `GET /addresses/suggestions` - Get address suggestions

#### Coupons
- `POST /coupons/validate` - Validate coupon code

#### File Upload
- `POST /upload/image` - Upload single image
- `POST /upload/images` - Upload multiple images

### API Configuration

Update the base URL in `.env`:
```env
VITE_API_BASE_URL=https://api.yourdomain.com
```

Or modify `src/services/api.js` directly for more complex configurations.

## 🎨 Customization

### Colors
Modify `tailwind.config.js` to change the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your brand colors
      }
    }
  }
}
```

### Services
Update service types, pricing, and options in `src/constants/index.js`.

### Validation Rules
Customize validation logic in `src/utils/validation.js`.

### Pricing Logic
Adjust pricing calculations in `src/utils/pricing.js`.

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1440px+)

## 🧪 Testing

Currently, the application includes:
- Form validation
- Price calculation logic
- Input formatting

To add tests:
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

## 🔒 Security Features

- Input sanitization
- Form validation
- Secure payment handling (ready for Stripe/PayPal)
- HTTPS ready
- XSS protection
- CSRF token support (backend integration)

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📦 Build Size

- **Development**: ~2.5 MB (uncompressed)
- **Production**: ~150 KB (gzipped)

## 🚢 Deployment

### Vercel
```bash
vercel deploy
```

### Netlify
```bash
netlify deploy --prod
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 📝 Environment Variables

```env
VITE_API_BASE_URL=      # Backend API URL
VITE_APP_NAME=          # Application name
```

## 🤝 Contributing

This is a client project. Follow these guidelines:
1. Write clean, well-documented code
2. Follow existing code structure
3. Test thoroughly before commits
4. Use meaningful commit messages

## 📄 Code Standards

- **Components**: Functional components with hooks
- **State**: Redux Toolkit for global state
- **Styling**: Tailwind CSS (utility-first)
- **File naming**: PascalCase for components, camelCase for utilities
- **Comments**: JSDoc style for functions

## 🐛 Known Issues

None at the moment. Report issues to the development team.

## 🔮 Future Enhancements

- [ ] User authentication
- [ ] Booking history
- [ ] Recurring bookings dashboard
- [ ] Review/rating system
- [ ] Real-time cleaner tracking
- [ ] Multi-language support

## 📧 Support

For support or questions, contact the development team.

## 📜 License

This is proprietary software developed for ND Cleaners.

---

**Built with ❤️ using React, Redux, and Tailwind CSS**

