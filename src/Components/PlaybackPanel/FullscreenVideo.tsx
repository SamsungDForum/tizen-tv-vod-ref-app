/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, { useEffect } from "react";
import { useTypedSelector } from "../../reduxStore/useTypedSelector";
import { setVideoFullScreenOn } from "./VideoFullScreenSlice";
import { dispatch } from "../../reduxStore/store";
import { nav, navConfig } from "../../../libs/spatial-navigation";
import { SpatialCfg } from "../../../libs/spatial-navigation/spatialCfgTypes";

const FullscreenVideo = () => {
  const isVideoFullScreenOn = useTypedSelector((state) => state.VideoFullScreen.value);

  const switchOffVideoFullScreen = function (evt: React.MouseEvent) {
    dispatch(setVideoFullScreenOn(true));
    evt.preventDefault();
    evt.stopPropagation();
  };

  useEffect(() => {
    if (!isVideoFullScreenOn) {
      const navSection = "fullscreen-video-button";
      const cfg: SpatialCfg = { ...navConfig };
      cfg.selector = "#fullscreen";
      cfg.leaveFor = {
        left: "@left-navigation-bar",
        down: "@asset-view",
        up: "",
      };
      nav.add(navSection, cfg);
      return () => {
        nav.remove(navSection);
      };
    }
  }, [isVideoFullScreenOn]);

  return (
    <>
      {!isVideoFullScreenOn && (
        <section className={"fullscreen-section"}>
          <button id="fullscreen" className={"fullscreen-btn"} onClick={(evt) => switchOffVideoFullScreen(evt)} />
        </section>
      )}
    </>
  );
};

export default FullscreenVideo;
