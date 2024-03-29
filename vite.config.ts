import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const noAttr = () => {
  return {
    name: "no-attribute",
    transformIndexHtml(html: any) {
      return html
        .replace(`type="module" crossorigin`, "defer")
        .replace("crossorigin", "");
    },
  };
};

export default defineConfig({
  plugins: [
    react(),
    noAttr(),
    {
      name: "iife-wrapper",
      apply: "build",
      renderChunk(code) {
        return `(function() {\n${code}\n})();`;
      },
    },
  ],
  // Thought this was better to get a fresh build, but then we fight with browser cache
  // build: {
  //   rollupOptions: {
  //     output: {
  //       entryFileNames: "ipart-name.js",
  //       assetFileNames: "ipart-name.css",
  //     },
  //   },
  // },
  base:
    process.env.BASE_URL ||
    "https://smartsuite.blob.core.windows.net/iparts/IPARTNAME/",
});
