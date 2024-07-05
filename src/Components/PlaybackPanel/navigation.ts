/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { domRef } from "../DOMhelper";
import { containsOpenedPickers } from "../ModalPicker/utilities/navigation";
import { nav } from "../../../libs/spatial-navigation";
import { KeyName, getKey, isEventTargetAncestor } from "../KeyEvents";
import { setVideoFullScreenOn } from "./VideoFullScreenSlice";
import { setOverlayIsVisible } from "./OverlayVisibleSlice";
import { dispatch } from "../../reduxStore/store";
import { showConfirmation } from "../ConfirmationModal/ConfirmationModalSlice";

export function onKeyEvent(
  evt,
  state: [boolean, { current: number }, boolean]
) {
  const [isOverlayVisible, overlayTimeoutID, isVideoFullScreenOn] = state;
  const key = getKey(evt);

  switch (key) {
    case KeyName.BACK:
      containsOpenedPickers() && startHidingVideoOverlay(overlayTimeoutID);
      dispatch(dispatch(showConfirmation(false)));
      break;
    case KeyName.ENTER:
      if (
        !isOverlayVisible &&
        isVideoFullScreenOn &&
        !evt.target?.id.includes("log-entry")
      ) {
        focusSettingsControlsPanel();
      } else {
        handleEnterButton(evt);
      }

      navKeys.startHidingVideoOverlay(overlayTimeoutID);
      break;
    default:
      navKeys.startHidingVideoOverlay(overlayTimeoutID);
  }
}

export function onKeyUpEvent(
  evt: { target: HTMLElement },
  state: [boolean, { current: number }, boolean]
) {
  const [isOverlayVisible, overlayTimeoutID, isVideoFullScreenOn] = state;
  const key = getKey(evt);
  switch (key) {
    case KeyName.BACK:
      if (domRef.getViewPickerButton() === evt.target) break;
      if (isOverlayVisible && isVideoFullScreenOn) {
        if (evt.target.id.includes("log-entry")) {
          focusSettingsControlsPanel();
        } else {
          tryToHideBackOverlay();
        }
        return;
      } else {
        if (
          !isVideoFullScreenOn &&
          domRef.getPlayerSelectButton()?.id === evt.target.id
        ) {
          domRef.getViewPickerButton()?.focus();
        } else {
          dispatch(setVideoFullScreenOn(false));
        }
        break;
      }
  }
  if (evt.target.id.includes("log-entry")) {
  } else {
    navKeys.startHidingVideoOverlay(overlayTimeoutID);
  }
}

function onNavigationEvent(
  evt: { type: string; srcElement: HTMLElement; target: { id?: string } },
  state: [boolean, { current: number }, boolean]
) {
  const [isVideoFullScreenOn] = state;

  if (evt.type === "sn:willunfocus") {
    if (
      isVideoFullScreenOn &&
      isEventTargetAncestor(domRef.getAssetView(), evt.srcElement)
    ) {
      focusSettingsControlsPanel();
    }
    if (
      !isVideoFullScreenOn &&
      isEventTargetAncestor(domRef.getPlayerWindow(), evt.srcElement)
    ) {
      if (domRef.getPlayerSelectButton()?.id !== evt.target.id) {
        focusVideoTilesSection();
      }
    }
  }
}

export function startHidingVideoOverlay(overlayTimeoutID: {
  current?: number | NodeJS.Timeout;
}) {
  resetOverlayHiding(overlayTimeoutID);
  scheduleOverlayHiding(overlayTimeoutID);
}

function hideOverlayIfNoModalOpened() {
  // Hide overlay controls if there is no collision with 'modal elements' on the screen
  const isNoFocuseOnLogs =
    domRef.getVideoLogs()?.querySelector("div:focus") === null;
  const isNoPickerOpen = !containsOpenedPickers();
  if (isNoFocuseOnLogs && isNoPickerOpen) {
    dispatch(setOverlayIsVisible(false));
  }
}

function resetOverlayHiding(overlayTimeoutID: {
  current?: number | NodeJS.Timeout;
}) {
  // Set the overlay to be visible immediately
  dispatch(setOverlayIsVisible(true));
  // Cancel current timeout
  clearTimeout(overlayTimeoutID.current);
  overlayTimeoutID.current = -1;
}

function scheduleOverlayHiding(overlayTimeoutID: {
  current?: number | NodeJS.Timeout;
}) {
  overlayTimeoutID.current = setTimeout(() => {
    hideOverlayIfNoModalOpened();
  }, 10000);
}

export function handleEnterButton(evt: Event) {
  if (isEventTargetAncestor(domRef.getAssetView(), evt.target)) {
    dispatch(setVideoFullScreenOn(true));
    return;
  }
  if (domRef.getVideoPlayerFullscreenControl() === evt.target) {
    dispatch(setVideoFullScreenOn(false));
    return;
  }
}

export function tryToHideBackOverlay() {
  if (!navKeys.playerWindowContainsModals())
    dispatch(setOverlayIsVisible(false));
}

function focusSettingsControlsPanel() {
  nav.focus("settings-controls-panel");
}

function focusVideoTilesSection() {
  nav.focus("asset-view");
}

export const navKeys = {
  initialize: function (
    onKeyEvent: {
      (this: Window, ev: KeyboardEvent): void;
      (this: Window, ev: MouseEvent): void;
      (this: Window, ev: KeyboardEvent): void;
    },
    onNavigationEvent: EventListenerOrEventListenerObject,
    onKeyUpEvent: (this: Window, ev: KeyboardEvent) => void
  ) {
    //TV remote control
    window.addEventListener("keypress", onKeyEvent);
    //PC mouse
    window.addEventListener("click", onKeyEvent);
    //spacial navigation
    window.addEventListener("sn:willunfocus", onNavigationEvent);
    // keypress is not fired for arrow keys
    window.addEventListener("keyup", onKeyUpEvent);

    window.addEventListener("keydown", onKeyEvent);
  },

  destroy: function (
    onKeyEvent: {
      (this: Window, ev: KeyboardEvent): void;
      (this: Window, ev: MouseEvent): void;
      (this: Window, ev: KeyboardEvent): void;
    },
    onNavigationEvent: EventListenerOrEventListenerObject,
    onKeyUpEvent: (this: Window, ev: KeyboardEvent) => void
  ) {
    //TV remote control
    window.removeEventListener("keypress", onKeyEvent);
    //PC mouse
    window.removeEventListener("click", onKeyEvent);
    //Special navigation
    window.removeEventListener("sn:willunfocus", onNavigationEvent);
    // keypress is not fired for arrow keys
    window.removeEventListener("keyup", onKeyUpEvent);

    window.removeEventListener("keydown", onKeyEvent);
  },

  onKeyEvent: onKeyEvent,

  onNavigationEvent: onNavigationEvent,

  onKeyUpEvent: onKeyUpEvent,

  startHidingVideoOverlay: startHidingVideoOverlay,

  isENTER: function (key: string) {
    return key === KeyName.ENTER;
  },

  playerWindowContainsModals: function () {
    return containsOpenedPickers();
  },
};
