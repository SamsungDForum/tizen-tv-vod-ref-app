/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AdvancedOptions from "./Tabs/AdvancedOptions/AdvancedOptions";
import LogsWindow from "./Tabs/Logs/LogsWindow";
import LogsTabPanel from "./Tabs/Logs/LogsTabPanel";
import ContentsWindow from "./Tabs/Contents/ContentsWindow";
import { tabsEnum } from "./NavigationTabSlice";
import styles from "./TabWorkspace.module.scss";
import LeftNavigationBar from "../LeftNavigationBar/LeftNavigationBar";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import PlottingSection from "./Tabs/AdvancedOptions/PlottingSection";

const renderSwitch = function (activeTab, props, isLeftBarOpen, droppedContent, setDroppedContent) {
  const isLogOverlayedOn = useSelector((state) => state.LogOverlayScreen.value);

  switch (activeTab) {
    case tabsEnum.allClips:
      return (
        <div className={`contents-window-wrapper ${isLeftBarOpen ? "transformed" : ""}`}>
          <ContentsWindow currentPlayer={props.currentPlayer} isCustomContent={false} />
        </div>
      );
    case tabsEnum.favoriteClips:
      return (
        <div className={`contents-window-wrapper ${isLeftBarOpen ? "transformed" : ""}`}>
          <ContentsWindow
            currentPlayer={props.currentPlayer}
            isCustomContent={true}
            droppedContent={droppedContent}
            setDroppedContent={setDroppedContent}
          />
        </div>
      );
    case tabsEnum.advanced:
      return (
        <div className={`contents-window-wrapper ${isLeftBarOpen ? "transformed" : ""}`}>
          <AdvancedOptions />
          <PlottingSection />
        </div>
      );
    case tabsEnum.logsMessages:
      let logsClass = isLogOverlayedOn === true ? "hide" : "log-container";
      return (
        <div className={`contents-window-wrapper ${isLeftBarOpen ? "transformed" : ""}`}>
          <LogsWindow logsContainerClass={logsClass} />
        </div>
      );
    default:
      return <div>Tab unknown</div>;
  }
};

export default function TabWorkspace(props) {
  const curNavigationTab = useSelector((state) => state.navigationTab.value);
  const isVideoFullScreenOn = useSelector((state) => state.VideoFullScreen.value);
  const isLeftBarOpen = useSelector((state) => state.LeftNavBar.isOpen);
  const [droppedContent, setDroppedContent] = useState(null);

  return (
    <div className={isVideoFullScreenOn ? "hide" : `${styles.tabWorkspace} ${styles.tabWorkspaceMin}`}>
      <LeftNavigationBar />
      {renderSwitch(curNavigationTab, props, isLeftBarOpen, droppedContent, setDroppedContent)}
      <ConfirmationModal />
    </div>
  );
}
