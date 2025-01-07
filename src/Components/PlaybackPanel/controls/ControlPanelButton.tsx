/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from "react";

type Props = {
  className: string;
  icon: JSX.Element;
  onClick: (text?: string) => void;
};
function ControlPanelButton({ className, icon, onClick }: Props) {
  return (
    <button className={className} onClick={() => onClick()} tabIndex={-1}>
      {icon}
    </button>
  );
}

export default ControlPanelButton;
