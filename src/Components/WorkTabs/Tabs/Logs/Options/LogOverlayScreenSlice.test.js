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
