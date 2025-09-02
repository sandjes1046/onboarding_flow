/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
      screens: {
        sm: '600px',
        smm: '768px',
        md: '960px',
        lg: '1280px',
        xl: '1920px',
        print: { raw: 'print' },
      },
     fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      serif: ['sans-serif', 'poppins'],
      mono: ['poppins'],
    }
  },
  plugins: [],
}