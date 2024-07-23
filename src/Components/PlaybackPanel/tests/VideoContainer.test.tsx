/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import VideoContainer from "../VideoContainer";
import videoContent from "../../../data/VideoContent.json";
import { PlayerType } from "../../usePlayerFactory/types/PlayerType";

describe("src/Components/PlaybackPanel/VideoContainer.test.tsx", () => {
  const mockStore = configureStore([]);
  const storeVariants = {
    fullScreen: {
      VideoFullScreen: { value: true },
      OverlayVisible: { value: false },
      LogOverlayScreen: { showPlayerLogs: false },
      SubtitleOverlay: { value: true },
      playAsset: { value: { media: videoContent[0] } },
    },
    fullScreenWithOVerlay: {
      VideoFullScreen: { value: true },
      OverlayVisible: { value: true },
      LogOverlayScreen: { showPlayerLogs: false },
      SubtitleOverlay: { value: true },
      playAsset: { value: { media: videoContent[0] } },
    },
    standardScreen: {
      VideoFullScreen: { value: false },
      OverlayVisible: { value: true },
      LogOverlayScreen: { showPlayerLogs: false },
      SubtitleOverlay: { value: true },
      playAsset: { value: { media: videoContent[0] } },
    },
  };
  const playbackSettings = {
    source: {
      current: {
        id: 1,
        trackId: 5,
        label: "test label",
        type: "hlsjs" as PlayerType,
        version: "latest",
        args: {
          src: "https://cdn.jsdelivr.net/npm/hls.js@latest",
        },
        isDefault: false,
      },
    },
    settingPanel: false,
    audio: { current: "", list: [] },
    subtitle: { current: "", list: [] },
    videoQuality: { current: "", list: [] },
    keySystem: { current: "", list: [] },
  };
  const defaultProps = {
    playbackSettings: playbackSettings,
    playerRef: { current: null },
  };
  describe("rendering videoContainer component", () => {
    it("should display fullScreen video with no overlay", () => {
      const mockedStore = mockStore(storeVariants.fullScreen);
      const { container } = render(
        <Provider store={mockedStore}>
          <VideoContainer playerRef={defaultProps.playerRef} playbackSettings={defaultProps.playbackSettings} />
        </Provider>
      );

      const fullScreen = container.querySelector(".logs-on-video");
      expect(fullScreen).toBeInTheDocument();

      const overlayOn = container.querySelector(".logs-on-video-with-overlay");
      expect(overlayOn).not.toBeInTheDocument();

      const overlayOff = container.querySelector(".logs-on-video-no-overlay");
      expect(overlayOff).toBeInTheDocument();
    });

    it("should display fullscreen video with overlay", () => {
      const mockedStore = mockStore(storeVariants.fullScreenWithOVerlay);
      const { container } = render(
        <Provider store={mockedStore}>
          <VideoContainer playbackSettings={defaultProps.playbackSettings} playerRef={defaultProps.playerRef} />
        </Provider>
      );

      const fullScreen = container.querySelector(".logs-on-video");
      expect(fullScreen).toBeInTheDocument();

      const overlayOn = container.querySelector(".logs-on-video-with-overlay");
      expect(overlayOn).toBeInTheDocument();

      const overlayOff = container.querySelector(".logs-on-video-no-overlay");
      expect(overlayOff).not.toBeInTheDocument();
    });

    it("should display standard screen video", () => {
      const mockedStore = mockStore(storeVariants.standardScreen);
      const { container } = render(
        <Provider store={mockedStore}>
          <VideoContainer playbackSettings={defaultProps.playbackSettings} playerRef={defaultProps.playerRef} />
        </Provider>
      );

      const fullScreen = container.querySelector(".logs-on-video");
      expect(fullScreen).not.toBeInTheDocument();
    });
  });
});
