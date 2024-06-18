/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from "react";
import { useSelector } from "react-redux";
import ButtonPanel from "../../../../PanelElements/ButtonPanel";

export default function SaveButton({ saveLogsCallback }) {
  return <ButtonPanel id="save-logs-messages" label={"Save logs to file"} clickCallback={saveLogsCallback} />;
}
