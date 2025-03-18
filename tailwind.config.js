const { colors } = require("./src/styles/colors");

module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      fontSize: {
        buttonRadius: "6px",
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "20px",
        custom: "22px",
        "2xl": "24px",
        "3xl": "30px",
        "4xl": "36px",
      },
      height: {
        button: 57,
      },
      colors,
    },
  },
  plugins: [],
};
