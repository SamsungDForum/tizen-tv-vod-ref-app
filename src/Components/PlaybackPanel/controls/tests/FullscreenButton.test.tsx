/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import React from "react";

import FullscreenButton, { switchOffVideoFullScreen } from "../FullscreenButton";
import { dispatch, getAppStore, getState } from "../../../../reduxStore/store";
import { setVideoFullScreenOn } from "../../VideoFullScreenSlice";

describe("src/Components/PlaybackPanel/controls/tests/FullscreenButton.test.tsx", () => {
  it("should fire button and call function passed in props", () => {
    dispatch(setVideoFullScreenOn(true));
    const switchOffVideoFullscreen = vi.fn(() => switchOffVideoFullScreen);

    render(
      <Provider store={getAppStore()}>
        <FullscreenButton />
      </Provider>
    );

    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();

    btn.addEventListener("click", switchOffVideoFullscreen);
    fireEvent.click(btn);
    expect(switchOffVideoFullscreen).toHaveBeenCalledTimes(1);

    const videoFullscreen = getState().VideoFullScreen.value;
    expect(videoFullscreen).toBe(false);
  });
});
