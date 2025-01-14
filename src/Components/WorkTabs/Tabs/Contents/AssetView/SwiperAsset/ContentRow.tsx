/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, { useEffect, KeyboardEvent, useRef } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Keyboard } from "swiper/modules";
import Asset from "./Asset";
import { tabsEnum } from "../../../../NavigationTabSlice";
import { useTypedSelector } from "../../../../../../reduxStore/useTypedSelector";
import { KeyName, getKey } from "../../../../../KeyEvents";
import { dispatch } from "../../../../../../reduxStore/store";
import { setCurrentRowID } from "../../../../../ChannelZapping/ChannelZappingSlice";
import { Media } from "../../../../../usePlayerFactory/utils/playAssetCurrentTypes";
import "swiper/css";
import "./contentRow.scss";
import { networkStatus } from "../../../../../../helpers/networkStatus";

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
  const swiperRef = useRef<SwiperRef>(null);
  const isNetworkConnected = networkStatus();

  const curNavigationTab = useTypedSelector((state) => state.navigationTab.value);

  const onKeyVerticalScroll = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!isNetworkConnected) return null;
    const key = getKey(e);
    const swiperContainer = document.querySelector<HTMLDivElement>(".swiper-container");
    let rowsCount: number;
    if (swiperContainer != null) {
      rowsCount = swiperContainer.childNodes.length;
    } else {
      rowsCount = 0;
      console.warn(`querySelector('.swiper-container') returned null`);
    }

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
    let swiperContainer = document.querySelector<HTMLDivElement>(".swiper-container");
    if (swiperContainer != null) {
      swiperContainer.style.transform = `translateY(${pxtransform}px)`;
    } else {
      console.warn(`querySelector('.swiper-container') returned null`);
    }
  }, [pxtransform]);

  const handleFocus = (ref) => {
    ref?.swiper?.keyboard?.enable();
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
      const element = e as unknown as { swiper: SwiperCore };
      element.swiper.slideTo(0, undefined, false);
    });
  }, []);

  const handleEnterClick = (e) => {
    const key = getKey(e);

    if (key === KeyName.ENTER) {
      dispatch(setCurrentRowID(parseInt(e.target.closest(".swiper-row-container").id)));
    }
  };
  useEffect(() => {
    if (!isNetworkConnected) swiperRef.current?.swiper.disable();
    else swiperRef.current?.swiper.enable();
  }, [isNetworkConnected]);

  return (
    <div className="swiper-row-container" id={`${contentRowID}`} onKeyDown={(e) => handleEnterClick(e)}>
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
          ref={swiperRef}
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
              <Asset asset={key} id={index} setPxtransform={setPxtransform} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ContentRow;
