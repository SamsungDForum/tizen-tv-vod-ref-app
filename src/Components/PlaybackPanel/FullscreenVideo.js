import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { nav, navConfig } from "../../../libs/spatial-navigation";
import { setVideoFullScreenOn } from "./VideoFullScreenSlice";
import { dispatch } from "../../reduxStore/store";

const FullscreenVideo = () => {
  const isVideoFullScreenOn = useSelector((state) => state.VideoFullScreen.value);

  const switchOffVideoFullScreen = function (evt) {
    dispatch(setVideoFullScreenOn(true));
    evt.preventDefault();
    evt.stopPropagation();
  };

  useEffect(() => {
    if (!isVideoFullScreenOn) {
      const navSection = "fullscreen-video-button";
      const cfg = { ...navConfig };
      cfg.selector = "#fullscreen";
      cfg.leaveFor = { left: "@left-navigation-bar", down: "@asset-view", up: "" };
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
          <button
            id="fullscreen"
            className={"fullscreen-btn"}
            onClick={(evt) => switchOffVideoFullScreen(evt)}
          ></button>
        </section>
      )}
    </>
  );
};

export default FullscreenVideo;
