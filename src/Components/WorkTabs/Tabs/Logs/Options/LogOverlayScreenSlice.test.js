/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { it, expect, describe } from "vitest";
import logOverlayReducer from "./LogOverlayScreenSlice";
import { starterLogFilters } from "./LogOverlayScreenSlice";
describe("slice LogOverlayScreenSlice", () => {
  const initialState = undefined;
  const uselessAction = { type: "" };

  it("should have its initial value set as false", () => {
    const result = logOverlayReducer(initialState, uselessAction);

    expect(result.autoscroll).toBe(true);
    expect(result.showPlayerLogs).toBe(false);
    expect(result.stringArray).toBe(starterLogFilters);
  });
});
