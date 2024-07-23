/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import "./PlaybackPanel.scss";
import React, { useEffect, useRef, useState } from "react";
import { SettingState } from "redux-states";
import toast from "react-hot-toast";

import { toggleSettingPanel } from "../usePlayerFactory/utils/setting";
import { useTypedSelector } from "../../reduxStore/useTypedSelector";
import { setChannelID } from "../ChannelZapping/ChannelZappingSlice";
import { reqTizenVersion } from "../../helpers/reqTizenVersion";
import { setMedia } from "../usePlayerFactory/utils/playAsset";
import { setVideoFullScreenOn } from "./VideoFullScreenSlice";
import LoadingSpinner from "./loadingSpinner/LoadingSpinner";
import { type PlayerMethods } from "./VideoReactPlayer";
import { ControlPanel } from "./controls/ControlPanel";
import { dispatch } from "../../reduxStore/store";
import VideoContainer from "./VideoContainer";
import Overlay from "../ModalPicker/Overlay";
import ChannelInfo from "./ChannelInfo";
import { navKeys } from "./navigation";

type PlaybackHandlerProps = {
  setSubtitleText: React.Dispatch<React.SetStateAction<string>>;
  playerRef: React.MutableRefObject<PlayerMethods | null>;
  subtitleText: string;
};
export function playbackHandlers({ setSubtitleText, playerRef, subtitleText }: PlaybackHandlerProps) {
  return {
    onSubtitleTextUpdate: (text: string) => setSubtitleText(text),
    onPlayPauseClick: () => {
      if (playerRef.current.getState().player.paused) {
        playerRef.current.play();
      } else {
        playerRef.current.pause();
      }
    },
    onSetSubtitlesClick: () => setSubtitleText(renderSubtitleText(subtitleText)),
    onRewindClick: () => {
      playerRef.current.replay(10);
    },
    onFastForwardClick: () => {
      playerRef.current.forward(10);
    },
    onRestartClick: () => {
      playerRef.current.seek(0);
      playerRef.current.play();
    },
    onHandleAbort: () => {
      playerRef.current.pause();
      playerRef.current.seek(0);
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
  playerRef: React.MutableRefObject<PlayerMethods | null>;
};
type PlaybackStateType = { src: string; paused: boolean; height: string | number };
type PlayerStates = { currentTime: number };

const PlaybackPanel = ({ playbackSettings, playerRef }: Props) => {
  const [showLoading, setShowLoading] = useState(false);
  const [subtitleText, setSubtitleText] = useState("");
  const [playerState, setPlayerState] = useState({});

  const playbackState = useRef<PlaybackStateType | undefined>(undefined);
  const overlayTimeoutID = useRef(-1);

  const media = useTypedSelector((state) => state.playAsset.value.media);
  const isVideoFullScreenOn = useTypedSelector((state) => state.VideoFullScreen.value);
  const isOverlayVisible = useTypedSelector((state) => state.OverlayVisible.value);
  const data = useTypedSelector((state) => state.ChannelZapping.channelList);
  const allowFloating = reqTizenVersion(4);

  function handlePlaybackStateChange() {
    if (!sameVideoSource()) {
      setSubtitleText("");
    }

    playbackState.current = {
      src: playerRef.current.getState().player.src,
      paused: playerRef.current.getState().player.paused,
      height: playerRef.current.videoHeight,
    };
  }

  function sameVideoSource() {
    if (playbackState && playerRef) {
      return playbackState.current?.src === playerRef.current?.getState().player.src;
    }
    return false;
  }

  useEffect(() => {
    try {
      if (playbackSettings.source.current) {
        navKeys.startHidingVideoOverlay(overlayTimeoutID);
        if (playerRef.current) {
          playerRef.current.subscribeToStateChange(handlePlaybackStateChange);
          setTimeout(() => {
            toast.success(`The ${playbackSettings.source.current?.label} player selected`, {
              duration: 3000,
              style: {
                maxWidth: "400px",
              },
            });
          });
        }
      } else {
        // Remove existing state change subscription during player change.
        // Since there's no 'unsubscribe', use dummy handler.
        playerRef.current.subscribeToStateChange(() => {});
      }
    } catch (err) {
      alert(`Something went wrong during the player switching: ${JSON.stringify(err)} `);
    }
  }, [playbackSettings.source.current]);

  useEffect(() => {
    toggleSettingPanel();
  }, []);

  useEffect(() => {
    playerRef.current.subscribeToStateChange(handlePlaybackStateChange);
  }, [isVideoFullScreenOn]);

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
      if (index !== -1) {
        dispatch(setChannelID(index));
      }
    }
  }, [isVideoFullScreenOn]);

  function handleBind(state: PlayerStates) {
    if (state.currentTime > 0 && isVideoFullScreenOn) {
      setShowLoading(false);
    } else if (isVideoFullScreenOn) {
      setShowLoading(true);
    }
    setPlayerState(state);
  }

  useEffect(() => {
    playerRef.current?.subscribeToStateChange(handleBind);
    if (playerRef.current.getState().player.src === "") {
      setShowLoading(false);
    }

    return () => {
      playerRef.current?.subscribeToStateChange(() => {});
    };
  }, [playerState]);

  return (
    <>
      <Overlay isActivated={isVideoFullScreenOn && isOverlayVisible} />

      <div
        className={`${"video-window-big"} ${allowFloating && !isVideoFullScreenOn ? "floating-video" : ""} ${
          media && Object.entries(media).length > 0 ? "background-black" : ""
        } ${media === undefined && "hide"}`}
      >
        <LoadingSpinner showLoading={showLoading} setShowLoading={setShowLoading} terminateTimeout={500} />
        <div
          className={`${
            allowFloating && !isVideoFullScreenOn && media?.id !== undefined ? "id-while-floating" : "hide"
          }`}
        >
          {`ID: ${media?.id}`}
        </div>

        <ChannelInfo />

        <VideoContainer playbackSettings={playbackSettings} playerRef={playerRef} />
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

        <ControlPanel
          buttonClickHandlers={playbackHandlers({
            playerRef: playerRef,
            setSubtitleText: setSubtitleText,
            subtitleText: subtitleText,
          })}
        />
      </div>
    </>
  );
};

export default PlaybackPanel;
