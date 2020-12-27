module.exports = {
  purge: [
    "./src/**/*.html",
    "./src/**/*.ts",
    "./projects/**/*.html",
    "./projects/**/*.ts",
  ],
  theme: {
    extend: {
      transitionProperty: {
        left: "left",
      },
    },
  },
  variants: {},
  plugins: [],
};
