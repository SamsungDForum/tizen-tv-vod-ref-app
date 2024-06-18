/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const type = "dashjs";

const version = [
  {
    type: type,
    version: "4.7.1",
    args: {
      src: "https://cdn.jsdelivr.net/npm/dashjs@4.7.1/dist/dash.all.min.js",
    },
  },
  {
    type: type,
    version: "4.5.2",
    args: {
      src: "https://cdn.jsdelivr.net/npm/dashjs@4.5.2/dist/dash.all.min.js",
    },
  },
  {
    type: type,
    version: "4.5.2 debug",
    args: {
      src: "https://cdn.jsdelivr.net/npm/dashjs@4.5.2/dist/dash.all.debug.js",
    },
  },
];

export { type, version };
