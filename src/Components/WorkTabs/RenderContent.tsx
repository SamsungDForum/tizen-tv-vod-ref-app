/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, { useState } from "react";
import { useTypedSelector } from "../../reduxStore/useTypedSelector";
import PlottingSection from "./Tabs/AdvancedContent/PlottingSection";
import GraphsSection from "./Tabs/AdvancedContent/GraphsSection";
import ContentsWindow from "./Tabs/Contents/ContentsWindow";
import { tabsEnum } from "./NavigationTabSlice";
import LogsWindow from "./Tabs/Logs/LogsWindow";
import { PlayerInfo } from "./TabWorkspace";

type Props = {
  currentPlayer: PlayerInfo;
};

export default function RenderContent({ currentPlayer }: Props) {
  const [droppedContent, setDroppedContent] = useState(null);
  const isLogOverlayedOn = useTypedSelector((state) => state.LogOverlayScreen.value);
  const activeTab = useTypedSelector((state) => state.navigationTab.value);
  const isLeftBarOpen = useTypedSelector((state) => state.LeftNavBar.isOpen);

  switch (activeTab) {
    case tabsEnum.allClips:
      return (
        <div className={`contents-window-wrapper ${isLeftBarOpen ? "transformed" : ""}`}>
          <ContentsWindow currentPlayer={currentPlayer} isCustomContent={false} />
        </div>
      );
    case tabsEnum.favoriteClips:
      return (
        <div className={`contents-window-wrapper ${isLeftBarOpen ? "transformed" : ""}`}>
          <ContentsWindow
            currentPlayer={currentPlayer}
            isCustomContent={true}
            droppedContent={droppedContent}
            setDroppedContent={setDroppedContent}
          />
        </div>
      );
    case tabsEnum.advanced:
      return (
        <div className={`contents-window-wrapper ${isLeftBarOpen ? "transformed" : ""}`}>
          <GraphsSection />
          <PlottingSection />
        </div>
      );
    case tabsEnum.logsMessages:
      let logsClass = isLogOverlayedOn === true ? "hide" : "log-container";
      return (
        <div className={`contents-window-wrapper ${isLeftBarOpen ? "transformed" : ""}`}>
          <LogsWindow logsContainerClass={logsClass} styles={""} />
        </div>
      );
    default:
      return <div>Tab unknown</div>;
  }
}
