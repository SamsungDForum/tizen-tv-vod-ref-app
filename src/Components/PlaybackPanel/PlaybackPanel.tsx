/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import "./PlaybackPanel.scss";
import React, { useEffect, useRef, useState } from "react";
import { SettingState } from "redux-states";
import toast, { Toaster } from "react-hot-toast";

import { toggleSettingPanel } from "../usePlayerFactory/utils/setting";
import LoadingSpinner from "../Loaders/loadingSpinner/LoadingSpinner";
import { useTypedSelector } from "../../reduxStore/useTypedSelector";
import { setChannelID } from "../ChannelZapping/ChannelZappingSlice";
import { reqTizenVersion } from "../../helpers/reqTizenVersion";
import { setMedia } from "../usePlayerFactory/utils/playAsset";
import { setVideoFullScreenOn } from "./VideoFullScreenSlice";
import { ControlPanel } from "./controls/ControlPanel";
import { dispatch } from "../../reduxStore/store";
import VideoContainer from "./VideoContainer";
import Overlay from "../ModalPicker/Overlay";
import ChannelInfo from "./ChannelInfo";
import { navKeys } from "./navigation";
import { getNullableVideoElement } from "../usePlayerFactory/PlayerFactory/classes/utils/getVideoElement";

type PlaybackHandlerProps = {
  setSubtitleText: React.Dispatch<React.SetStateAction<string>>;
  subtitleText: string;
  video: HTMLVideoElement;
};

export const onRewind = (video: HTMLVideoElement, isForward = false) => {
  if (isForward) video.currentTime = Math.floor(video.currentTime) + 10;
  else video.currentTime = Math.floor(video.currentTime) - 10;
};
export function playbackHandlers({ setSubtitleText, subtitleText, video }: PlaybackHandlerProps) {
  return {
    onSubtitleTextUpdate: (text: string) => setSubtitleText(text),
    onPlayPauseClick: () => (video.paused ? video.play() : video.pause()),
    onSetSubtitlesClick: () => setSubtitleText(renderSubtitleText(subtitleText)),
    onRewindClick: () => onRewind(video),
    onFastForwardClick: () => onRewind(video, true),
    onRestartClick: () => {
      video.currentTime = 0;
      video.play();
    },
    onHandleAbort: () => {
      video.pause();
      video.currentTime = 0;
      dispatch(setVideoFullScreenOn(false));
      setMedia(undefined);
    },
  };
}

function renderSubtitleText(subtitleText: string) {
  const subtitleOption = useTypedSelector((state) => state.setting.subtitle);

  return subtitleOption.current !== "off" ? subtitleText : "";
}

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
          // There is a problem with appearing this toast, but I temporary fix it by using <Toaster /> in this component
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
        <LoadingSpinner video={video} />
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
      <Toaster /> {/*This toaster is temporary, to fix issue with not displaying toast */}
    </>
  );
};

export default PlaybackPanel;
