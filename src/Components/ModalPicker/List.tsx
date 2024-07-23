/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, { useState } from "react";
import StyledButton from "./StyledButton";
import styles from "./styles/List.module.scss";
import type {
  ModalPickerData,
  onSelectCallbackArgument,
  VideoState,
  LogOverState,
} from "./types";
import type { SpatialCfg } from "../../../libs/spatial-navigation/spatialCfgTypes";
import { nav, navConfig } from "../../../libs/spatial-navigation";
import { useSelector } from "react-redux";
import { reqTizenVersion } from "../../helpers/reqTizenVersion";

type Props = {
  key?: number;
  dataItem: ModalPickerData | string;
  setChosenCategory: React.Dispatch<React.SetStateAction<string>>;
  chosenCategory: string;
  onSelectHandler?: (
    newLabel: string,
    callbackArgument: onSelectCallbackArgument
  ) => void;
  onKeyUp?: React.KeyboardEventHandler;
  navSection?: { [key: string]: boolean };
};

function List({
  dataItem,
  onSelectHandler,
  setChosenCategory,
  chosenCategory,
  onKeyUp,
  navSection,
}: Props): JSX.Element {
  const [label] = useState(
    typeof dataItem === "string" ? dataItem : dataItem.category
  );
  const isVideoFullScreenOn = useSelector(
    (state: VideoState) => state.VideoFullScreen.value
  );
  const isShowPlayerLogs = useSelector(
    (state: LogOverState) => state.LogOverlayScreen.showPlayerLogs
  );
  const allowFloating = reqTizenVersion(5);

  function onClickHandler(
    category: string,
    option: string = "",
    callbackArgument: onSelectCallbackArgument
  ): void {
    if (onSelectHandler !== undefined) {
      onSelectHandler(`${category} ${option}`.trim(), callbackArgument);
    }
  }

  React.useEffect(() => {
    const navSection = "next-side-menu-panel";
    const cfg: SpatialCfg = { ...navConfig };
    cfg.selector = "#additionalbtn";
    cfg.defaultElement = "#additionalbtn";
    cfg.enterTo = "default-element";

    cfg.leaveFor = {
      right: "",
      up: "",
      down: "",
      left: "@side-menu-panel",
    };
    nav.remove(navSection);
    nav.add(navSection, cfg);
    return () => {
      nav.remove(navSection);
    };
  }, []);

  React.useEffect(() => {
    const navSection = "side-menu-panel";
    const cfg: SpatialCfg = { ...navConfig };
    cfg.selector = "#listElement";
    cfg.defaultElement = "#listElement";
    cfg.enterTo = "last-focused";

    if (typeof dataItem !== "string") {
      if (dataItem.options !== undefined) {
        cfg.leaveFor = {
          right: "@next-side-menu-panel",
          down: "",
          up: "",
          left: "",
        };
      } else {
        cfg.leaveFor = { right: "", down: "", up: "", left: "" };
      }
    }

    nav.remove(navSection);
    nav.add(navSection, cfg);
    return () => {
      nav.remove(navSection);
    };
  }, [chosenCategory]);

  function renderOptionButtons(dataItem) {
    return dataItem.options.map((option, index) => {
      return (
        <StyledButton
          id="additionalbtn"
          buttonName={option}
          label=""
          key={index}
          onClick={() => {
            onClickHandler(dataItem.category, option, {
              category: dataItem.category,
              option: option,
            });
          }}
          onKeyUp={onKeyUp}
          className={`button`}
          navSection={navSection}
        />
      );
    });
  }

  return (
    <section className={styles.list}>
      <StyledButton
        id="listElement"
        buttonName={label + `${typeof dataItem !== "string" ? " ▸" : ""}`}
        label={""}
        onMouseEnter={() => {
          setChosenCategory(label);
        }}
        onFocusCapture={() => {
          setChosenCategory(label);
        }}
        onKeyUp={onKeyUp}
        onClick={
          typeof dataItem === "string"
            ? () => {
                onClickHandler(label, "", { category: label, option: null });
              }
            : undefined
        }
        navSection={navSection}
      />
      {typeof dataItem === "string" ? undefined : (
        <div
          className={`${styles.additionalOptions} ${
            chosenCategory === dataItem.category ? "" : "hide"
          } ${
            !isVideoFullScreenOn
              ? styles.defaultList
              : isShowPlayerLogs && isVideoFullScreenOn
              ? styles.listOnVideoWithLogs
              : styles.listOnVideo
          } ${!allowFloating && !isVideoFullScreenOn && styles.supportNoFloat}`}
        >
          <h2 id="listTitle" className={styles.listTitle}>
            {dataItem.category}
          </h2>

          <div className={styles.listScrollBox}>
            {renderOptionButtons(dataItem)}
          </div>
        </div>
      )}
    </section>
  );
}

export default List;
