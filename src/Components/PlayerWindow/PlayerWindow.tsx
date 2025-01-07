/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, { useState, useEffect, useRef } from "react";
import PlaybackPanel from "../PlaybackPanel/PlaybackPanel";
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
import { useTypedSelector } from "../../reduxStore/useTypedSelector";
import { getNullableVideoElement } from "../usePlayerFactory/PlayerFactory/classes/utils/getVideoElement";

export default function PlayerWindow(props) {
  const playerWindow = useRef<HTMLDivElement>(null);
  const [isFloatingFocusable, setIsFloatingFocusable] = useState(false);
  const [videoBg, setVideoBg] = useState(false);

  const isVideoFullScreenOn = useTypedSelector((state) => state.VideoFullScreen.value);
  const media = useTypedSelector((state) => state.playAsset.value.media);

  const allowFloating = reqTizenVersion(4);
  const video = getNullableVideoElement();

  function handleStopBtn() {
    video?.pause();
    dispatch(setVideoFullScreenOn(false));
    setMedia(undefined);
  }

  function handleKeyDown(e) {
    const key = getKey(e);
    if (!video) return null;
    switch (key) {
      case KeyName.PLAYPAUSE:
        const isPaused = video.paused;
        return isPaused ? video.play() : video.pause();
      case KeyName.PAUSE:
        return video.pause();
      case KeyName.REW:
        return (video.currentTime = video.currentTime - 10);
      case KeyName.FFW:
        return (video.currentTime = video.currentTime + 10);
      case KeyName.STOP:
        return handleStopBtn();
    }
  }

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

  useEffect(() => {
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
  }, [video]);

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
        <PlaybackPanel playbackSettings={props.playbackSettings} />
        {isFloatingFocusable && allowFloating && media !== undefined ? <FullscreenVideo /> : null}
      </div>
    </div>
  );
}
