/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { domRef } from "../DOMhelper";
import { KeyName, getKey } from "../KeyEvents";
import { getNavTag, restrictNavigation, freeNavigation } from "../ModalPicker/utilities/navigation";

function makeYesOrNoDecision(evt, callbacks) {
  const [onYesCallback, onNoCallback] = callbacks;
  const yesButton = domRef.getDialogButtonYes();
  const noButton = domRef.getDialogButtonNo();
  if (yesButton === evt.target) {
    onYesCallback();
  }
  if (noButton === evt.target) {
    onNoCallback();
  }
}

export const navKeys = {
  initialize: function (id) {
    restrictNavigation(id);
  },
  destroy: (id) => freeNavigation(id),

  onKeyEvent: function (evt, callbacks, type) {
    if (getKey(evt) === KeyName.ENTER) {
      switch (type) {
        case DialogType.YesNo:
          makeYesOrNoDecision(evt, callbacks);
          break;
      }
    }
  },
  getNavTag: getNavTag,
  focusNo: () => domRef.getDialogButtonNo()?.focus(),
  focusOk: () => domRef.getDialogButtonYes()?.focus(),
};

const DialogType = { YesNo: "yesno"};
export { DialogType };
