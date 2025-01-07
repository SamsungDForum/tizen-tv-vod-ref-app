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
import { getNullableVideoElement } from "../../usePlayerFactory/PlayerFactory/classes/utils/getVideoElement";

function ProgresWithTime() {
  const isOverlayVisible = useTypedSelector((state) => state.OverlayVisible.value);
  const isVideoFullScreenOn = useTypedSelector((state) => state.VideoFullScreen.value);

  const video = getNullableVideoElement();
  if (!video) return null;

  return (
    <div className={classNames("controllersContainer", { show: isOverlayVisible && isVideoFullScreenOn })}>
      <div className={"progressWithTime"}>
        <ProgressControl video={video} tabIndex={0} />
        <RemainingTimeDisplay video={video} />
      </div>
    </div>
  );
}

export default ProgresWithTime;
