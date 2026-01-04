import spacing from "./src/styles/functions/spacing";

export default {
  plugins: {
    "postcss-functions": {
      functions: {
        spacing,
      },
    },
    "postcss-nested": {},
    autoprefixer: {},
  },
};
