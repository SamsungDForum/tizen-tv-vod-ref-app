/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, { useRef, useState, useEffect } from "react";
import { ControlPanel } from "./controls/ControlPanel";
import "./PlaybackPanel.scss";
import { toggleSettingPanel } from "../usePlayerFactory/utils/setting";
import { navKeys } from "./navigation";
import { VideoContainer } from "./VideoContainer";
import Overlay from "./../ModalPicker/Overlay";
import { reqTizenVersion } from "../../helpers/reqTizenVersion";
import LoadingSpinner from "./loadingSpinner/LoadingSpinner";
import { setChannelID } from "../ChannelZapping/ChannelZappingSlice";
import { dispatch } from "../../reduxStore/store";
import { useTypedSelector } from "../../reduxStore/useTypedSelector";
import ChannelInfo from "./ChannelInfo";
import toast from "react-hot-toast";
import { setMedia } from "../usePlayerFactory/utils/playAsset";
import { setVideoFullScreenOn } from "./VideoFullScreenSlice";

export function PlaybackPanel({ playbackSettings, playerRef }) {
  const [subtitleText, setSubtitleText] = useState("");
  const playbackState = useRef(undefined);
  const StashedKey = useRef(undefined);
  const overlayTimeoutID = useRef(-1);
  const media = useTypedSelector(state => state.playAsset.value.media);
  const isVideoFullScreenOn = useTypedSelector(state => state.VideoFullScreen.value);
  const isOverlayVisible = useTypedSelector(state => state.OverlayVisible.value);
  const subtitleOption = useTypedSelector(state => state.setting.subtitle);
  const data = useTypedSelector(state => state.ChannelZapping.channelList);
  const isLogOverlayedOn = useTypedSelector(state => state.LogOverlayScreen.value);
  const allowFloating = reqTizenVersion(4);


  const playbackHandlers = {
    onSubtitleTextUpdate: (text) => setSubtitleText(text),
    onPlayPauseClick: () => {
      if (playerRef.current.getState().player.paused) {
        playerRef.current.play();
      } else {
        playerRef.current.pause();
      }
    },
    onSetSubtitlesClick: (_) => setSubtitleText(renderSubtitleText()),
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
      dispatch(setVideoFullScreenOn(false))
      setMedia(undefined)
    }
  };

  function renderSubtitleText() {
    return subtitleOption.current !== "off" ? subtitleText : "";
  }

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

  const setLogContainerClass = (overlayOn) =>
    overlayOn === false
      ? "hide"
      : isVideoFullScreenOn === false
      ? isOverlayVisible
        ? "log-container-overlay"
        : "log-container-overlay-only"
      : isOverlayVisible
      ? "log-container-overlay-fullscreen"
      : "log-container-overlay-fullscreen-only";

  React.useEffect(() => {
    try {
      if (playbackSettings.source.current) {
        navKeys.startHidingVideoOverlay(overlayTimeoutID, isVideoFullScreenOn);
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

  React.useEffect(() => {
    toggleSettingPanel();
  }, []);

  React.useEffect(() => {
    StashedKey.current = undefined;
    playerRef.current.subscribeToStateChange(handlePlaybackStateChange);
  }, [isVideoFullScreenOn]);

  React.useEffect(() => {
    navKeys.initialize(onKeyEvent, onNavigationEvent, onKeyUpEvent);
    return () => {
      navKeys.destroy(onKeyEvent, onNavigationEvent, onKeyUpEvent);
    };
  }, [isOverlayVisible, isVideoFullScreenOn]);

  function onKeyEvent(evt) {
    navKeys.onKeyEvent(evt);
  }

  function onNavigationEvent(evt) {
    navKeys.onNavigationEvent(evt, [isOverlayVisible, overlayTimeoutID, isVideoFullScreenOn]);
  }

  function onKeyUpEvent(evt) {
    navKeys.onKeyUpEvent(evt, [isOverlayVisible, overlayTimeoutID, isVideoFullScreenOn]);
  }

  function onKeyEvent(evt) {
    navKeys.onKeyEvent(evt, [isOverlayVisible, overlayTimeoutID, isVideoFullScreenOn]);
  }

  React.useEffect(() => {
    StashedKey.current = undefined;
  }, [media]);

  React.useEffect(() => {
    if (data?.list?.length !== 0) {
      const index = data?.list?.findIndex(id => id === media?.id);
      if (index !== -1) {
        dispatch(setChannelID(index));
      }
    }
  }, [isVideoFullScreenOn]);


  const [showLoading, setShowLoading] = useState(false);
  const [playerState, setPlayerState] = useState({});

  function handleBind(state) {
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

      
      <div  className={`${"video-window-big"} ${allowFloating && !isVideoFullScreenOn ? "floating-video" : ""} ${
          media && Object.entries(media).length > 0 ? "background-black" : "" } ${media === undefined && 'hide'}`}
      >
        <LoadingSpinner playerRef={playerRef} />
        <div
          className={`${
            allowFloating && !isVideoFullScreenOn && media?.id !== undefined ? "id-while-floating" : "hide"
          }`}
        >
          {`ID: ${media?.id}`}
        </div>

        <ChannelInfo />

        <VideoContainer
          isOverlayVisible={isOverlayVisible}
          playbackHandlers={playbackHandlers}
          playbackSettings={playbackSettings}
          playerRef={playerRef}
          renderSubtitleText={renderSubtitleText}
          setLogContainerClass={setLogContainerClass}
          isLogOverlayedOn={isLogOverlayedOn}
        />
      </div>

      <div
        className="player-overlay"
        style={{
          backgroundColor: !allowFloating && !isVideoFullScreenOn ? "black" : "transparent",
          opacity: !allowFloating && !isVideoFullScreenOn ? 0.6 : 1,
        }}
      >
        <div
          className={
            (isVideoFullScreenOn ? "video-clip-title" : "hide") + (isOverlayVisible ? "" : " fade-out-animation")
          }
        >
         ID:{media?.id} - {media?.name}
        </div>

        <ControlPanel
          isOverlayVisible={isOverlayVisible}
          buttonClickHandlers={playbackHandlers}
          {...playbackSettings}
          navKeys={navKeys}
        />
      </div>
    </>
  );
}
