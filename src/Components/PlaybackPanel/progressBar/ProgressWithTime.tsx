/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import "./ProgressControl.scss";

import React from "react";
import classNames from "classnames";
import ProgressControl from "./ProgressControl";
import { RemainingTimeDisplay } from "./RemainingTimeDisplay";
import { useTypedSelector } from "../../../reduxStore/useTypedSelector";

function ProgresWithTime() {
  const isOverlayVisible = useTypedSelector((state) => state.OverlayVisible.value);

  const video = document.querySelector("video");
  if (!video) return null;

  function isVideoPlaying() {
    return video && !video.ended && video.currentTime > 0;
  }

  return (
    <div className={classNames("controllersContainer", { show: isVideoPlaying() && isOverlayVisible })}>
      <div className="progressWithTime">
        <ProgressControl video={video} tabIndex={0} />
        <RemainingTimeDisplay video={video} />
      </div>
    </div>
  );
}

export default ProgresWithTime;
