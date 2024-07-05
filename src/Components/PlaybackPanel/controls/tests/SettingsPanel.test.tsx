import "@testing-library/jest-dom";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import SettingsPanel from "../SettingsPanel";
import { dispatch, getAppStore, getState } from "../../../../reduxStore/store";
import { setVideoFullScreenOn } from "../../VideoFullScreenSlice";
import { toggleShowPlayerLogs } from "../../../WorkTabs/Tabs/Logs/Options/LogOverlayScreenSlice";

describe("src/Components/PlaybackPanel/controls/tests/SettingsPanel.test.tsx", () => {
  describe("Testing SettingsPanel component ", () => {
    it("should display styling for fullScreen video", () => {
      dispatch(setVideoFullScreenOn(true));
      const { container } = render(
        <Provider store={getAppStore()}>
          <SettingsPanel />
        </Provider>
      );

      const classVideoPlayerSettings = container.querySelector(".video-player-settings-panel-control");
      expect(classVideoPlayerSettings).toBeInTheDocument();

      const classFadeOutAnimation = container.querySelector(".fade-out-animation");
      expect(classFadeOutAnimation).toBeInTheDocument();
    });

    it("should fire StyledButton and change state of PlayerLogs state", () => {
      dispatch(toggleShowPlayerLogs(false));
      render(
        <Provider store={getAppStore()}>
          <SettingsPanel />
        </Provider>
      );

      const btn = screen.getByText("Toggle Logs");
      expect(btn).toBeInTheDocument();

      fireEvent.click(btn);
      const isPlayerLogs = getState().LogOverlayScreen.showPlayerLogs;
      expect(isPlayerLogs).toBe(true);

      fireEvent.click(btn);
      const isPlayerLogs2 = getState().LogOverlayScreen.showPlayerLogs;
      expect(isPlayerLogs2).toBe(false);
    });

    it("should display all necessary video settings components", () => {
      render(
        <Provider store={getAppStore()}>
          <SettingsPanel />
        </Provider>
      );

      const isSubtitle = screen.getByText("Subtitle");
      expect(isSubtitle).toBeInTheDocument();

      const isAudio = screen.getByText("Audio");
      expect(isAudio).toBeInTheDocument();

      const isQuality = screen.getByText("Quality");
      expect(isQuality).toBeInTheDocument();

      const isDRM = screen.getByText("DRM");
      expect(isDRM).toBeInTheDocument();

      const isView = screen.getByText("View");
      expect(isView).toBeInTheDocument();
    });
  });
});
