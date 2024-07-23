/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./contentRow.scss";
import { Keyboard } from "swiper/modules";
import Asset from "./Asset";
import { tabsEnum } from "../../../../NavigationTabSlice";
import { useTypedSelector } from "../../../../../../reduxStore/useTypedSelector";
import { KeyName, getKey } from "../../../../../KeyEvents";
import { dispatch } from "../../../../../../reduxStore/store";
import { setCurrentRowID } from "../../../../../ChannelZapping/ChannelZappingSlice";
import { Media } from "../../../../../usePlayerFactory/utils/playAssetCurrentTypes";

type Props = {
  child: {
    title: string;
    list: Array<Media>;
  };
  pxtransform: number;
  setPxtransform: (px: number) => void;
  contentRowID: number;
  key: React.Key;
};

const ContentRow = ({ child, pxtransform, setPxtransform, contentRowID }: Props) => {
  const curNavigationTab = useTypedSelector(state => state.navigationTab.value);

  const [currentSwiper, setCurrentSwiper] = useState(null);

  const onKeyVerticalScroll = (e) => {
    const key = getKey(e);
    const swiperCont = document.querySelector(".swiper-container");
    const rowsCount = swiperCont.childNodes.length;

    const swiperRowContainerHeight = 215 + 1; // swiperRowContainerHeight + 1 for prevent cropping border
    const lastRowOnBottom = window.tizen === undefined && curNavigationTab === tabsEnum.favoriteClips ? -648 : -432;

    if (rowsCount < 3) {
      setPxtransform(0);
      return;
    }
    if (key === KeyName.ARROW_DOWN && pxtransform > lastRowOnBottom) {
      setPxtransform(pxtransform + -swiperRowContainerHeight);
    } else if (key === KeyName.ARROW_UP && pxtransform < 0) {
      setPxtransform(pxtransform + swiperRowContainerHeight);
    }
  };

  useEffect(() => {
    let swiperCont = document.querySelector(".swiper-container");
    swiperCont.style.transform = `translateY(${pxtransform}px)`;
  }, [pxtransform]);

  const handleFocus = (ref) => {
    ref?.swiper?.keyboard?.enable();
    setCurrentSwiper(ref);
    if (ref !== null) {
      ref.addEventListener("sn:focused", function () {
        ref?.firstChild.querySelector(".swiper-slide-active").focus();
      });

      ref.addEventListener("sn:unfocused", function () {
        setTimeout(function () {
          if (!ref.querySelector(".asset-view-asset:focus")) {
            ref?.swiper?.keyboard?.disable();
          }
        });
      });
    }
  };

  useEffect(() => {
    let swipers = document.querySelectorAll(".mySwiper");
    swipers?.forEach((e) => {
      e.swiper.slideTo(0, false, false);
    });
  }, []);

  const handleEnterClick = (e) => {
    const key = getKey(e);

    if (key === KeyName.ENTER) {
      dispatch(setCurrentRowID(parseInt(e.target.closest(".swiper-row-container").id)));
    }
  };

  return (
    <div className="swiper-row-container" id={contentRowID} onKeyDown={(e) => handleEnterClick(e)}>
      <p className="swiper-row-title">{child.title}</p>
      <div
        className={"swiper-row"}
        onKeyDown={(e) => {
          onKeyVerticalScroll(e);
        }}
        onFocus={(e) => {
          handleFocus(e.target.closest(".mySwiper"));
        }}
      >
        <Swiper
          slidesPerView="auto"
          spaceBetween={30}
          centeredSlides={true}
          keyboard={{
            enabled: false,
          }}
          modules={[Keyboard]}
          className="mySwiper"
        >
          {child.list.map((key, index) => (
            <SwiperSlide key={index}>
              <Asset asset={key} id={index} currentSwiper={currentSwiper} setPxtransform={setPxtransform} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ContentRow;
