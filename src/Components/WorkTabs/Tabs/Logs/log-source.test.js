/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { it, expect, describe, vi } from "vitest";
import { startCapture, stopCapture, eventConsoleCapture, consoleLogs } from "./log-source";
import { renderHook } from "@testing-library/react-hooks";

describe("log-source", () => {
  const logMessage = "console.log";
  const warnMessage = "console.warn";
  const errorMessage = "console.error";

  // Mock the CustomEvent
  global.CustomEvent = function (event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  };

  it("log-source started. console captured", () => {
    vi.useFakeTimers();

    startCapture();
    vi.runAllTimers();

    console.log(logMessage);
    console.warn(warnMessage);
    console.error(errorMessage);
    vi.runAllTimers();

    const logs = [...consoleLogs()]
      .map((log) => log.dataLine)
      .filter(
        (logLine) => logLine.includes(logMessage) || logLine.includes(warnMessage) || logLine.includes(errorMessage)
      );
    expect(logs.length).toBe(3);

    stopCapture();
    vi.runAllTimers();

    vi.useRealTimers();
  });

  it("log-source stopped. no console capture", () => {
    vi.useFakeTimers();

    startCapture();
    vi.runAllTimers();
    stopCapture();
    vi.runAllTimers();

    console.log(logMessage);
    console.warn(warnMessage);
    console.error(errorMessage);
    vi.runAllTimers();

    const logs = [...consoleLogs()];
    expect(logs.length).toBe(0);

    vi.useRealTimers();
  });
});

describe("log-source eventConsoleCapture hook", () => {
  const logMessage = "console.log";
  const warnMessage = "console.warn";
  const errorMessage = "console.error";

  it("log-source eventConsoleCapture hook notify console capture", () => {
    vi.useFakeTimers();

    startCapture();
    vi.runAllTimers();

    const { result } = renderHook(() => eventConsoleCapture());
    console.log(logMessage);
    console.warn(warnMessage);
    console.error(errorMessage);
    vi.runAllTimers();

    stopCapture();
    vi.runAllTimers();

    const logs = result.all
      .filter((ev) => ev[0].detail)
      .map((ev) => ev[0].detail)
      .filter(
        (logLine) => logLine.includes(logMessage) || logLine.includes(warnMessage) || logLine.includes(errorMessage)
      );

    expect(logs.length).toBe(3);

    vi.useRealTimers();
  });
});
