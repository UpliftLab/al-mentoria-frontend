/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        lime: {
          400: '#a2ce11',
          500: '#97bf0f',
          600: '#83a70c',
        },
      },
    },
  },
  plugins: [],
};
