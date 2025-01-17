/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { dispatch, getAppStore } from "../../../../reduxStore/store";
import React from "react";
import { ControlPanel } from "../ControlPanel";
import { playbackHandlers } from "../../controls/playbackHandlers";
import { setVideoFullScreenOn } from "../../VideoFullScreenSlice";

describe("src/Components/PlaybackPanel/controls/tests/ControlPanel.test.tsx", () => {
  const pbHandlers = playbackHandlers({
    video: new HTMLVideoElement(),
    setSubtitleText: () => {},
    subtitleText: "subtitleText",
  });

  describe("Testing ControlPanel component", () => {
    it("should display styling for fullscreen video", () => {
      dispatch(setVideoFullScreenOn(true));
      const { container } = render(
        <Provider store={getAppStore()}>
          <ControlPanel buttonClickHandlers={pbHandlers} />
          <div id={"elVideo"} />
        </Provider>
      );

      const classVideoPlayer = container.querySelector(".video-player-control-panel-container");
      expect(classVideoPlayer).toBeInTheDocument();
    });

    it("should display all necessary components", () => {
      const { container } = render(
        <Provider store={getAppStore()}>
          <ControlPanel buttonClickHandlers={pbHandlers} />
          <div id={"elVideo"} />
        </Provider>
      );

      const isFullSceenButton = container.querySelector(".video-player-fullscreen-control");
      expect(isFullSceenButton).toBeInTheDocument();

      const isRestartControlButton = container.querySelector(".video-player-restart-control");
      expect(isRestartControlButton).toBeInTheDocument();

      const isRewindCOntrolButton = container.querySelector(".video-player-rew-control");
      expect(isRewindCOntrolButton).toBeInTheDocument();

      const isFastForwardControlButton = container.querySelector(".video-player-ffw-control");
      expect(isFastForwardControlButton).toBeInTheDocument();

      const isStopControlPanel = container.querySelector(".video-player-stop-control");
      expect(isStopControlPanel).toBeInTheDocument();
    });
  });
});
