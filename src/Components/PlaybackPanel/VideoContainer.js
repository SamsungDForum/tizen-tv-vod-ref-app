import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import VideoReactPlayer from "./VideoReactPlayer";
import LogsWindow from "../WorkTabs/Tabs/Logs/LogsWindow";
import "video-react/dist/video-react.css";
import { nav, navConfig } from "../../../libs/spatial-navigation";
import { domRef } from "../DOMhelper";
import { dispatch } from "../../reduxStore/store";
export function VideoContainer({
  isOverlayVisible,
  playbackHandlers,
  playbackSettings,
  playerRef,
  renderSubtitleText,
  setLogContainerClass,
  isLogOverlayedOn,
}) {
  let logsClass = isLogOverlayedOn === true ? "hide" : "log-video-container";
  const isVideoFullScreenOn = useSelector((state) => state.VideoFullScreen.value);
  const isShowPlayerLogs = useSelector((state) => state.LogOverlayScreen.showPlayerLogs);

  useEffect(() => {
    if (isVideoFullScreenOn) {
      const navSectionMessages = "logs-messages-navigation-section";
      let cfg = { ...navConfig };
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

  // TODO:
  // Styles passed down to LogsWindow container carry visibility information (none/visible).
  // Visibility should be applied to LogsWindow container itself rather then passed to it for
  // application to children. Visibility none "removes" element from DOM. When applied to
  // LogsContainer will prevent LogsContainer from running and collecting logs when not shown.
  return (
    <div className={`video-container`}>
      <VideoReactPlayer
        isOverlayVisible={isOverlayVisible}
        playerRef={playerRef}
        subtitleText={renderSubtitleText()}
        playbackSettings={playbackSettings}
        eventHandlers={playbackHandlers}
      />

      {isVideoFullScreenOn ? (
        <div
        className={`logs-on-video ${isOverlayVisible ? "logs-on-video-with-overlay" : "logs-on-video-no-overlay"}`}
        >
          <LogsWindow
            logsContainerClass={logsClass}
            styles={`${isShowPlayerLogs && isVideoFullScreenOn && isOverlayVisible ? "1" : "0"}`}
          />
        </div>
      ) : null}
    </div>
  );
}
