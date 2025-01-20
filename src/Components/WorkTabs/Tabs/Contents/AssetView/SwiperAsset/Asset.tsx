/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, { useEffect, useState, useRef, useCallback } from "react";
import { FavouriteSvgIcon } from "../../../../../../helpers/SvgIcons";
import { dispatch } from "../../../../../../reduxStore/store";
import { setMedia } from "../../../../../usePlayerFactory/utils/playAsset";
import { setFavouriteClips, removeFavouriteClip } from "../FavouriteClipsSlice";
import { getKey, KeyName } from "../../../../../KeyEvents";
import { setting, settingDefault } from "../../../../../usePlayerFactory/utils/setting-slice";
import { keySystem } from "../../../../../usePlayerFactory/utils/setting";
import { setVideoFullScreenOn } from "../../../../../PlaybackPanel/VideoFullScreenSlice";
import "./asset.scss";
import { tabsEnum } from "../../../../NavigationTabSlice";
import { useTypedSelector } from "../../../../../../reduxStore/useTypedSelector";
import type { SwiperRef } from "swiper/react";
import type { Media } from "../../../../../usePlayerFactory/utils/playAssetCurrentTypes";

type SwiperElement = SwiperRef & Element;

interface Props {
  asset: Media;
  id: number;
  setPxtransform: (px: number) => void;
}

const Asset = ({ asset, id, setPxtransform }: Props) => {
  const favClips = useTypedSelector((state) => state.FavouriteClips.myClips);
  const currClip = useTypedSelector((state) => state.playAsset.value.media?.id);
  const curNavigationTab = useTypedSelector((state) => state.navigationTab.value);
  const isQuickEdit = useTypedSelector((state) => state.FavouriteClips.quickEdit);

  const selectCb = useCallback(
    (evt) => {
      let key = getKey(evt);
      if (!isQuickEdit) {
        if (key === KeyName.ENTER || key === KeyName.PLAYPAUSE) {
          !asset.requiresAuth && keySystem(settingDefault[setting.keySystem]);
          setMedia(asset);
          dispatch(setVideoFullScreenOn(true));
          console.log("AssetView", asset.name, "dispatched:", asset);
        }
      } else {
        handleFavourite(evt);
      }
    },
    [asset, isQuickEdit, favClips]
  );

  const [isFavTab, setIsFavTab] = useState(false);

  useEffect(() => {
    const swipers = document.querySelectorAll<SwiperElement>(".mySwiper");
    swipers.forEach((swiper) => {
      swiper.swiper.slideTo(0, undefined, false);
    });
    setIsFavTab(curNavigationTab === tabsEnum.favoriteClips ? true : false);
    setPxtransform(0);
  }, [curNavigationTab]);

  const isFavoriteSingleBtn = (event) => {
    const key = getKey(event);
    return event?.key?.toLowerCase() === "f" || key === KeyName.RED;
  };

  const handleFavourite = (event) => {
    const currentSwiper = event.target.closest(".mySwiper");
    const currentChildNodes = currentSwiper?.firstChild?.childNodes;
    const currentChildID = parseInt(event.target.id);
    const swipers = document.querySelectorAll(".mySwiper");

    const key = getKey(event);

    if (key === KeyName.ENTER || isFavoriteSingleBtn(event)) {
      const existingClip = favClips.find((obj) => obj.id === asset.id);
      if (!existingClip) {
        dispatch(setFavouriteClips(asset));
      } else {
        dispatch(removeFavouriteClip(asset));
        setTimeout(() => {
          let swiperCount = document.querySelector(".swiper-container")?.childNodes?.length || 0;

          if (isFavTab) {
            const prevChildUndefined = currentChildNodes[currentChildID - 1] === undefined;
            const nextChildUndefined = currentChildNodes[currentChildID + 1] === undefined;

            if (prevChildUndefined && nextChildUndefined) {
              setPxtransform(0);
              swipers[0].querySelector<HTMLDivElement>(".swiper-slide-active .poster-image")?.focus();
            }

            if (prevChildUndefined && !nextChildUndefined) {
              currentSwiper.querySelector(".swiper-slide-active .poster-image").focus();
            }

            if (!prevChildUndefined && nextChildUndefined) {
              const prevChild = currentSwiper?.firstChild?.childNodes[currentChildID - 1];
              prevChild?.querySelector(".poster-image")?.focus();
              currentSwiper?.swiper?.slideTo(currentChildID - 1, false, false);
            }
          }

          if (swiperCount < 3) {
            setPxtransform(0);
          }
        });
      }
    }
  };

  const [isPressed, setIsPressed] = useState(false);
  const isHeldRef = useRef(false);
  const holdTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleKeyDown = (event) => {
    if (!isPressed && event.key.toLowerCase() !== "f") {
      setIsPressed(true);
      holdTimeoutRef.current = setTimeout(() => {
        handleFavourite(event);
        isHeldRef.current = true;
      }, 250);
    }
  };

  const handleKeyUp = (event) => {
    if (isQuickEdit || isFavoriteSingleBtn(event)) {
      handleFavourite(event);
    } else {
      if (isPressed) {
        if (holdTimeoutRef.current) {
          clearTimeout(holdTimeoutRef.current);
        }
        if (!isHeldRef.current) {
          selectCb(event);
        }
        setIsPressed(false);
        isHeldRef.current = false;
      }
    }
  };

  useEffect(() => {
    return () => {
      if (holdTimeoutRef.current) {
        clearTimeout(holdTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      id={`${id}`}
      className={`poster-image asset-view-asset ${asset.id === currClip ? "asset-view-asset-clicked" : " "} ${
        isQuickEdit ? "darkerBg" : ""
      }`}
      style={asset.poster && { backgroundImage: `url(${asset.poster})` } || undefined}
      tabIndex={-1}
      onClick={selectCb}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    >
      <p className="video-asset-id">ID: {asset.id}</p>
      <p className="video-asset-name">{asset.name}</p>

      {favClips.length !== 0 &&
        favClips.map(function (item) {
          if (item.id === asset.id) {
            return (
              <div key={item.id} className="favourite-tag">
                <FavouriteSvgIcon />
              </div>
            );
          }
        })}
    </div>
  );
};

export default Asset;
