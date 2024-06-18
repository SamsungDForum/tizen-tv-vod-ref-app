/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from "react";
import { MinimizeSvgIcon } from "../../../helpers/SvgIcons";
function FullscreenButton(props) {
  function onButtonClick(evt) {
    props.onClick(evt);
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
