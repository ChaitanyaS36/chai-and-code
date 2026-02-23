/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chai-brown': '#6F4E37',
        'milk-cream': '#FFF3E0',
        'cardamom-green': '#4CAF50',
        'tea-leaf-dark': '#3E2723',
      },
    },
  },
  plugins: [],
}
