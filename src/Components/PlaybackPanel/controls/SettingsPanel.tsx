/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import "./settings-panel.scss";
import ModalPicker from "../../ModalPicker";
import {
  setAudioLanguage,
  setSubtitleLanguage,
  setVideoQuality,
  setKeySystem,
} from "../../usePlayerFactory/utils/playAsset";
import React, { useEffect, useRef } from "react";
import { dispatch } from "../../../reduxStore/store";
import { LogSvgIcon } from "../../../helpers/SvgIcons";
import StyledButton from "../../ModalPicker/StyledButton";
import { nav, navConfig } from "../../../../libs/spatial-navigation";
import GeneralSettings from "../../LeftNavigationBar/GeneralSettings";
import { useTypedSelector } from "../../../reduxStore/useTypedSelector";
import { SpatialCfg } from "../../../../libs/spatial-navigation/spatialCfgTypes";
import { getExpandableSections } from "../../LeftNavigationBar/LeftNavigationBar";
import { toggleShowPlayerLogs } from "../../WorkTabs/Tabs/Logs/Options/LogOverlayScreenSlice";

function SettingsPanel() {
  const playbackSettings = useTypedSelector((state) => state.setting);
  const isVideoFullScreenOn = useTypedSelector((state) => state.VideoFullScreen.value);
  const isOverlayVisible = useTypedSelector((state) => state.OverlayVisible.value);
  const isShowPlayerLogs = useTypedSelector((state) => state.LogOverlayScreen.showPlayerLogs);
  const playerSettingsRef = useRef(null);
  const {
    subtitle: {
      current: sub,
      list: [...subList],
    },
    audio: {
      current: audio,
      list: [...audioList],
    },
    videoQuality: {
      current: quality,
      list: [...qualityList],
    },
    keySystem: {
      current: key,
      list: [...keyList],
    },
  } = playbackSettings;

  useEffect(() => {
    const navSection = "settings-controls-panel";
    const cfg: SpatialCfg = { ...navConfig };
    cfg.defaultElement = "#video-player-logsbutton";
    cfg.enterTo = "default-element";
    cfg.selector = `${getExpandableSections(playerSettingsRef)}, #video-player-logsbutton`;

    if (isShowPlayerLogs) {
      cfg.leaveFor = {
        down: "@progress-control-bar",
        right: "@logs-messages-navigation-section",
      };
    } else {
      cfg.leaveFor = {
        down: "@progress-control-bar",
        right: "@playback-controls-nav-panel",
      };
    }

    nav.add(navSection, cfg);

    return () => {
      nav.remove(navSection);
    };
  }, [isShowPlayerLogs]);

  return (
    <div
      className={`
        ${isVideoFullScreenOn ? "video-player-settings-panel-control" : " hide"} 
        ${!isOverlayVisible && " fade-out-animation"}
    `}
    >
      <p className="video-option-title">General:</p>
      <GeneralSettings className={"player-button animated-player-button"} />
      <div className="player-settings-box" ref={playerSettingsRef}>
        <div className="nonExpandBorder">
          <StyledButton
            icon={<LogSvgIcon />}
            buttonName={`Toggle Logs`}
            id={`video-player-logsbutton`}
            label={isShowPlayerLogs ? "ON" : "OFF"}
            onClick={() => dispatch(toggleShowPlayerLogs(!isShowPlayerLogs))}
            className="player-button animated-player-button"
          />
        </div>

        <p className="video-option-title">Video settings:</p>
        <ModalPicker
          data={subList}
          initialLabel={sub}
          onSelectCallback={setSubtitleLanguage}
          navSectionName="lang-select-sub"
          label="Subtitle"
          className="player-button animated-player-button"
        />
        <ModalPicker
          data={audioList}
          initialLabel={audio}
          onSelectCallback={setAudioLanguage}
          navSectionName="lang-select-audio"
          label="Audio"
          className="player-button animated-player-button"
        />
        <ModalPicker
          data={qualityList}
          initialLabel={quality}
          onSelectCallback={setVideoQuality}
          navSectionName="qualityselect"
          label="Quality"
          className="player-button animated-player-button"
        />
        <ModalPicker
          data={keyList}
          initialLabel={key}
          onSelectCallback={setKeySystem}
          navSectionName="keysystemselect"
          label="DRM"
          className="player-button animated-player-button"
        />
      </div>
    </div>
  );
}

export default SettingsPanel;
