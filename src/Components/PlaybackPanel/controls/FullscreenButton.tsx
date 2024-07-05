/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from "react";
import { dispatch } from "../../../reduxStore/store";
import { MinimizeSvgIcon } from "../../../helpers/SvgIcons";
import { setVideoFullScreenOn } from "../VideoFullScreenSlice";

function FullscreenButton() {
  function onButtonClick(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    switchOffVideoFullScreen(evt);
  }

  return (
    <button
      className={"video-player-fullscreen-control video-player-button"}
      onClick={(evt) => onButtonClick(evt)}
      tabIndex={-1}
    >
      <MinimizeSvgIcon />
    </button>
  );
}

export default FullscreenButton;

export function switchOffVideoFullScreen(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
  if (evt.nativeEvent.type === "click") {
    dispatch(setVideoFullScreenOn(false));
  }
  evt.preventDefault();
  evt.stopPropagation();
}
