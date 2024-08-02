/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from "react";
import { InformationIcon } from "../../../../helpers/SvgIcons";
import styles from "./AdvancedContent.module.scss";

type Props = {
  size: string;
  mainMsg?: string;
  explainMsg?: string;
};
/**
 *@prop  { size } - width and height of the component
 *@prop  { explainMsg } - tooltip message
 */
export function ErrorOccurred({ size, mainMsg = "Not Available", explainMsg }: Props) {
  return (
    <div className={styles.errorContainer}>
      <div data-tooltip={explainMsg} style={{ width: size, height: size }}>
        <InformationIcon />
        <h1 className={styles.errorText}>{mainMsg}</h1>
      </div>
    </div>
  );
}
