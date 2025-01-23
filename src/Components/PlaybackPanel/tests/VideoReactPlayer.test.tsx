/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { describe, expect, it, vi } from "vitest";
import { getAppStore } from "../../../reduxStore/store";
import { PlayerType } from "../../usePlayerFactory/types/PlayerType";
import VideoReactPlayer from "../VideoReactPlayer";
import configureStore from "redux-mock-store";
import videoContent from "../../../data/VideoContent.json";
import usePlayerFactory from "../../usePlayerFactory";
import * as Settings from "../../usePlayerFactory/utils/setting";

vi.mock("../../usePlayerFactory", () => ({
  default: vi.fn(() => ({ destroyPlayer: vi.fn(() => Promise.resolve()) })),
}));
vi.mock("../../usePlayerFactory/utils/setting", () => ({
  sourceUnmount: vi.fn(() => null),
}));

describe("src/Components/PlaybackPanel/tests/VideoReactPlayer.test.tsx", () => {
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
      pending: {
        id: 1,
        trackId: 5,
        label: "test label",
        type: "hlsjs" as PlayerType,
        version: "latest",
        args: {
          src: "https://cdn.jsdelivr.net/npm/hls.js@latest",
        },
      },
    },
    settingPanel: false,
    audio: { current: "", list: [] },
    subtitle: { current: "test subtitles", list: [] },
    videoQuality: { current: "", list: [] },
    keySystem: { current: "", list: [] },
  };

  const storeVariants = {
    fullScreenWithSubtitles: {
      VideoFullScreen: { value: true },
      SubtitleOverlay: { value: "Test subtitles" },
      playAsset: { value: { media: videoContent[0] } },
      OverlayVisible: { value: false },
    },
    minimizedWithSubtitles: {
      VideoFullScreen: { value: false },
      SubtitleOverlay: { value: "Test subtitles" },
      playAsset: { value: { media: videoContent[0] } },
      OverlayVisible: { value: false },
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });
  describe("displaying subtitles", () => {
    it("should display full screen subtitles", () => {
      // Arrange section
      const mockedStore = mockStore(storeVariants.fullScreenWithSubtitles);
      const { getByTestId } = render(
        <Provider store={mockedStore}>
          <VideoReactPlayer playbackSettings={playbackSettings} />
        </Provider>
      );
      // Assert section
      const subtitle = getByTestId("subtitle");
      expect(subtitle).toBeInTheDocument();
      expect(subtitle).toHaveClass("video-subtitles-fullscreen");
    });
    it("should display minimized screen subtitles", () => {
      // Arrange section
      const mockedStore = mockStore(storeVariants.minimizedWithSubtitles);
      const { getByTestId } = render(
        <Provider store={mockedStore}>
          <VideoReactPlayer playbackSettings={playbackSettings} />
        </Provider>
      );
      // Assert section
      const subtitle = getByTestId("subtitle");
      expect(subtitle).toBeInTheDocument();
      expect(subtitle).toHaveClass("video-subtitles-floating");
    });
    it("should destroy player", async () => {
      // Arrange section
      const destroyPlayerMock = vi.fn(() => Promise.resolve());
      const sourceUnmountMock = vi.fn();

      vi.mocked(usePlayerFactory).mockReturnValue({ destroyPlayer: destroyPlayerMock } as any);
      vi.mocked(Settings).sourceUnmount = sourceUnmountMock as any;

      const localPlaybackSettings = structuredClone(playbackSettings);

      const { rerender } = render(
        <Provider store={getAppStore()}>
          <VideoReactPlayer playbackSettings={localPlaybackSettings} />
        </Provider>
      );

      // Act section
      localPlaybackSettings.source = { pending: { id: 2 } } as any;
      rerender(
        <Provider store={getAppStore()}>
          <VideoReactPlayer playbackSettings={localPlaybackSettings} />
        </Provider>
      );

      // Assert section
      await waitFor(() => {
        expect(destroyPlayerMock).toHaveBeenCalledTimes(2);
        expect(sourceUnmountMock).toHaveBeenCalledTimes(2);
      });
    });
  });
});
