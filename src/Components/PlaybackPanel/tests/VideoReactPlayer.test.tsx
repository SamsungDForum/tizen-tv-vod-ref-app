import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import videoContent from "../../../data/VideoContent.json";
import VideoReactPlayer from "../VideoReactPlayer";
import { PlayerType } from "../../usePlayerFactory/types/PlayerType";

describe("src/Components/PlaybackPanel/tests/VideoReactPlayer.test.tsx", () => {
  const mockStore = configureStore([]);
  const mockPlayerRef = { current: null };
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
  const storeVariants = {
    fullScreen: {
      VideoFullScreen: { value: true },
      OverlayVisible: { value: false },
      SubtitleOverlay: { value: true },
      playAsset: { value: { media: videoContent[0] } },
    },
    standardScreen: {
      VideoFullScreen: { value: false },
      OverlayVisible: { value: false },
      SubtitleOverlay: { value: true },
      playAsset: { value: { media: videoContent[0] } },
    },
  };

  describe("rendering videoReactPlayer component", () => {
    it("should display fullscreen video with player control bar (null player source)", () => {
      const mockedStore = mockStore(storeVariants.fullScreen);
      const { container } = render(
        <Provider store={mockedStore}>
          <VideoReactPlayer playerRef={mockPlayerRef} playbackSettings={playbackSettings} />
        </Provider>
      );

      const playerControls = container.querySelector(".video-player-control-bar");
      expect(playerControls).toBeInTheDocument();
    });

    it("should display standard screen video with hidden control bar (mocked player source)", () => {
      const mockedStore = mockStore(storeVariants.standardScreen);
      const { container } = render(
        <Provider store={mockedStore}>
          <VideoReactPlayer playerRef={mockPlayerRef} playbackSettings={playbackSettings} />
        </Provider>
      );

      const playerControls = container.querySelector(".video-player-control-bar");
      expect(playerControls).not.toBeInTheDocument();

      const classHide = container.querySelector(".hide");
      expect(classHide).toBeInTheDocument();
    });
  });
});
