/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

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
