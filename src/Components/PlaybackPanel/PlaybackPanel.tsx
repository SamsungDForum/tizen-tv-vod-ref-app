/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { SettingState } from "redux-states";
import "./PlaybackPanel.scss";

import { reqTizenVersion } from "../../helpers/reqTizenVersion";
import { dispatch } from "../../reduxStore/store";
import { useTypedSelector } from "../../reduxStore/useTypedSelector";
import { setChannelID } from "../ChannelZapping/ChannelZappingSlice";
import VideoSpinner from "../Loaders/videoSpinner/VideoSpinner";
import Overlay from "../ModalPicker/Overlay";
import { toggleSettingPanel } from "../usePlayerFactory/utils/setting";
import ChannelInfo from "./ChannelInfo";
import VideoContainer from "./VideoContainer";
import { ControlPanel } from "./controls/ControlPanel";
import { navKeys } from "./navigation";
import { getNullableVideoElement } from "../usePlayerFactory/PlayerFactory/classes/utils/getVideoElement";
import { playbackHandlers } from "./controls/playbackHandlers";

type Props = {
  playbackSettings: SettingState;
};

const PlaybackPanel = ({ playbackSettings }: Props) => {
  const [subtitleText, setSubtitleText] = useState("");
  const [playbackSrc, setPlaybackSrc] = useState<string | null>(null);

  const overlayTimeoutID = useRef(-1);

  const media = useTypedSelector((state) => state.playAsset.value.media);
  const isVideoFullScreenOn = useTypedSelector((state) => state.VideoFullScreen.value);
  const isOverlayVisible = useTypedSelector((state) => state.OverlayVisible.value);
  const data = useTypedSelector((state) => state.ChannelZapping.channelList);

  const allowFloating = reqTizenVersion(4);
  const video = getNullableVideoElement();

  function handlePlaybackStateChange() {
    if (!sameVideoSource()) setSubtitleText("");
    setPlaybackSrc(video?.src ?? null);
  }

  function sameVideoSource() {
    if (playbackSrc && video) return playbackSrc === video.src;
    else return false;
  }

  useEffect(() => {
    try {
      if (playbackSettings.source.current) {
        navKeys.startHidingVideoOverlay(overlayTimeoutID);
        if (video) {
          video.addEventListener("loadedmetadata", handlePlaybackStateChange);

          console.log("log", playbackSettings.source.current?.label);
          toast.success(`The ${playbackSettings.source.current?.label} player selected`);
        }
      }

      return () => {
        if (video) video.removeEventListener("loadedmetadata", handlePlaybackStateChange);
      };
    } catch (err) {
      toast.error(`Something went wrong during the player switching: ${JSON.stringify(err)}`);
      console.error(`Something went wrong during the player switching: ${JSON.stringify(err)}`);
    }
  }, [playbackSettings.source.current, video]);

  useEffect(() => {
    toggleSettingPanel();
  }, []);

  useEffect(() => {
    navKeys.initialize(onKeyEvent, onNavigationEvent, onKeyUpEvent);
    return () => {
      navKeys.destroy(onKeyEvent, onNavigationEvent, onKeyUpEvent);
    };
  }, [isOverlayVisible, isVideoFullScreenOn]);

  function onNavigationEvent(evt) {
    navKeys.onNavigationEvent(evt, [isOverlayVisible, overlayTimeoutID, isVideoFullScreenOn]);
  }

  function onKeyUpEvent(evt) {
    navKeys.onKeyUpEvent(evt, [isOverlayVisible, overlayTimeoutID, isVideoFullScreenOn]);
  }

  function onKeyEvent(evt) {
    navKeys.onKeyEvent(evt, [isOverlayVisible, overlayTimeoutID, isVideoFullScreenOn]);
  }

  useEffect(() => {
    if (data?.list?.length !== 0) {
      const index = data?.list?.findIndex((id) => id === media?.id);
      if (index !== -1) dispatch(setChannelID(index));
    }
  }, [isVideoFullScreenOn]);

  return (
    <>
      <Overlay isActivated={isVideoFullScreenOn && isOverlayVisible} />
      <div
        className={`${"video-window-big"} ${allowFloating && !isVideoFullScreenOn ? "floating-video" : ""} ${
          media && Object.entries(media).length > 0 ? "background-black" : ""
        } ${media === undefined && "hide"}`}
      >
        <VideoSpinner video={video} />
        <div
          className={`${
            allowFloating && !isVideoFullScreenOn && media?.id !== undefined ? "id-while-floating" : "hide"
          }`}
        >
          {`ID: ${media?.id}`}
        </div>

        <ChannelInfo />

        <VideoContainer playbackSettings={playbackSettings} />
      </div>
      <div
        className="player-overlay"
        style={{
          backgroundColor: !allowFloating && !isVideoFullScreenOn ? "black" : "transparent",
          opacity: !allowFloating && !isVideoFullScreenOn ? 0.6 : 1,
        }}
      >
        <div
          className={`${isVideoFullScreenOn ? "video-clip-title" : "hide"} ${
            !isOverlayVisible && "fade-out-animation"
          }`}
        >
          ID:{media?.id} - {media?.name}
        </div>
        {video && (
          <ControlPanel
            buttonClickHandlers={playbackHandlers({
              setSubtitleText: setSubtitleText,
              subtitleText: subtitleText,
              video: video,
            })}
          />
        )}
      </div>
    </>
  );
};

export default PlaybackPanel;
