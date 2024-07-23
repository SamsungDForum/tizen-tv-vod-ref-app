/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from "react";
import styles from "./styles/Overlay.module.scss";

type Props = {
  isActivated: boolean;
  color?: string;
};

function Overlay({ isActivated, color }: Props): JSX.Element {
  return <>{isActivated ? <div className={styles.overlay} style={{ backgroundColor: color }} /> : null}</>;
}

export default Overlay;
