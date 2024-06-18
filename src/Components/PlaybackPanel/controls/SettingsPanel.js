/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, { useEffect, useRef } from "react";
import "./settings-panel.scss";
import ModalPicker from "../../ModalPicker";
import { setAudioLanguage, setSubtitleLanguage, setVideoQuality, setKeySystem } from "../../usePlayerFactory/utils/playAsset";
import { useSelector } from "react-redux";
import { nav, navConfig } from "../../../../libs/spatial-navigation";
import GeneralSettings from "../../LeftNavigationBar/GeneralSettings";
import StyledButton from "../../ModalPicker/StyledButton";
import { LogSvgIcon } from "../../../helpers/SvgIcons";
import { dispatch } from "../../../reduxStore/store";
import { toggleShowPlayerLogs } from "../../WorkTabs/Tabs/Logs/Options/LogOverlayScreenSlice";
import { getExpandableSections } from "../../LeftNavigationBar/LeftNavigationBar";
function SettingsPanel() {
  const playbackSettings = useSelector((state) => state.setting);
  const {
    source: { current: currPlayer },
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

  const classNormalScreen = "video-player-settings-panel-control";
  const isVideoFullScreenOn = useSelector((state) => state.VideoFullScreen.value);
  const classScreen = isVideoFullScreenOn ? classNormalScreen : "hide";
  const isOverlayVisible = useSelector((state) => state.OverlayVisible.value);
  const isShowPlayerLogs = useSelector((state) => state.LogOverlayScreen.showPlayerLogs);
  const playerSettingsRef = useRef(null);

  useEffect(() => {
    const navSection = "settings-controls-panel";
    const cfg = { ...navConfig };
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
    <div className={(isVideoFullScreenOn ? classScreen : " hide") + (isOverlayVisible ? "" : " fade-out-animation")}>
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
