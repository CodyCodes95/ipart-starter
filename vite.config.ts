import { PluginOption, defineConfig } from "vite";
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

const iifeWrapper = () => {
  return {
    name: "iife-wrapper",
    apply: "build",
    renderChunk(code) {
      return `(function() {\n${code}\n})();`;
    },
  } as PluginOption;
};

export default defineConfig(({ command }) => {
  return {
    plugins: [react(), noAttr(), iifeWrapper()],
    server: {
      open: "/dev.html",
    },
    build: {
      rollupOptions: {
        // Conditionally set the entry point
        input: command === "serve" ? "public.html" : "index.html",
      },
    },
    base: process.env.BASE_URL || "http://localhost:5173/",
  };
});
