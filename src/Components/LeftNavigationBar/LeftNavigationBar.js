/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, { useEffect, useRef } from "react";
import GeneralSettings from "./GeneralSettings";
import LogsTabPanel from "../WorkTabs/Tabs/Logs/LogsTabPanel";
import { useSelector } from "react-redux";
import { FiltersPanel } from "../WorkTabs/Tabs/Contents/ContentFilters/FiltersPanel";
import styles from "./leftNavigationBar.module.scss";
import ImportExportClips from "../FavouriteClips/ImportExportClips";
import { tabsEnum } from "../WorkTabs/NavigationTabSlice";
import ThemePicker from "../ColorsChanger/ThemePicker";
import { reqTizenVersion } from "../../helpers/reqTizenVersion";
import { dispatch } from "../../reduxStore/store";
import { setIsLeftBarOpen } from "./LeftNavBarSlice";
import { nav, navConfig } from "../../../libs/spatial-navigation";
import QuickFavBtn from "../FavouriteClips/QuickFavBtn/QuickFavBtn";
import ChartConfig from "./ChartConfig/ChartConfig";
import { useTypedSelector } from "../../reduxStore/useTypedSelector";
import { isTizenSupported } from "../../../libs/resource-buffer/isTizenSupported";

export const getExpandableSections = (getFrom) => {
  const sections = Array.from(getFrom.current.getElementsByTagName("section"));
  const selectorArr = sections.map((child) => "#" + child.querySelector("button").id);
  return selectorArr.join(", ");
};

const LeftNavigationBar = () => {
  const curNavigationTab = useSelector((state) => state.navigationTab.value);
  const allowFloating = reqTizenVersion(4);
  const sidebarRef = useRef(null);
  const isLeftBarOpen = useSelector((state) => state.LeftNavBar.isOpen);
  const isVideoFullScreenOn = useSelector((state) => state.VideoFullScreen.value);
  const favClips = useSelector((state) => state.FavouriteClips.myClips);

  useEffect(() => {
    const navSection = "left-navigation-bar";
    const cfg = { ...navConfig };
    cfg.selector = `${getExpandableSections(sidebarRef)}, .leftBarElement`;
    cfg.enterTo = "last-focused";
    cfg.leaveFor = {
      right: "@asset-view",
      up: "@fullscreen-video-button",
      down: "",
      left: "",
    };

    if (curNavigationTab === tabsEnum.logsMessages) {
      cfg.leaveFor = { up: "@fullscreen-video-button", right: "@logs-messages-navigation-section" };
    }
    if (curNavigationTab === tabsEnum.advanced) {
      cfg.leaveFor = { up: "@fullscreen-video-button", right: "@fullscreen-video-button" };
    }

    if (isVideoFullScreenOn) {
      cfg.leaveFor = {
        up: "@fullscreen-video-button",
        right: "@progress-control-bar",
        down: "@settings-controls-panel",
      };
    }

    nav.add(navSection, cfg);
    return () => {
      nav.remove(navSection);
    };
  }, [isVideoFullScreenOn, curNavigationTab]);

  useEffect(() => {
    let isMounted = true;
    let buttonFunctionArea = document.getElementById("sidebar-area");
    buttonFunctionArea.addEventListener("sn:focused", function () {
      if (isMounted) {
        dispatch(setIsLeftBarOpen(true));
      }
    });

    buttonFunctionArea.addEventListener("sn:unfocused", function () {
      setTimeout(function () {
        if (!buttonFunctionArea.querySelector(".button:focus") && isMounted) {
          dispatch(setIsLeftBarOpen(false));
        }
      });
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleMouseEnter = () => {
    dispatch(setIsLeftBarOpen(true));
  };

  const handleMouseLeave = () => {
    dispatch(setIsLeftBarOpen(false));
  };

  function leftBarRenderSwitch() {
    switch (curNavigationTab) {
      case tabsEnum.allClips:
        return (
          <div className={styles.buttonBox}>
            <div>
              <p className={styles.optionTitle}>Filters:</p>
              <FiltersPanel isLeftBarOpen={isLeftBarOpen} />
            </div>
            <QuickFavBtn />
          </div>
        );
      case tabsEnum.favoriteClips:
        return (
          <div className={styles.buttonBox}>
            <div>
              <p className={styles.optionTitle}>Filters:</p>
              <FiltersPanel isLeftBarOpen={isLeftBarOpen} />
              <ImportExportClips />
            </div>
            <QuickFavBtn isDisabled={favClips.length === 0} />
          </div>
        );
      case tabsEnum.advanced:
        return (
          <div>
            {allowFloating && <ThemePicker />}
            {isTizenSupported && (
              <>
                <p className={styles.optionTitle}>RESOURCE CONSUMPTION:</p>
                <ChartConfig />
              </>
            )}
          </div>
        );
      case tabsEnum.logsMessages:
        return <LogsTabPanel />;
    }
  }

  return (
    <div
      ref={sidebarRef}
      id="sidebar-area"
      className={`${styles.sidebar} ${isLeftBarOpen ? styles.expandedSidebar : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <p className={styles.optionTitle}>General:</p>
      <GeneralSettings />
      {leftBarRenderSwitch()}
    </div>
  );
};

export default LeftNavigationBar;
