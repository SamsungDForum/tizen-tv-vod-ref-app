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
  onNavigationEvent,
  startHidingVideoOverlay,
  tryToHideBackOverlay,
} from "../navigation";
import { dispatch, getAppStore, getState } from "../../../reduxStore/store";
import { showConfirmation } from "../../ConfirmationModal/ConfirmationModalSlice";
import { setVideoFullScreenOn } from "../VideoFullScreenSlice";
import { createEvent, fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import React from "react";
import { setOverlayIsVisible } from "../OverlayVisibleSlice";
import { domRef } from "../../DOMhelper";
import { vi } from "vitest";
import * as utilitiesNav from "../../ModalPicker/utilities/navigation";
import * as keyEvents from "../../KeyEvents";
import FullscreenButton from "../controls/FullscreenButton";
import { nav } from "../../../../libs/spatial-navigation";

describe("src/Components/PlaybackPanel/tests/Navigation.test.tsx ==> navigation.ts", () => {
  const mockOverlayTimeoutID = { current: -1 };
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("onKeyEvent", () => {
    it("should change showConfirmation state [BACK press]", () => {
      dispatch(dispatch(showConfirmation(true)));
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
    it("should change VideoFullScreenOn to false while overlayIsVisible state is truthy [ENTER press]", () => {
      // Arrange section
      dispatch(setVideoFullScreenOn(true));
      const videoFullScreenOn = true;
      const overlayIsVisible = true;

      const { getByRole } = render(
        <Provider store={getAppStore()}>
          <FullscreenButton />
        </Provider>
      );
      const btn = getByRole("button");
      const keyEvent = {
        type: "click",
        target: btn,
      };

      // Act section
      onKeyEvent(keyEvent, [overlayIsVisible, mockOverlayTimeoutID, videoFullScreenOn]);

      // Assert section
      const videoFullScreenOnState = getState().VideoFullScreen.value;
      expect(videoFullScreenOnState).toBe(false);
    });
    it("should change VideoFullScreenOn to false while conditions are falsy, navKeys.startHidingVideoOverlay should be called [ENTER press]", () => {
      // Arrange section
      dispatch(setVideoFullScreenOn(true));
      const videoFullScreenOn = false;
      const overlayIsVisible = false;

      const spyStartHidingVideoOverlay = vi.spyOn(navKeys, "startHidingVideoOverlay");
      const { getByRole } = render(
        <Provider store={getAppStore()}>
          <FullscreenButton />
        </Provider>
      );
      const btn = getByRole("button");
      const keyEvent = {
        type: "click",
        target: btn,
      };

      // Act section
      onKeyEvent(keyEvent, [overlayIsVisible, mockOverlayTimeoutID, videoFullScreenOn]);

      // Assert section
      const videoFullScreenOnState = getState().VideoFullScreen.value;
      expect(videoFullScreenOnState).toBe(false);
      expect(spyStartHidingVideoOverlay).toHaveBeenCalledTimes(1);
    });
    it("shouldn't change videFullScreenOn state, should call nav.focus function [ENTER press]", () => {
      dispatch(setVideoFullScreenOn(true));

      // Arrange section
      const videoFullScreenOn = true;
      const overlayIsVisible = false;

      const spyNavFocus = vi.spyOn(nav, "focus");
      const { getByRole } = render(
        <Provider store={getAppStore()}>
          <FullscreenButton />
        </Provider>
      );
      const btn = getByRole("button");
      const keyEvent = {
        type: "click",
        btn: btn,
      };
      // Act section
      onKeyEvent(keyEvent, [overlayIsVisible, mockOverlayTimeoutID, videoFullScreenOn]);

      // Assert section
      const videoFullScreenOnState = getState().VideoFullScreen.value;
      expect(videoFullScreenOnState).toBe(true);
      expect(spyNavFocus).toHaveBeenCalledTimes(1);
    });
    it("should change VideoFullScreenOn to false [ENTER press]", () => {
      // Arrange section
      dispatch(setVideoFullScreenOn(true));
      const videoFullScreenOn = false;
      const overlayIsVisible = true;

      const { getByRole } = render(
        <Provider store={getAppStore()}>
          <FullscreenButton />
        </Provider>
      );
      const btn = getByRole("button");
      const keyEvent = {
        type: "click",
        target: btn,
      };

      // Act section
      onKeyEvent(keyEvent, [overlayIsVisible, mockOverlayTimeoutID, videoFullScreenOn]);

      // Assert section
      const videoFullScreenOnState = getState().VideoFullScreen.value;
      expect(videoFullScreenOnState).toBe(false);
    });
    it("shouldn't change VideoFullScreenOn while overlayIsVisible state is falsy and element has class asset-view [ENTER press]", () => {
      // Arrange section
      dispatch(setVideoFullScreenOn(true));
      const videoFullScreenOn = true;
      const overlayIsVisible = false;

      const mockedElement = document.createElement("div");
      mockedElement.className = "asset-view";
      const keyEvent = {
        type: "click",
        target: mockedElement,
      };

      // Act section
      onKeyEvent(keyEvent, [overlayIsVisible, mockOverlayTimeoutID, videoFullScreenOn]);

      // Assert section
      const videoFullScreenOnState = getState().VideoFullScreen.value;
      expect(videoFullScreenOnState).toBe(true);
    });
    it("shouldn't change VideoFullScreenOn while conditions are truthy and element has class asset-view [ENTER press]", () => {
      // Arrange section
      dispatch(setVideoFullScreenOn(true));
      const videoFullScreenOn = true;
      const overlayIsVisible = true;

      const mockedElement = document.createElement("div");
      mockedElement.className = "asset-view";
      const keyEvent = {
        type: "click",
        target: mockedElement,
      };

      // Act section
      onKeyEvent(keyEvent, [overlayIsVisible, mockOverlayTimeoutID, videoFullScreenOn]);

      // Assert section
      const videoFullScreenOnState = getState().VideoFullScreen.value;
      expect(videoFullScreenOnState).toBe(true);
    });
  });

  describe("onKeyUpEvent", () => {
    it("should change state of overlayIsVisible to false [BACK press]", () => {
      // Arrange section
      dispatch(setOverlayIsVisible(true));
      const videoFullScreenOn = true;
      const overlayIsVisible = true;

      const keyEvent = {
        code: "return",
        nativeEvent: { keyIdentifier: "XF86Back" },
        keyCode: 10009,
        target: document.createElement("div"),
      };

      // Act section
      onKeyUpEvent(keyEvent, [overlayIsVisible, mockOverlayTimeoutID, videoFullScreenOn]);

      // Assert section
      const overlayIsVisibleState = getState().OverlayVisible.value;
      expect(overlayIsVisibleState).toBe(false);
    });
    it("should change videoFullScreen state to false [BACK press]", () => {
      // Arrange section
      dispatch(setVideoFullScreenOn(true));
      const videoFullScreenOn = true;
      const overlayIsVisible = false;

      const keyEvent = {
        code: "return",
        nativeEvent: { keyIdentifier: "XF86Back" },
        keyCode: 10009,
        type: "click",
        target: document.createElement("div"),
      };

      // Act section
      onKeyUpEvent(keyEvent, [overlayIsVisible, mockOverlayTimeoutID, videoFullScreenOn]);

      // Assert section
      const videoFullScreenOnState = getState().VideoFullScreen.value;
      expect(videoFullScreenOnState).toBe(false);
    });

    it("should change videoFullScreen state to false [BACK press]", () => {
      // Arrange section
      dispatch(setVideoFullScreenOn(true));
      const videoFullScreenOn = false;
      const overlayIsVisible = true;

      const keyEvent = {
        code: "enter",
        nativeEvent: { keyIdentifier: "Enter" },
        keyCode: 10009,
        type: "click",
        target: document.createElement("div"),
      };

      // Act section
      onKeyUpEvent(keyEvent, [overlayIsVisible, mockOverlayTimeoutID, videoFullScreenOn]);

      // Assert section
      const videoFullScreenOnState = getState().VideoFullScreen.value;
      expect(videoFullScreenOnState).toBe(false);
    });

    it("shouldn't change videoFullScreenOn state, ViewPickerButton should be focused", () => {
      // Arrange section
      dispatch(setVideoFullScreenOn(true));
      const videoFullScreenOn = false;
      const overlayIsVisible = false;

      const mockPlayerSelectButton = document.createElement("button");
      const mockViewPickerButton = document.createElement("button");
      const spyGetPlayerSelectBtn = vi.spyOn(domRef, "getPlayerSelectButton").mockReturnValue(mockPlayerSelectButton);
      const spyGetViewPickerBtn = vi.spyOn(domRef, "getViewPickerButton").mockReturnValue(mockViewPickerButton);

      const keyEvent = {
        code: "enter",
        nativeEvent: { keyIdentifier: "Enter" },
        keyCode: 10009,
        type: "click",
        target: mockPlayerSelectButton,
      };

      // Act section
      onKeyUpEvent(keyEvent, [overlayIsVisible, mockOverlayTimeoutID, videoFullScreenOn]);

      // Assert section
      const videoFullScreenOnState = getState().VideoFullScreen.value;
      expect(videoFullScreenOnState).toBe(true);
      expect(spyGetPlayerSelectBtn).toHaveBeenCalled();
      expect(spyGetViewPickerBtn).toHaveBeenCalledTimes(2);
    });
  });

  describe("onNavigationEvent", () => {
    it("function nav.focus should be called, videoFullScreenOn is true", () => {
      // Arrange section
      const overlayIsVisible = false;
      const videoFullScreenOn = true;
      const spyNavFocus = vi.spyOn(nav, "focus");
      const isEventTargetAncestor = vi.spyOn(keyEvents, "isEventTargetAncestor").mockReturnValue(true);

      const srcElement = document.createElement("div");
      srcElement.setAttribute("className", "asset-view");
      const keyEvent = {
        type: "sn:willunfocus",
        srcElement,
        target: { id: undefined },
      };

      // Act section
      onNavigationEvent(keyEvent, [videoFullScreenOn, mockOverlayTimeoutID, overlayIsVisible]);

      // Assert section
      expect(isEventTargetAncestor).toHaveBeenCalledTimes(1);
      expect(spyNavFocus).toHaveBeenCalledTimes(1);
    });
    it("function nav.focus should be called, when videoFullScreenOn is false", () => {
      // Arrange section
      const overlayIsVisible = false;
      const videoFullScreenOn = false;
      const spyNavFocus = vi.spyOn(nav, "focus");

      const isEventTargetAncestor = vi.spyOn(keyEvents, "isEventTargetAncestor").mockReturnValue(true);

      const srcElement = document.createElement("div");
      const keyEvent = {
        type: "sn:willunfocus",
        srcElement,
        target: { id: "target-id" },
      };

      // Act section
      onNavigationEvent(keyEvent, [videoFullScreenOn, mockOverlayTimeoutID, overlayIsVisible]);

      // Assert section
      expect(isEventTargetAncestor).toHaveBeenCalledTimes(1);
      expect(spyNavFocus).toHaveBeenCalledTimes(1);
    });
  });

  describe("startHidingVideoOverlay", () => {
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

  describe("handleEnterButton", () => {
    it("should change videoFullScreenOn state to true", () => {
      dispatch(setVideoFullScreenOn(false));

      vi.spyOn(keyEvents, "isEventTargetAncestor").mockReturnValue(true);

      const element = document.createElement("div");
      const event = createEvent.click(element);

      handleEnterButton(event);
      const videoFullScreenOnState = getState().VideoFullScreen.value;
      expect(videoFullScreenOnState).toBe(true);
    });

    it("should change videoFullScreenOn state to false", () => {
      dispatch(setVideoFullScreenOn(true));

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
  describe("tryToHideBackOverlay", () => {
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
