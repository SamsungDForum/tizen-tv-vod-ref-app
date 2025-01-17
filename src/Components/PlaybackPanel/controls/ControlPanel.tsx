/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, { useEffect } from "react";

import "./control-panel.scss";
import PlayPauseButton from "./PlayPauseButton";
import FullscreenButton from "./FullscreenButton";
import { playbackHandlers } from "../controls/playbackHandlers";
import ControlPanelButton from "./ControlPanelButton";
import { nav, navConfig } from "../../../../libs/spatial-navigation";
import { useTypedSelector } from "../../../reduxStore/useTypedSelector";
import { SpatialCfg } from "../../../../libs/spatial-navigation/spatialCfgTypes";
import { RevindSvgIcon, FastForwardSvgIcon, RestartSvgIcon, StopSvgIcon } from "../../../helpers/SvgIcons";

type Props = {
  buttonClickHandlers: ReturnType<typeof playbackHandlers>;
};
export function ControlPanel({ buttonClickHandlers }: Props) {
  const isVideoFullScreenOn = useTypedSelector((state) => state.VideoFullScreen.value);
  const isOverlayVisible = useTypedSelector((state) => state.OverlayVisible.value);

  useEffect(() => {
    const navSection = "playback-controls-nav-panel";
    const cfg: SpatialCfg = { ...navConfig };
    cfg.selector = ".video-player-button";
    cfg.leaveFor = { up: "@progress-control-bar", right: "@logs-messages-navigation-section" };

    nav.add(navSection, cfg);
    return () => {
      nav.remove(navSection);
    };
  }, []);

  return (
    <div
      className={`
        ${isVideoFullScreenOn ? "video-player-control-panel-container" : "hide"} 
        ${!isOverlayVisible && " fade-out-animation"}`}
    >
      <FullscreenButton />
      <div className="centered-player-btn">
        <ControlPanelButton
          icon={<RestartSvgIcon />}
          className="video-player-restart-control video-player-button"
          onClick={buttonClickHandlers.onRestartClick}
        />
        <ControlPanelButton
          icon={<RevindSvgIcon />}
          className="video-player-rew-control video-player-button"
          onClick={buttonClickHandlers.onRewindClick}
        />
        <PlayPauseButton onClick={buttonClickHandlers.onPlayPauseClick} />
        <ControlPanelButton
          icon={<FastForwardSvgIcon />}
          className="video-player-ffw-control video-player-button"
          onClick={buttonClickHandlers.onFastForwardClick}
        />
        <ControlPanelButton
          icon={<StopSvgIcon />}
          className="video-player-stop-control video-player-button"
          onClick={buttonClickHandlers.onHandleAbort}
        />
      </div>
    </div>
  );
}
