/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from "react";
import "./Notifications.scss";
import Overlay from "../ModalPicker/Overlay";
import { EthernetIcon } from "../../helpers/SvgIcons";
import { nav } from "../../../libs/spatial-navigation";

interface Props {
  title: string;
  desc: string;
  displayNotification: boolean;
}
export function FullScreenNotification({ title, desc, displayNotification }: Props) {
  for (const sectionId of nav.getSections()) {
    if (displayNotification) nav.disable(sectionId);
    else nav.enable(sectionId);
  }

  if (!displayNotification) return null;
  return (
    <>
      <Overlay isActivated={true} />
      <div className="notification-container">
        <div className="notification-title">
          <h2 style={{ marginRight: "20px" }}>{title}</h2>
          <EthernetIcon />
        </div>
        <p className="notification-desc">{desc}</p>
      </div>
    </>
  );
}
