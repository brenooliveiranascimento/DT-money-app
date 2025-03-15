/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      fontSize: {
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "30px",
        "4xl": "36px",
        custom: "22px",
      },
      colors: {
        primary: "#015F43",
        secondary: "#00875F",
        accent: "#00B37E",
        danger: "#AA2834",
        warning: "#F75A68",
        dark: "#121214",
        white: "#FFFFFF",
        gray: {
          1000: "#202024",
          900: "#29292E",
          800: "#323238",
          700: "#7C7C8A",
          600: "#949494",
          500: "#C4C4CC",
          400: "#E1E1E6",
        },
      },
    },
  },
  plugins: [],
};
