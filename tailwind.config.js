/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'info-blue': '#E8F3FF',
      },
    },
    screens: {
      'phone': '375px',
      'screens': '500px',
    },
  },
  plugins: [],
}

