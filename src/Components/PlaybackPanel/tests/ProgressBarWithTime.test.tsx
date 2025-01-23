/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { describe, expect, it, vi } from "vitest";
import { getAppStore } from "../../../reduxStore/store";
import * as videoUtils from "../../usePlayerFactory/PlayerFactory/classes/utils/getVideoElement";
import ProgressBarWithTime from "../progressBar/ProgressBarWithTime";
import configureStore from "redux-mock-store";

describe("src/Components/PlaybackPanel/tests/ProgressBarWithTime.test.tsx", () => {
  const mockStore = configureStore([]);
  const storeVariants = {
    minimizedScreenWithoutOverlay: {
      VideoFullScreen: { value: false },
      OverlayVisible: { value: false },
    },
    fullScreenWithoutOverlay: {
      VideoFullScreen: { value: true },
      OverlayVisible: { value: false },
    },
    minimizedScreenWithOverlay: {
      VideoFullScreen: { value: false },
      OverlayVisible: { value: true },
    },
    fullScreenWithOverlay: {
      VideoFullScreen: { value: true },
      OverlayVisible: { value: true },
    },
  };
  describe("displaying ProgressBarWithTime component", () => {
    const video = document.createElement("video");

    it("should hide component", () => {
      const mockedStore = mockStore(storeVariants.minimizedScreenWithoutOverlay);
      vi.spyOn(videoUtils, "getNullableVideoElement").mockReturnValue(video);

      const { getByTestId } = render(
        <Provider store={mockedStore}>
          <ProgressBarWithTime />
        </Provider>
      );

      const progressBar = getByTestId("progressBarWithTime");
      expect(progressBar).not.toHaveClass("show");
    });
    it("should hide component", () => {
      const mockedStore = mockStore(storeVariants.minimizedScreenWithOverlay);
      vi.spyOn(videoUtils, "getNullableVideoElement").mockReturnValue(video);

      const { getByTestId } = render(
        <Provider store={mockedStore}>
          <ProgressBarWithTime />
        </Provider>
      );

      const progressBar = getByTestId("progressBarWithTime");
      expect(progressBar).not.toHaveClass("show");
    });
    it("should hide component", () => {
      const mockedStore = mockStore(storeVariants.fullScreenWithoutOverlay);
      vi.spyOn(videoUtils, "getNullableVideoElement").mockReturnValue(video);

      const { getByTestId } = render(
        <Provider store={mockedStore}>
          <ProgressBarWithTime />
        </Provider>
      );

      const progressBar = getByTestId("progressBarWithTime");
      expect(progressBar).not.toHaveClass("show");
    });
    it("should NOT render component", () => {
      vi.spyOn(videoUtils, "getNullableVideoElement").mockReturnValue(null);

      const { container } = render(
        <Provider store={getAppStore()}>
          <ProgressBarWithTime />
        </Provider>
      );

      expect(container.firstChild).toBeNull();
    });
    it("should display component", () => {
      const mockedStore = mockStore(storeVariants.fullScreenWithOverlay);

      vi.spyOn(videoUtils, "getNullableVideoElement").mockReturnValue(video);

      const { getByTestId } = render(
        <Provider store={mockedStore}>
          <ProgressBarWithTime />
        </Provider>
      );

      const progressBar = getByTestId("progressBarWithTime");
      expect(progressBar).toHaveClass("show");
    });
  });
});
