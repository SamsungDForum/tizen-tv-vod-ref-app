/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, { useEffect } from "react";
import { nav, navConfig } from "../../../libs/spatial-navigation";
import { useTypedSelector } from "../../reduxStore/useTypedSelector";
import { type SpatialCfg } from "../../../libs/spatial-navigation/spatialCfgTypes";
import VideoReactPlayer from "./VideoReactPlayer";
import LogsWindow from "../WorkTabs/Tabs/Logs/LogsWindow";
import { SettingState } from "redux-states";

type Props = {
  playbackSettings: SettingState;
};
const VideoContainer = ({ playbackSettings }: Props) => {
  const isOverlayVisible = useTypedSelector((state) => state.OverlayVisible.value);
  const isLogOverlayedOn = useTypedSelector((state) => state.LogOverlayScreen.value);
  const isVideoFullScreenOn = useTypedSelector((state) => state.VideoFullScreen.value);
  const isShowPlayerLogs = useTypedSelector((state) => state.LogOverlayScreen.showPlayerLogs);

  let logsClass = isLogOverlayedOn === true ? "hide" : "log-video-container";

  useEffect(() => {
    if (isVideoFullScreenOn) {
      const navSectionMessages = "logs-messages-navigation-section";
      let cfg: SpatialCfg = { ...navConfig };
      cfg.selector = "div.log-even, div.log-odd, div.latest-log";
      cfg.defaultElement = "div.latest-log";
      cfg.enterTo = "last-focused";
      cfg.leaveFor = {
        left: "@settings-controls-panel",
        up: "",
        down: "",
        right: "@playback-controls-nav-panel",
      };
      nav.remove(navSectionMessages);
      nav.add(navSectionMessages, cfg);

      return () => {
        nav.remove(navSectionMessages);
      };
    }
  }, [isVideoFullScreenOn]);
  return (
    <div className="video-container">
      <VideoReactPlayer playbackSettings={playbackSettings} />

      {isVideoFullScreenOn && (
        <div
          className={`logs-on-video ${isOverlayVisible ? "logs-on-video-with-overlay" : "logs-on-video-no-overlay"}`}
        >
          <LogsWindow
            logsContainerClass={logsClass}
            styles={`${isShowPlayerLogs && isVideoFullScreenOn && isOverlayVisible ? "1" : "0"}`}
          />
        </div>
      )}
    </div>
  );
};

export default VideoContainer;
