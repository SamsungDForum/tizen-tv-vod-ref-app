import React, { useState } from "react";
import "./control-panel.scss";
import PlayPauseButton from "./PlayPauseButton";
import FullscreenButton from "./FullscreenButton";
import ControlPanelButton from "./ControlPanelButton";
import { setVideoFullScreenOn } from "./../VideoFullScreenSlice";
import { dispatch } from "./../../../reduxStore/store";
import { nav, navConfig } from "../../../../libs/spatial-navigation";
import { useSelector } from "react-redux";
import { RevindSvgIcon, FastForwardSvgIcon, RestartSvgIcon } from "../../../helpers/SvgIcons";

export const ControlPanel = function (props) {
  const switchOffVideoFullScreen = function (evt) {
    if (evt.nativeEvent.type === "click") {
      dispatch(setVideoFullScreenOn(false));
    }
    evt.preventDefault();
    evt.stopPropagation();
  };

  const isVideoFullScreenOn = useSelector((state) => state.VideoFullScreen.value);

  React.useEffect(() => {
    const navSection = "playback-controls-nav-panel";
    const cfg = { ...navConfig };
    cfg.selector = ".video-player-button";
    cfg.leaveFor = { up: "@progress-control-bar", right: "@logs-messages-navigation-section" };

    nav.add(navSection, cfg);
    return () => {
      nav.remove(navSection);
    };
  }, []);

  return (
    <div
      className={
        (isVideoFullScreenOn ? "video-player-control-panel-container" : "hide") +
        (props.isOverlayVisible ? "" : " fade-out-animation")
      }
    >
      <FullscreenButton onClick={switchOffVideoFullScreen} />

      <div className="centered-player-btn">
        <ControlPanelButton
          icon={<RestartSvgIcon />}
          className="video-player-restart-control video-player-button"
          onClick={props.buttonClickHandlers.onRestartClick}
        ></ControlPanelButton>

        <ControlPanelButton
          icon={<RevindSvgIcon />}
          className="video-player-rew-control video-player-button"
          onClick={props.buttonClickHandlers.onRewindClick}
        ></ControlPanelButton>
        <PlayPauseButton onClick={props.buttonClickHandlers.onPlayPauseClick} />
        <ControlPanelButton
          icon={<FastForwardSvgIcon />}
          className="video-player-ffw-control video-player-button"
          onClick={props.buttonClickHandlers.onFastForwardClick}
        ></ControlPanelButton>
      </div>
    </div>
  );
};
