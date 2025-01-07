/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import "./ProgressControl.scss";

import React, { useCallback, useEffect } from "react";
import { nav, navConfig } from "../../../../libs/spatial-navigation";
import { SpatialCfg } from "../../../../libs/spatial-navigation/spatialCfgTypes";
import { useTypedSelector } from "../../../reduxStore/useTypedSelector";

interface ProgressControlType {
  tabIndex: number;
  video: HTMLVideoElement;
}
function ProgressControl({ tabIndex, video }: ProgressControlType) {
  const isVideoFullScreenOn = useTypedSelector((state) => state.VideoFullScreen.value);

  const skipVideo = useCallback(
    function (e) {
      const progress = document.querySelector("progress");

      if (!progress || !video) return null;
      const rect = progress.getBoundingClientRect();
      const pos = (e.pageX - rect.left) / progress.offsetWidth;
      video.currentTime = pos * video.duration;
    },
    [video]
  );

  function setVideoDuration() {
    const progress = document.querySelector("progress");
    if (!progress || !video || Number.isNaN(video.duration)) return null;
    progress.max = video.duration;
  }

  function updateProgress() {
    const progress = document.querySelector("progress");
    if (!progress || !video) return null;
    progress.value = video.currentTime;
  }

  useEffect(() => {
    const progress = document.querySelector("progress");

    video.addEventListener("loadedmetadata", setVideoDuration);
    video.addEventListener("timeupdate", updateProgress);
    progress?.addEventListener("click", skipVideo);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("loadedmetadata", setVideoDuration);
      progress?.removeEventListener("click", skipVideo);
    };
  }, [video]);

  useEffect(() => {
    const navSectionMessages = "progress-control-bar";
    let cfg: SpatialCfg = { ...navConfig };
    cfg.selector = ".progress-holder";
    cfg.leaveFor = {
      up: "@settings-controls-panel",
      down: "@playback-controls-nav-panel",
    };
    nav.remove(navSectionMessages);
    nav.add(navSectionMessages, cfg);

    return () => {
      nav.remove(navSectionMessages);
    };
  }, [isVideoFullScreenOn]);

  return (
    <div tabIndex={tabIndex} className="controls progress-holder">
      <div className="progress">
        <progress id="progress" className="progress-control-bar" value="0">
          <span id="progress-bar" />
        </progress>
      </div>
    </div>
  );
}

export default ProgressControl;
