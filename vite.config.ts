import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import WindiCSS from "vite-plugin-windicss";
import checker from "vite-plugin-checker";

export default defineConfig({
  plugins: [
    solidPlugin(),
    WindiCSS({
      scan: {
        fileExtensions: ["html", "js", "ts", "jsx", "tsx"],
      },
    }),
    checker({ typescript: true }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
