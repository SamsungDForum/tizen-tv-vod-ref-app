import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dispatch } from "../reduxStore/store";
import { nav } from "../../libs/spatial-navigation";
import { tabsEnum } from "../Components/WorkTabs/NavigationTabSlice";

const focusBehavior = () => {
  const favClips = useSelector((state) => state.FavouriteClips.myClips);
  const curNavigationTab = useSelector((state) => state.navigationTab.value);
  const isVideoFullScreenOn = useSelector((state) => state.VideoFullScreen.value);
  const showConfirm = useSelector((state) => state.ModalSlice.showConfirm);
  const actionType = useSelector((state) => state.ModalSlice.actionType);

  const focusOn = (target) => {
    nav.focus(target);
  };

  useEffect(() => {
    if (isVideoFullScreenOn) {
      focusOn("settings-controls-panel");
    }
    if (!isVideoFullScreenOn) {
      switch (curNavigationTab) {
        case tabsEnum.allClips:
          focusOn("asset-view");
          break;
        case tabsEnum.favoriteClips:
          favClips.length > 0 ? focusOn("asset-view") : focusOn("left-navigation-bar");
          break;
        default:
          focusOn("left-navigation-bar");
          break;
      }
    }
  }, [isVideoFullScreenOn, favClips]);

  useEffect(() => {
    if (actionType === "exitapp") {
      focusOn("left-navigation-bar");
    } else {
      switch (curNavigationTab) {
        case tabsEnum.allClips:
          focusOn("asset-view");
          break;
        default:
          focusOn("left-navigation-bar");
          break;
      }
    }
  }, [showConfirm]);
};

export default focusBehavior;
