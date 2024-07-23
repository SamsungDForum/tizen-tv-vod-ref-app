/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ChannelInfo from "../ChannelInfo";
import videoContent from "../../../data/VideoContent.json";

describe("src/Components/PlaybackPanel/ChannelInfo.test.tsx", () => {
  const mockStore = configureStore([]);
  const storeVariants = {
    fullScreen: {
      VideoFullScreen: { value: true },
      playAsset: { value: { media: videoContent[0] } },
      ChannelZapping: {
        channelList: { title: "All", list: [1, 2, 4, 5, 6, 7, 8] },
        channelID: 2,
      },
      OverlayVisible: { value: false },
    },
    standardScreenWithOverlay: {
      VideoFullScreen: { value: false },
      playAsset: { value: { media: videoContent[0] } },
      ChannelZapping: {
        channelList: { title: "All", list: [1, 2, 4, 5, 6, 7, 8] },
        channelID: 2,
      },
      OverlayVisible: { value: true },
    },
    standardSceenWithoutOverlay: {
      VideoFullScreen: { value: false },
      playAsset: { value: { media: videoContent[0] } },
      ChannelZapping: {
        channelList: { title: "All", list: [1, 2, 4, 5, 6, 7, 8] },
        channelID: 2,
      },
      OverlayVisible: { value: false },
    },
  };

  describe("rendering channel with different className variants", () => {
    it("should display fullScreen video with hidden overlay", () => {
      const mockedStore = mockStore(storeVariants.fullScreen);
      const { container } = render(
        <Provider store={mockedStore}>
          <ChannelInfo />
        </Provider>
      );

      const classChannelInfo = container.querySelector(".channel-info");
      expect(classChannelInfo).toBeInTheDocument();

      const classHide = container.querySelector(".hide");
      expect(classHide).toBeInTheDocument();
    });

    it("should display floating info with visible overlay", () => {
      const mockedStore = mockStore(storeVariants.standardScreenWithOverlay);
      const { container } = render(
        <Provider store={mockedStore}>
          <ChannelInfo />
        </Provider>
      );

      const classChannelInfoFloating = container.querySelector(
        ".channel-info-floating"
      );
      expect(classChannelInfoFloating).toBeInTheDocument();

      const classHide = container.querySelector(".hide");
      expect(classHide).not.toBeInTheDocument();
    });
  });

  describe("rendering component content", () => {
    it("should display 'currentChannel / allChannelsCount'", async () => {
      const mockedStore = mockStore(storeVariants.fullScreen);
      render(
        <Provider store={mockedStore}>
          <ChannelInfo />
        </Provider>
      );

      const channelInfo = screen.findByText("3 / 7");
      expect(await channelInfo).toBeVisible();
    });
  });
});
