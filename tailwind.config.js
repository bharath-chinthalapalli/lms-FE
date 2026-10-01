/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        'xs': '320px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      fontFamily: {},
      colors: {
        textPrimary: "#374151",
        bgPrimary: "#2441E7",
        "primary-color": {
          50: "#eafff7",
          100: "#cdfee9",
          200: "#a0fad8",
          300: "#63f2c4",
          400: "#25e2ac",
          500: "#00dca4",
          600: "#00a47b",
          700: "#008366",
          800: "#006752",
          900: "#005545",
          950: "#003028",
        },
        r_color_secondary: colors.gray,
        r_color_orange: colors.orange,
        r_color_base: colors.white,
        r_color_red: colors.red,

        lmsPrimary:'#F0FDF4',
        lmsSecondary:'#139B48'
      },
    },
  },
  plugins: [],
};
