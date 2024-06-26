/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import Slider from "video-react/lib/components/Slider";
import { nav } from "../../libs/spatial-navigation";
import { KeyName, getKey } from "../Components/KeyEvents";
const originalHandleKeyPress = Slider.prototype.handleKeyPress;

const originalStepBack = Slider.prototype.stepBack;
const originalStepForward = Slider.prototype.stepForward;

Slider.prototype.stepBack = function () {
  return;
};

Slider.prototype.stepForward = function () {
  return;
};

Slider.prototype.handleKeyPress = function (event) {
  const key = getKey(event);
  if (key === KeyName.ARROW_UP || key === KeyName.ARROW_DOWN) {
    event.preventDefault();
    event.stopPropagation();
    if (key === KeyName.ARROW_UP) {
      nav.focus("settings-controls-panel");
    } else if (key === KeyName.ARROW_DOWN) {
      nav.focus("playback-controls-nav-panel");
    }
  } else if (key === KeyName.ARROW_LEFT) {
    event.preventDefault();
    originalStepBack.call(this);
  } else if (key === KeyName.ARROW_RIGHT) {
    event.preventDefault();
    originalStepForward.call(this);
  }
};
