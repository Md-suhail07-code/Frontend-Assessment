# Frontend Assessment App

This project is a React application built with Vite and Tailwind CSS. It includes a login page, dashboard, and referral data views.

## What this app does

- Lets a user sign in with email and password.
- Stores auth token in cookies after successful login.
- Shows referral dashboard data on the main page.
- Displays detail view for individual referrals.
- Uses React Router for page navigation.

## Main project structure

- `src/main.jsx` - app entry point and router setup.
- `src/App.jsx` - defines app routes like `/login`, `/`, and fallback paths.
- `src/pages/Login.jsx` - login screen with form, validation, and API call.
- `src/pages/Dashboard.jsx` - dashboard page that fetches referral data and passes it to child components.
- `src/pages/ReferralDetails.jsx` - single referral detail page.
- `src/components/` - reusable UI parts like `Navbar`, `Overview`, `ReferralTable`, and `FooterComp`.
- `src/config/api.js` - axios instance configured with base URL and auth token header.
- `src/index.css` - global styles and Tailwind import.

## How to run it

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Open the app in the browser at the local Vite URL (usually `http://localhost:5173`).

## Available scripts

- `npm run dev` - starts the development server.
- `npm run build` - creates a production build.
- `npm run preview` - previews the production build locally.
- `npm run lint` - checks code with ESLint.

## Dependencies used

- `react`, `react-dom` - app framework.
- `react-router-dom` - routing between pages.
- `axios` - sending API requests.
- `js-cookie` - storing authentication token.
- `lucide-react` - icons library.
- `tailwindcss` and `@tailwindcss/vite` - utility-first styling.

## How the login works

- User enters email and password on `/login`.
- The form calls the API endpoint `auth/signin`.
- On success, the app saves a token in cookies and redirects to `/`.
- If login fails, an error message appears.

## How the dashboard works

- The dashboard reads the saved token from cookies.
- It requests referral data from the API endpoint `referrals`.
- Dashboard child components show metrics, service summary, referral link, and referral table.
- Search and sort options update the API request parameters.

## Protected Route

- Restricts a unauthorized user to access dashboard and referral details page, by checking the token exists in the cookies.
- A Logged out user can also be not able to access dashboard and referral details page because cookies are cleared when user logs out.