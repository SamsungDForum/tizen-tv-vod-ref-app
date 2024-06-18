/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from "react";
import Panel from "./Panel";
import StyledButton from "../ModalPicker/StyledButton";

export default function ButtonPanel({ id, optionLabel, clickCallback, label, className }) {
  return (
    <Panel>
      <StyledButton
        className={`button call-to-action-btn ${className}`}
        id={id}
        onClick={clickCallback}
        buttonName={label}
        label=""
      ></StyledButton>
    </Panel>
  );
}
