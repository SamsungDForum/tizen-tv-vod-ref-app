/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import "./ProgressControl.scss";

import React, { useEffect, useRef } from "react";
import { nav, navConfig } from "../../../../libs/spatial-navigation";
import { SpatialCfg } from "../../../../libs/spatial-navigation/spatialCfgTypes";
import { useTypedSelector } from "../../../reduxStore/useTypedSelector";
import { getKey, KeyName } from "../../KeyEvents";
import { onRewind } from "../PlaybackPanel";

interface ProgressControlType {
  tabIndex: number;
  video: HTMLVideoElement;
}
function ProgressControl({ tabIndex, video }: ProgressControlType) {
  const progressRef = useRef<HTMLProgressElement>(null);
  const isVideoFullScreenOn = useTypedSelector((state) => state.VideoFullScreen.value);

  function rewindVideo(e) {
    const progress = progressRef.current;

    if (!progress || !video) return null;
    const rect = progress.getBoundingClientRect();
    const pos = (e.pageX - rect.left) / progress.offsetWidth;
    video.currentTime = pos * video.duration;
  }

  function setVideoDuration() {
    const progress = document.querySelector("progress");
    if (!progress?.max || !video || Number.isNaN(video.duration)) return null;
    progress.max = video.duration;
  }

  function updateProgress() {
    const progress = progressRef.current;
    if (!progress) return null;
    progress.value = video.currentTime;
  }

  function handleKeyDown(e) {
    const key = getKey(e);

    switch (key) {
      case KeyName.ARROW_LEFT:
        return onRewind(video);
      case KeyName.ARROW_RIGHT:
        return onRewind(video, true);
      case KeyName.ENTER:
        return video.paused ? video.play() : video.pause();
    }
  }

  useEffect(() => {
    const progress = progressRef.current;

    video.addEventListener("loadedmetadata", setVideoDuration);
    video.addEventListener("timeupdate", updateProgress);
    progress?.addEventListener("click", rewindVideo);

    return () => {
      video.removeEventListener("loadedmetadata", setVideoDuration);
      video.removeEventListener("timeupdate", updateProgress);
      progress?.removeEventListener("click", rewindVideo);
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
    <div tabIndex={tabIndex} onKeyDown={handleKeyDown} className="controls progress-holder">
      <div className="progress">
        <progress
          ref={progressRef}
          id="progress"
          className="progress-control-bar"
          value={video.currentTime}
          aria-valuemax={video.duration}
          aria-valuenow={video.currentTime}
        >
          <span id="progress-bar" />
        </progress>
      </div>
    </div>
  );
}

export default ProgressControl;
