import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import esbuild from "esbuild";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      name: "load-js-files-as-jsx",
      load(id) {
        if (!id.match(/[src|__tests__]\/.*\.js$/)) {
          return;
        }

        const file = fs.readFileSync(id, "utf-8");
        return esbuild.transformSync(file, { loader: "jsx" });
      },
    },
    react(),
  ],
  test: {
    globals: true
  },
  assetsInclude: ["**/*.xml"],
});
