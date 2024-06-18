/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, { useEffect } from "react";
import styles from "./LoadingSpinner.module.scss";

const LoadingSpinner = ({ showLoading, setShowLoading, terminateTimeout }) => {
  useEffect(() => {
    if (showLoading) {
      const spinnerTimeout = setTimeout(() => {
        setShowLoading(false);
      }, terminateTimeout);

      return () => {
        clearTimeout(spinnerTimeout);
      };
    }
  }, [showLoading]);

  return <div className={`${styles.loadingSpinner} ${showLoading ? styles.loadingShow : styles.loadingHide}`}></div>;
};

export default LoadingSpinner;
