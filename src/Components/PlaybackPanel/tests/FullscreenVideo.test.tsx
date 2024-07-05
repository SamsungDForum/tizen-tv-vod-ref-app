import "@testing-library/jest-dom";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import FullscreenVideo from "../FullscreenVideo";
import { getAppStore } from "../../../reduxStore/store";

describe("src/Components/PlaybackPanel/FullScreenVideo.test.tsx", () => {
  const mockStore = configureStore([]);
  const storeVariants = {
    fullScreen: {
      VideoFullScreen: { value: true },
    },
    standardScreen: {
      VideoFullScreen: { value: false },
    },
  };

  describe("rendering FullScreenVideo component", () => {
    it("should not render component content", () => {
      const mockedStore = mockStore(storeVariants.fullScreen);
      const { container } = render(
        <Provider store={mockedStore}>
          <FullscreenVideo />
        </Provider>
      );

      const fullScreenSection = container.querySelector(".fullscreen-section");
      expect(fullScreenSection).not.toBeInTheDocument();
    });

    it("should render component content", () => {
      const mockedStore = mockStore(storeVariants.standardScreen);
      const { container } = render(
        <Provider store={mockedStore}>
          <FullscreenVideo />
        </Provider>
      );

      const fullScreenSection = container.querySelector(".fullscreen-section");
      expect(fullScreenSection).toBeInTheDocument();
    });
  });

  describe("fire button onClick", () => {
    it("should set video size to fullscreen and hide this component", () => {
      const { container } = render(
        <Provider store={getAppStore()}>
          <FullscreenVideo />
        </Provider>
      );

      const button = screen.getByRole("button");
      fireEvent.click(button);

      const fullScreenSection = container.querySelector(".fullscreen-section");
      expect(fullScreenSection).not.toBeInTheDocument();
    });
  });
});
