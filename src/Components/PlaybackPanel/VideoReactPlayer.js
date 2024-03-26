import React, { useEffect } from "react";
import { Player, ControlBar, BigPlayButton, RemainingTimeDisplay, ProgressControl } from "video-react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { nav, navConfig } from "../../../libs/spatial-navigation";
import usePlayerFactory from "../usePlayerFactory";
import { sourceUnmount } from "../usePlayerFactory/utils/setting";

function Subtitle(props) {
  const isVideoFullScreenOn = useSelector((state) => state.VideoFullScreen.value);
  if (!props.children) return null;
  const cssClass = `video-subtitles-text-container ${
    isVideoFullScreenOn ? "video-subtitles-fullscreen" : "video-subtitles-floating"
  }`;
  return <div className={cssClass}>{props.children}</div>;
}

export default function VideoReactPlayer(props) {
  const { source } = props.playbackSettings;
  const { playerRef, className } = props;
  const subtitleText = useSelector(state => state.SubtitleOverlay.value);
  const isVideoFullScreenOn = useSelector((state) => state.VideoFullScreen.value);
  const [player, destroyPlayer] = usePlayerFactory(source?.current);

  useEffect(() => {
    const navSectionMessages = "progress-control-bar";
    let cfg = { ...navConfig };
    cfg.selector = ".video-react-progress-holder";
    cfg.leaveFor = {
      up: "@settings-controls-panel",
      down: "@settings-controls-panel",
    };
    nav.remove(navSectionMessages);
    nav.add(navSectionMessages, cfg);

    return () => {
      nav.remove(navSectionMessages);
    };
  }, [isVideoFullScreenOn]);

  useEffect(() => {
    if(source == null) {
      return;
    }

    if(source?.pending != null) {
      destroyPlayer()
        .then(() => sourceUnmount());
    }
  }, [source]);

  return (
    <Player videoId="elVideo" autoPlay ref={playerRef} className={className}>
      <Subtitle>{subtitleText}</Subtitle>
      <BigPlayButton className={classNames(className, { hide: true })} />
      <ControlBar
        className={
          isVideoFullScreenOn
            ? classNames(className, {
                "video-player-control-bar": true,
              }) + (props.isOverlayVisible ? "" : " fade-out-animation")
            : "hide"
        }
        autoHide={false}
        disableDefaultControls={true}
      >
        <ProgressControl className={classNames(className, { "video-player-progress-control": true })} />
        <RemainingTimeDisplay className={classNames(className, { "video-player-remaining-time-display": true })} />
      </ControlBar>
    </Player>
  );
}
