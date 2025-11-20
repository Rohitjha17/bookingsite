/**
 * Application Constants
 * All constant values used throughout the application
 */

export const BOROUGHS = [
  { id: 'brooklyn', name: 'Brooklyn', available: true },
  { id: 'manhattan', name: 'Manhattan', available: true },
  { id: 'queens', name: 'Queens', available: true },
  { id: 'bronx', name: 'Bronx', available: true },
  { id: 'staten-island', name: 'Staten Island', available: true },
];

export const SERVICE_TYPES = {
  RESIDENTIAL: 'residential',
  HOURLY_STANDARD: 'hourly_standard',
  COMMERCIAL: 'commercial',
  HOME_ORGANIZING: 'home_organizing',
};

export const SERVICE_OPTIONS = [
  {
    id: SERVICE_TYPES.RESIDENTIAL,
    name: 'Residential Home Cleaning',
    description: 'Professional cleaning for your home',
    icon: '🏠',
  },
  {
    id: SERVICE_TYPES.HOURLY_STANDARD,
    name: 'Hourly Standard Home Cleaning',
    description: 'Flexible hourly cleaning service',
    icon: '⏰',
  },
  {
    id: SERVICE_TYPES.COMMERCIAL,
    name: 'Commercial Cleaning',
    description: 'Office and commercial space cleaning',
    icon: '🏢',
  },
  {
    id: SERVICE_TYPES.HOME_ORGANIZING,
    name: 'Home Organizing',
    description: 'Professional organizing services',
    icon: '📦',
  },
];

export const FREQUENCY_OPTIONS = [
  { id: 'one_time', name: 'One Time', backendValue: 'OneTime', discount: 0 },
  { id: 'monthly', name: 'Monthly', backendValue: 'Monthly', discount: 10 },
  { id: 'every_2_weeks', name: 'Every 2 Weeks', backendValue: 'BiWeekly', discount: 18 },
  { id: 'weekly', name: 'Weekly', backendValue: 'Weekly', discount: 27 },
];

export const BEDROOM_OPTIONS = [
  { id: 'studio', name: 'Studio', price: 0 },
  { id: '1_bedroom', name: '1 Bedroom', price: 55 },
  { id: '2_bedrooms', name: '2 Bedrooms', price: 110 },
  { id: '3_bedrooms', name: '3 Bedrooms', price: 165 },
  { id: '4_bedrooms', name: '4 Bedrooms', price: 220 },
  { id: '5_bedrooms', name: '5 Bedrooms', price: 275 },
];

export const BATHROOM_OPTIONS = [
  { id: '1_bathroom', name: '1 Bathroom', price: 0 },
  { id: '2_bathrooms', name: '2 Bathrooms', price: 35 },
  { id: '3_bathrooms', name: '3 Bathrooms', price: 55 },
  { id: '4_bathrooms', name: '4 Bathrooms', price: 85 },
  { id: '5_bathrooms', name: '5 Bathrooms', price: 110 },
];

export const EXTRAS = [
  { id: 'deep_cleaning', name: 'Deep Cleaning', price: 65, icon: '✨' },
  { id: 'inside_cabinets', name: 'Inside Cabinets', price: 85, icon: '🚪' },
  { id: 'fridge_cleaning', name: 'Fridge Cleaning', price: 30, icon: '❄️' },
  { id: 'oven_cleaning', name: 'Oven Cleaning', price: 30, icon: '🔥' },
  { id: 'laundry', name: 'Laundry Wash & Dry', price: 65, icon: '👕' },
  { id: 'window_cleaning', name: 'Window Cleaning', price: 30, icon: '🪟' },
  { id: 'balcony_cleaning', name: 'Balcony Cleaning', price: 30, icon: '🏠' },
  { id: 'organization', name: 'Organization', price: 55, icon: '📦' },
  { id: 'move_in_out', name: 'Move In/Out', price: 110, icon: '🚚' },
];

export const CLEANING_PRODUCTS = [
  { id: 'normal', name: 'Normal', description: 'Standard cleaning products', price: 0 },
  { id: 'green', name: 'Green Products', description: 'Organic, plant based biodegradable soaps and detergents', price: 0 },
];

export const ACCESS_METHODS = [
  { id: 'someone_home', name: 'Someone is Home' },
  { id: 'doorman', name: 'Doorman' },
  { id: 'hidden_key', name: 'Hidden Key' },
  { id: 'other', name: 'Other' },
];

export const BUILDING_TYPES = [
  { id: 'office', name: 'Office', icon: '🏢' },
  { id: 'store_retail', name: 'Store/Retail', icon: '🏪' },
  { id: 'medical_office', name: 'Medical Office', icon: '🏥' },
  { id: 'school', name: 'School', icon: '🏫' },
  { id: 'bank', name: 'Bank', icon: '🏦' },
  { id: 'factory', name: 'Factory', icon: '🏭' },
  { id: 'other', name: 'Other', icon: '🏗️' },
];

export const CONTACT_TIMES = [
  { id: 'morning', name: 'Morning' },
  { id: 'noon', name: 'Noon' },
  { id: 'afternoon', name: 'Afternoon' },
];

export const TIP_OPTIONS = [
  { id: 'none', name: 'None', amount: 0 },
  { id: '10', name: '$10', amount: 10 },
  { id: '15', name: '$15', amount: 15 },
  { id: '20', name: '$20', amount: 20 },
  { id: 'custom', name: 'Custom', amount: 0 },
];

export const BASE_PRICES = {
  RESIDENTIAL_BASE: 165,
  HOURLY_RATE: 55,
  ORGANIZING_RATE: 55,
  COMMERCIAL_BASE: 200,
};

export const DURATION_HOURS = {
  RESIDENTIAL: {
    studio: 3,
    '1_bedroom': 3,
    '2_bedrooms': 4,
    '3_bedrooms': 5,
    '4_bedrooms': 6,
    '5_bedrooms': 7,
  },
  ORGANIZING_MIN: 3,
};

export const BOOKING_STEPS = [
  { id: 1, name: 'Borough', path: '/booking/borough' },
  { id: 2, name: 'Service', path: '/booking/service' },
  { id: 3, name: 'Details', path: null }, // Dynamic based on service
  { id: 4, name: 'Date & Time', path: '/booking/datetime' },
  { id: 5, name: 'Address', path: '/booking/address' },
  { id: 6, name: 'Payment', path: '/booking/payment' },
];

export const FAQ_ITEMS = [
  {
    question: 'How much does cleaning cost?',
    answer: 'Our pricing varies based on the size of your home, frequency of cleaning, and any additional services. Studio apartments start at $165 for a one-time cleaning.',
  },
  {
    question: 'Do you bring your own cleaning supplies and equipment?',
    answer: 'Yes, we bring all necessary cleaning supplies and equipment. You can choose between our standard products or eco-friendly green products at no extra charge.',
  },
  {
    question: 'Are your cleaners insured and background checked?',
    answer: 'Absolutely. All our cleaners are fully insured, bonded, and undergo thorough background checks for your safety and peace of mind.',
  },
  {
    question: 'Can I customize the cleaning service to fit my needs?',
    answer: 'Yes! You can select specific areas to focus on, add extras like deep cleaning or inside appliances, and leave special instructions for our team.',
  },
  {
    question: 'Do I need to be home during the cleaning?',
    answer: 'No, you don\'t need to be home. Many clients provide access via doorman, hidden key, or other arrangements. Just let us know how we can get in.',
  },
];

