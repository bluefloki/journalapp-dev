module.exports = {
  purge: [
    "./src/**/*.html",
    "./src/**/*.vue",
    "./src/**/*.jsx",
    "public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          default: "#212121",
          400: "#383838",
        },
        primary: {
          default: "#ea5455",
          dark: "#cf4b4c",
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
