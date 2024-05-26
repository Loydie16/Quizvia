/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#005a8d",
        "custom-green": "#7EBD01",
        "custom-orange": "#FF6B35",
        "custom-gray": "#fbfaff",
        "custom-light-dark": "#181a20",
        "custom-dark": "#987d59",
      },
      screens: {
        xs: { max: "400px" },
      },
    },
  },
  plugins: [],
};
