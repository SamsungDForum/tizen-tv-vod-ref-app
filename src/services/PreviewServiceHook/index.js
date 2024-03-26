import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getTizenVersion, isTizenPlatform } from "../../../libs/tizenFilesystem";
import { setStaticPreview } from "./backroundServiceHelpers";
import throttledUseEffect from "./throttledUseEffect";

function PreviewServiceHook() {
  const favClips = useSelector(state => state.FavouriteClips.myClips);
 
  useEffect(() => {
    throttledUseEffect(favClips);
  }, [favClips]);
  
  useEffect(() => {
    if (!isTizenPlatform() || getTizenVersion() >= 5) {
      return;
    }
  
    setStaticPreview();
  }, []);

  return null;
}

export default PreviewServiceHook;

