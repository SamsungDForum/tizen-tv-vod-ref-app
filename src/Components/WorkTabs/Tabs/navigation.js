/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { KeyName, getKey, isEventTargetAncestor } from "../../KeyEvents";
import { domRef } from "../../DOMhelper";
import { containsOpenedPickers } from "../../ModalPicker/utilities/navigation";

function tryToFocusBackMenuBarViewPicker(tabs, evt) {
  if(evt.target.id === 'fullscreen'){
    domRef.getViewPickerButton()?.focus();
  }
  if (isEventTargetAncestor(tabs, evt.target) && !containsOpenedPickers()) {
    domRef.getViewPickerButton()?.focus();
  }
}

export const navKeys = {
  initialize: (onKeyEventCallback) => window.addEventListener("keyup", onKeyEventCallback),
  destroy: (onKeyEventCallback) => window.removeEventListener("keyup", onKeyEventCallback),

  onKeyEvent: function (evt) {
    const key = getKey(evt);
    if (key === KeyName.BACK) {
      const tabs = domRef.getTabsWorkspace();
      tryToFocusBackMenuBarViewPicker(tabs, evt);
    }
  },
};
