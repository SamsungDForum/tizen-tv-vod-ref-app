/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from "react";
import styles from "./VideoSpinner.module.scss";
import { useVideoLoadingState } from "../../../hooks/useVideoLoadingState";

type Props = {
  video: HTMLVideoElement | null;
};
const VideoSpinner = ({ video }: Props) => {
  if (!video) return null;
  const showLoading = useVideoLoadingState(video);

  return (
    <div
      data-testid="video-spinner"
      className={`${styles.videoSpinner} ${showLoading ? styles.loadingShow : styles.loadingHide}`}
    />
  );
};

export default VideoSpinner;
