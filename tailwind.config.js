/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'min-1100': {'min': '1100px'},
        'max-500': {'max': '500px'},
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}

