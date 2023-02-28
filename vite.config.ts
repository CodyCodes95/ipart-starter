import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const noAttr = () => {
  return {
    name: "no-attribute",
    transformIndexHtml(html: any) {
      return html.replace(`type="module" crossorigin`, "defer");
    },
  };
};

export default defineConfig({
  plugins: [react(), noAttr()],
  base: "https://smartsuite.blob.core.windows.net/iparts/IPARTNAME/",
});
