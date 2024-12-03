/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, { useEffect } from "react";
import { Player, ControlBar, BigPlayButton, RemainingTimeDisplay, ProgressControl } from "video-react";
import classNames from "classnames";
import { nav, navConfig } from "../../../libs/spatial-navigation";
import usePlayerFactory from "../usePlayerFactory";
import { sourceUnmount } from "../usePlayerFactory/utils/setting";
import { useTypedSelector } from "../../reduxStore/useTypedSelector";
import { SettingState } from "redux-states";
import { SpatialCfg } from "../../../libs/spatial-navigation/spatialCfgTypes";

export type PlayerMethods = Player["props"];
type Props = {
  playbackSettings: SettingState;
  playerRef: React.MutableRefObject<PlayerMethods | null>;
  className?: string;
};
const VideoReactPlayer = ({ playbackSettings, playerRef, className }: Props) => {
  const isOverlayVisible = useTypedSelector((state) => state.OverlayVisible.value);
  const subtitleText = useTypedSelector((state) => state.SubtitleOverlay.value);
  const isVideoFullScreenOn = useTypedSelector((state) => state.VideoFullScreen.value);
  const { destroyPlayer } = usePlayerFactory(playbackSettings.source.current);

  useEffect(() => {
    const navSectionMessages = "progress-control-bar";
    let cfg: SpatialCfg = { ...navConfig };
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
    if (playbackSettings.source == null) {
      return;
    }

    if (playbackSettings.source?.pending != null) {
      destroyPlayer().then(() => sourceUnmount());
    }
  }, [playbackSettings.source]);

  return (
    <Player videoId="elVideo" ref={playerRef} className={className}>
      <Subtitle subtitleText={subtitleText} />
      <BigPlayButton className={classNames(className, { hide: true })} />
      <ControlBar
        className={
          isVideoFullScreenOn
            ? classNames(className, {
                "video-player-control-bar": true,
              }) + (isOverlayVisible ? "" : " fade-out-animation")
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
};

export default VideoReactPlayer;

function Subtitle({ subtitleText }: { subtitleText: string }) {
  const isVideoFullScreenOn = useTypedSelector((state) => state.VideoFullScreen.value);
  if (!subtitleText) return null;
  const cssClass = `video-subtitles-text-container ${
    isVideoFullScreenOn ? "video-subtitles-fullscreen" : "video-subtitles-floating"
  }`;
  return <div className={cssClass}>{subtitleText}</div>;
}
