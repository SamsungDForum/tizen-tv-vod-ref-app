/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from "react";
import { it, expect, describe, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import SaveButton from "./SaveButton";

import * as reactRedux from 'react-redux';
vi.mock("react-redux");

describe("component SaveButton", () => {
  it("should run saveLogs once on click", () => {
    const callback = vi.fn();
    render(<SaveButton saveLogsCallback={callback}/>);

    const btn = screen.getByRole("button", { name: "Save logs to file" });
    fireEvent.click(btn);

    expect(callback.callCount).toBe(1)
  });
});
