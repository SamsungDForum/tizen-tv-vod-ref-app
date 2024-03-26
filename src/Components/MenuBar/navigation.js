import { KeyName, getKey } from "../KeyEvents";
import { domRef } from "../DOMhelper";
import { containsOpenedPickers, getNavTag } from "../ModalPicker/utilities/navigation";

function tryToExitTizenApp(target, callbacks) {
  const [askToQuit] = callbacks;
  if (domRef.getViewPickerButton().id === target.id) {
    if (window.tizen !== undefined) {
      askToQuit();
    }
  }
}

export const navKeys = {
  initialize: (onKeyEventCallback) => window.addEventListener("keyup", onKeyEventCallback),
  destroy: (onKeyEventCallback) => window.removeEventListener("keyup", onKeyEventCallback),

  onKeyEvent: function (evt, callbacks) {
    const key = getKey(evt);
    if (key === KeyName.BACK) {
      tryToExitTizenApp(evt.target, callbacks);
    }
  },
  getNavTag: getNavTag,
  focusPlayerPanelFullscreenControl: () => domRef.getVideoPlayerFullscreenControl()?.focus(),
};
