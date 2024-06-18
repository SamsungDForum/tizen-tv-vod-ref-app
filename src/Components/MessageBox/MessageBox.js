/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from "react";
import styles from "./MessageBox.module.scss";

function MessageBox({ messageText, boxCustomClassName, messageCustomClassName }) {
  return (
    <div className={boxCustomClassName ? boxCustomClassName : `${styles.messageBox}`}>
      <div className={messageCustomClassName ? messageCustomClassName : `${styles.messageBoxMessage}`}>
        {messageText}
      </div>
    </div>
  );
}

export { MessageBox };
