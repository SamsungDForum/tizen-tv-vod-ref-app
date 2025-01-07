/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, { useEffect } from "react";
import { Player, BigPlayButton } from "video-react";
import usePlayerFactory from "../usePlayerFactory";
import { sourceUnmount } from "../usePlayerFactory/utils/setting";
import { useTypedSelector } from "../../reduxStore/useTypedSelector";
import { SettingState } from "redux-states";
import ProgresWithTime from "./progressBar/ProgressWithTime";
import { ControlBar } from "video-react";

export type PlayerMethods = Player["props"];
type Props = {
  playbackSettings: SettingState;
  playerRef: React.MutableRefObject<PlayerMethods | null>;
  className?: string;
};
const VideoReactPlayer = ({ playbackSettings, playerRef, className }: Props) => {
  const subtitleText = useTypedSelector((state) => state.SubtitleOverlay.value);
  const { destroyPlayer } = usePlayerFactory(playbackSettings.source.current);
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
      <ProgresWithTime />

      {/* It's necessary to remove default Controls from video-react */}
      <ControlBar disableCompletely={true} />
      <BigPlayButton className="hide" />
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
