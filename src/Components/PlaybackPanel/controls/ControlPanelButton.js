/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from "react";
function ControlPanelButton(props) {
  function onButtonClick(evt) {
    props.onClick();
  }

  return (
    <button id={props.id} className={props.className} onClick={(evt) => onButtonClick(evt)} tabIndex={-1}>
      {props.icon}
    </button>
  );
}

export default ControlPanelButton;
