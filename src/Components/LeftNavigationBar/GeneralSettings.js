/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import ModalPicker from "../ModalPicker";
import { dispatch } from "../../reduxStore/store";
import { setNavigationTab, tabs } from "../WorkTabs/NavigationTabSlice";
import { getPlayerData, playerSelection } from "../../../configs/player";
import { sourcePending } from "../usePlayerFactory/utils/setting";
import { PlayerSvgIcon, ViewSvgIcon } from "../../helpers/SvgIcons";
import { setVideoFullScreenOn } from "../PlaybackPanel/VideoFullScreenSlice";

const GeneralSettings = ({ className }) => {
  const playbackSettings = useSelector((state) => state.setting);
  const {
    source: { current: currPlayer },
  } = playbackSettings;

  const isOverlayVisible = useSelector((state) => state.OverlayVisible.value);
  const isVideoFullScreenOn = useSelector((state) => state.VideoFullScreen.value);
  const curNavigationTab = useSelector((state) => state.navigationTab.value);
  
  const navCb = useCallback((cbData) => {
    const val = cbData;
    dispatch(setNavigationTab(val));
  }, []);

  const media = useSelector((state) => state.playAsset.value.media);

  useEffect(() => {
    if (media !== undefined) {
      if (Object.entries(media).length > 0) {
        dispatch(setVideoFullScreenOn(true));
      }
    }
  }, []);

  return (
    <div
      className={isOverlayVisible || !isVideoFullScreenOn ? "player-selection-picker-position" : "fade-out-animation"}
    >
      <ModalPicker
        icon={<ViewSvgIcon />}
        data={tabs}
        onSelectCallback={({ category, option }) => {
          navCb(category);
          dispatch(setVideoFullScreenOn(false));
        }}
        initialLabel={curNavigationTab}
        navSectionName="menubar-view-switch"
        label="View"
        className={className}
      />

      <ModalPicker
        icon={<PlayerSvgIcon />}
        data={getPlayerData()}
        initialLabel={currPlayer ? currPlayer.label : ""}
        onSelectCallback={({ category: name, option: version }) => {
          const allPlayers = playerSelection();
          const src = allPlayers.find(player => player.label === `${name} ${version}`);
          sourcePending(src);
        }}
        navSectionName="menubar-playerselect"
        label="Player"
        className={className}
      />
    </div>
  );
};

export default GeneralSettings;
