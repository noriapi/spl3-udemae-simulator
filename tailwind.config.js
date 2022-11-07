import { defineConfig } from "windicss/helpers";

export default defineConfig({
  darkMode: false,
  theme: {
    fontFamily: {
      body: [
        '"游ゴシック体"',
        "YuGothic",
        '"游ゴシック"',
        '"Yu Gothic"',
        "sans-serif",
      ],
    },
    extend: {
      colors: {
        yellow: "#eefa14",
        blue: "#7c68fc",
      },
    },
  },
  plugins: [
    require("windicss/plugin/typography"),
    require("windicss/plugin/forms"),
  ],
});
