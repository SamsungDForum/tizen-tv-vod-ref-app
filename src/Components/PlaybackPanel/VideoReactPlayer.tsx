/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, { useEffect } from "react";
import usePlayerFactory from "../usePlayerFactory";
import { sourceUnmount } from "../usePlayerFactory/utils/setting";
import { useTypedSelector } from "../../reduxStore/useTypedSelector";
import { SettingState } from "redux-states";
import ProgressBarWithTime from "./progressBar/ProgressBarWithTime";

type Props = {
  playbackSettings: SettingState;
  className?: string;
};
const VideoReactPlayer = ({ playbackSettings, className }: Props) => {
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
    <>
      <video id="elVideo" className={className}>
        <Subtitle subtitleText={subtitleText} />
      </video>
      <ProgressBarWithTime />
    </>
  );
};

export default VideoReactPlayer;

function Subtitle({ subtitleText }: { subtitleText: string }) {
  const isVideoFullScreenOn = useTypedSelector((state) => state.VideoFullScreen.value);
  if (!subtitleText) return null;
  const cssClass = `video-subtitles-text-container ${
    isVideoFullScreenOn ? "video-subtitles-fullscreen" : "video-subtitles-floating"
  }`;
  return (
    <div data-testid="subtitle" className={cssClass}>
      {subtitleText}
    </div>
  );
}
