/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import videoContent from "../../../data/VideoContent.json";
import { render } from "@testing-library/react";
import PlaybackPanel from "../PlaybackPanel";
import { Provider } from "react-redux";
import React from "react";
import { PlayerType } from "../../usePlayerFactory/types/PlayerType";

describe("src/Components/PlaybackPanel/tests/PlaybackPanel.test.tsx", () => {
  const mockStore = configureStore([]);
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
  const mockPlayerRef = {
    current: null,
  };
  const storeVariants = {
    fullScreen: {
      VideoFullScreen: { value: true },
      playAsset: { value: { media: videoContent[0] } },
      ChannelZapping: {
        channelList: { title: "All", list: [1, 2, 4, 5, 6, 7, 8] },
        channelID: 2,
      },
      OverlayVisible: { value: false },
      LogOverlayScreen: { value: false },
      setting: { subtitle: { current: "off" } },
      SubtitleOverlay: { value: false },
    },
    standardScreen: {
      VideoFullScreen: { value: false },
      playAsset: { value: { media: videoContent[0] } },
      ChannelZapping: {
        channelList: { title: "All", list: [1, 2, 4, 5, 6, 7, 8] },
        channelID: 2,
      },
      OverlayVisible: { value: false },
      LogOverlayScreen: { value: false },
      setting: { subtitle: { current: "off" } },
      SubtitleOverlay: { value: false },
    },
  };

  describe("rendering playbackPanel component", () => {
    it("should render component with floating video with black background", () => {
      const mockedStore = mockStore(storeVariants.standardScreen);
      const { container } = render(
        <Provider store={mockedStore}>
          <PlaybackPanel playbackSettings={playbackSettings} playerRef={mockPlayerRef} />
        </Provider>
      );

      const classFloatingVideo = container.querySelector(".floating-video");
      expect(classFloatingVideo).toBeInTheDocument();

      const classBlackBackground = container.querySelector(".background-black");
      expect(classBlackBackground).toBeInTheDocument();

      const classIdWhileFloat = container.querySelector(".id-while-floating");
      expect(classIdWhileFloat).toBeInTheDocument();
    });

    it("should render video clip title with fade-out animation ", () => {
      const mockedStore = mockStore(storeVariants.fullScreen);
      const { container } = render(
        <Provider store={mockedStore}>
          <PlaybackPanel playbackSettings={playbackSettings} playerRef={mockPlayerRef} />
        </Provider>
      );

      const classVideoTitle = container.querySelector(".video-clip-title");
      expect(classVideoTitle).toBeInTheDocument();

      const classFadeOut = container.querySelector(".fade-out-animation");
      expect(classFadeOut).toBeInTheDocument();
    });
  });
});
