/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { PlaybackPanel } from "../PlaybackPanel";
import "../../../assets/resource/config.xml";
import styles from "./PlayerWindow.module.scss";
import SettingsPanel from "../PlaybackPanel/controls/SettingsPanel";
import classNames from "classnames";
import FullscreenVideo from "../PlaybackPanel/FullscreenVideo";
import { KeyName, getKey } from "../KeyEvents";
import { reqTizenVersion } from "../../helpers/reqTizenVersion";
import { setVideoFullScreenOn } from "../PlaybackPanel/VideoFullScreenSlice";
import { setMedia } from "../usePlayerFactory/utils/playAsset";
import { dispatch } from "../../reduxStore/store";

export default function PlayerWindow(props) {
  const playerRef = React.useRef(null);
  const isVideoFullScreenOn = useSelector((state) => state.VideoFullScreen.value);
  const allowFloating = reqTizenVersion(4);
  const [isFloatingFocusable, setIsFloatingFocusable] = useState(false);
  const [videoBg, setVideoBg] = useState(false);
  const media = useSelector((state) => state.playAsset.value.media);

  useEffect(() => {
    if (media !== undefined) {
      const isMediaOk = Object.keys(media).length > 0;
      setIsFloatingFocusable(isMediaOk);
      setVideoBg(isMediaOk);
    }
  }, [media]);

  useEffect(() => {
    setVideoBg(true);
  }, []);

  function handleStopBtn() {
    playerRef.current.pause();
    playerRef.current.seek(0);
    dispatch(setVideoFullScreenOn(false));
    setMedia(undefined);
  }

  const playerWindow = React.useRef(null);
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      const key = getKey(e);

      switch (key) {
        case KeyName.PLAYPAUSE:
          const isPaused = playerRef.current.getState().player.paused;
          return isPaused ? playerRef.current.play() : playerRef.current.pause();
        case KeyName.PAUSE:
          return playerRef.current.pause();
        case KeyName.REW:
          return playerRef.current.replay(10);
        case KeyName.FFW:
          return playerRef.current.forward(10);
        case KeyName.STOP:
          return handleStopBtn();
      }
    };

    if (!allowFloating) {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      playerWindow?.current?.addEventListener("keydown", handleKeyDown);
      return () => {
        playerWindow?.current?.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, []);

  return (
    <div
      id="top-player-window"
      className={styles.topPlayerWindow}
      style={{
        backgroundColor: videoBg && isVideoFullScreenOn ? "black" : allowFloating ? "transparent" : "black",
      }}
      ref={playerWindow}
    >
      <SettingsPanel />
      <div
        className={classNames(styles.videoWindowRightArea, {
          "set-min-width-to-100-percent": isVideoFullScreenOn,
        })}
      >
        <PlaybackPanel playbackSettings={props.playbackSettings} playerRef={playerRef} />
        {isFloatingFocusable && allowFloating && media !== undefined ? <FullscreenVideo /> : null}
      </div>
    </div>
  );
}
