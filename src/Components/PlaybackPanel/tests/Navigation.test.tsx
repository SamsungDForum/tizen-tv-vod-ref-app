/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {
  handleEnterButton,
  navKeys,
  onKeyEvent,
  onKeyUpEvent,
  startHidingVideoOverlay,
  tryToHideBackOverlay,
} from "../navigation";
import { dispatch, getAppStore, getState } from "../../../reduxStore/store";
import { showConfirmation } from "../../ConfirmationModal/ConfirmationModalSlice";
import { setVideoFullScreenOn } from "../VideoFullScreenSlice";
import { createEvent, fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import PlaybackPanel from "../PlaybackPanel";
import React from "react";
import { setOverlayIsVisible } from "../OverlayVisibleSlice";
import { domRef } from "../../DOMhelper";
import { vi } from "vitest";
import { PlayerType } from "../../usePlayerFactory/types/PlayerType";
import * as utilitiesNav from "../../ModalPicker/utilities/navigation";
import * as keyEvents from "../../KeyEvents";

describe("src/Components/PlaybackPanel/tests/Navigation.test.tsx", () => {
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
  const mockOverlayTimeoutID = { current: -1 };
  const mockPlayerRef = {
    current: null,
  };

  describe("Testing navigation onKeyEvent function", () => {
    dispatch(dispatch(showConfirmation(true)));
    it("should change showConfirmation state, KeyName.Back case", () => {
      const keyEvent = {
        code: "return",
        nativeEvent: { keyIdentifier: "XF86Back" },
        keyCode: 10009,
        type: "click",
        target: document.createElement("div"),
      };

      onKeyEvent(keyEvent, [false, mockOverlayTimeoutID, false]);

      const showConfirmationState = getState().ModalSlice.showConfirm;
      expect(showConfirmationState).toBe(false);
    });

    it("video fullscreen should not be changed to smaller screen after Enter click", () => {
      dispatch(setVideoFullScreenOn(true));
      render(
        <Provider store={getAppStore()}>
          <PlaybackPanel playbackSettings={playbackSettings} playerRef={mockPlayerRef} />
        </Provider>
      );

      const targetElement = document.createElement("div");
      targetElement.classList.add("video-player-fullscreen-control");

      const keyEvent = {
        code: "enter",
        nativeEvent: { keyIdentifier: "Enter" },
        keyCode: 10009,
        type: "click",
        target: targetElement,
      };

      onKeyEvent(keyEvent, [true, mockOverlayTimeoutID, true]);

      const overlayIsVisibleState = getState().OverlayVisible.value;
      expect(overlayIsVisibleState).toBe(true);

      const videoFullScreenOnState = getState().VideoFullScreen.value;
      expect(videoFullScreenOnState).toBe(true);
    });
  });

  describe("Testing navigation onKeyUpEvent function", () => {
    it("should hide back overlay, KeyName.Back", () => {
      dispatch(setOverlayIsVisible(true));
      render(
        <Provider store={getAppStore()}>
          <PlaybackPanel playbackSettings={playbackSettings} playerRef={mockPlayerRef} />
        </Provider>
      );
      const keyEvent = {
        code: "return",
        nativeEvent: { keyIdentifier: "XF86Back" },
        keyCode: 10009,
        type: "click",
        target: document.createElement("div"),
      };

      onKeyUpEvent(keyEvent, [true, mockOverlayTimeoutID, true]);

      const overlayIsVisibleState = getState().OverlayVisible.value;
      expect(overlayIsVisibleState).toBe(false);
    });

    it("should change videoFullScreen state to false", () => {
      dispatch(setVideoFullScreenOn(true));
      render(
        <Provider store={getAppStore()}>
          <PlaybackPanel playbackSettings={playbackSettings} playerRef={mockPlayerRef} />
        </Provider>
      );

      const keyEvent = {
        code: "enter",
        nativeEvent: { keyIdentifier: "Enter" },
        keyCode: 10009,
        type: "click",
        target: document.createElement("div"),
      };

      onKeyUpEvent(keyEvent, [false, mockOverlayTimeoutID, false]);

      const videoFullScreenOnState = getState().VideoFullScreen.value;
      expect(videoFullScreenOnState).toBe(false);
    });

    it("should not change videoFullScreenOn change, ViewPickerButton should be focused", () => {
      dispatch(setVideoFullScreenOn(true));
      render(
        <Provider store={getAppStore()}>
          <PlaybackPanel playbackSettings={playbackSettings} playerRef={mockPlayerRef} />
        </Provider>
      );

      const mockHtmlElement = document.createElement("button");
      mockHtmlElement.setAttribute("id", "playerselect-refocus");

      const keyEvent = {
        code: "enter",
        nativeEvent: { keyIdentifier: "Enter" },
        keyCode: 10009,
        type: "click",
        target: mockHtmlElement,
      };

      vi.spyOn(domRef, "getPlayerSelectButton").mockReturnValue(mockHtmlElement);

      onKeyUpEvent(keyEvent, [false, mockOverlayTimeoutID, false]);

      const videoFullScreenOnState = getState().VideoFullScreen.value;
      expect(videoFullScreenOnState).toBe(true);
    });
  });

  describe("Testing startHidingVideoOverlay function", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });
    it("should chanage overlayVisible state to false", () => {
      const mockHtmlElement = document.createElement("div");
      mockHtmlElement.classList.add("top-player-window");
      mockHtmlElement.classList.add("modal-picker-open");

      vi.spyOn(utilitiesNav, "containsOpenedPickers").mockReturnValue(false);
      vi.spyOn(domRef, "getVideoLogs").mockReturnValue(mockHtmlElement);

      startHidingVideoOverlay(mockOverlayTimeoutID);
      // skip set timeout
      vi.advanceTimersByTime(10000);

      const overlayIsVisibleState = getState().OverlayVisible.value;
      expect(overlayIsVisibleState).toBe(false);
    });

    it("should set overlayVisible state to true", () => {
      startHidingVideoOverlay(mockOverlayTimeoutID);

      const overlayIsVisibleState = getState().OverlayVisible.value;
      expect(overlayIsVisibleState).toBe(true);
    });
  });

  describe("Testing handleEnterButton function", () => {
    it("should change videoFullScreenOn state to true", () => {
      dispatch(setVideoFullScreenOn(false));
      render(
        <Provider store={getAppStore()}>
          <PlaybackPanel playbackSettings={playbackSettings} playerRef={mockPlayerRef} />
        </Provider>
      );

      vi.spyOn(keyEvents, "isEventTargetAncestor").mockReturnValue(true);

      const element = document.createElement("div");
      const event = createEvent.click(element);

      handleEnterButton(event);
      const videoFullScreenOnState = getState().VideoFullScreen.value;
      expect(videoFullScreenOnState).toBe(true);
    });

    it("should change videoFullScreenOn state to false", () => {
      dispatch(setVideoFullScreenOn(true));
      render(
        <Provider store={getAppStore()}>
          <PlaybackPanel playbackSettings={playbackSettings} playerRef={mockPlayerRef} />
        </Provider>
      );
      const mockHtmlElement = document.createElement("div");
      mockHtmlElement.classList.add("video-player-fullscreen-control");

      const event = createEvent.click(mockHtmlElement);
      fireEvent(mockHtmlElement, event);

      vi.spyOn(keyEvents, "isEventTargetAncestor").mockReturnValue(false);
      vi.spyOn(domRef, "getVideoPlayerFullscreenControl").mockReturnValue(mockHtmlElement);

      handleEnterButton(event);

      expect(domRef.getVideoPlayerFullscreenControl()).toEqual(mockHtmlElement);

      const videoFullScreenOnState = getState().VideoFullScreen.value;
      expect(videoFullScreenOnState).toBe(false);
    });
  });
  describe("Testing tryToHideBackOverlay function", () => {
    it("should call a playerWindowContainsModals and change OverlayVisible state to false", () => {
      dispatch(setOverlayIsVisible(true));
      const spyedFn = vi.spyOn(navKeys, "playerWindowContainsModals").mockReturnValue(false);

      tryToHideBackOverlay();

      expect(spyedFn).toHaveBeenCalledTimes(1);
      const overlayIsVisibleState = getState().OverlayVisible.value;
      expect(overlayIsVisibleState).toBe(false);
    });

    it("should call a playerWindowContainsModals", () => {
      dispatch(setOverlayIsVisible(true));
      const spyedFn = vi.spyOn(navKeys, "playerWindowContainsModals").mockReturnValue(true);

      tryToHideBackOverlay();

      expect(spyedFn).toHaveBeenCalledTimes(1);
      const overlayIsVisibleState = getState().OverlayVisible.value;
      expect(overlayIsVisibleState).toBe(true);
    });
  });
});
