import React, { useState } from "react";
import List from "./List";
import styles from "./styles/Menu.module.scss";
import isExpectedData from "./utilities/isExpectedData";
import { useSelector } from "react-redux";
import type {
  ModalPickerData,
  onSelectCallbackArgument,
  VideoState,
  LogOverState,
} from "./types";
import { reqTizenVersion } from "../../helpers/reqTizenVersion";

type Props = {
  parentLabel?: string;
  data: Array<ModalPickerData | string>;
  onSelectHandler?: (
    newLabel: string,
    callbackArgument: onSelectCallbackArgument
  ) => void;
  onKeyUp?: React.KeyboardEventHandler;
  navSection?: { [key: string]: boolean };
};

function Menu({
  parentLabel,
  data,
  onSelectHandler,
  onKeyUp,
  navSection,
}: Props): JSX.Element | null {
  const [chosenCategory, setChosenCategory] = useState("");
  const isVideoFullScreenOn = useSelector(
    (state: VideoState) => state.VideoFullScreen.value
  );
  const isShowPlayerLogs = useSelector(
    (state: LogOverState) => state.LogOverlayScreen.showPlayerLogs
  );
  const allowFloating = reqTizenVersion(5);

  if (!isExpectedData(data)) {
    return null;
  }

  return (
    <div
      className={`${styles.menu} ${
        !isVideoFullScreenOn
          ? styles.defaultMenu
          : isShowPlayerLogs && isVideoFullScreenOn
          ? styles.menuOnVideoWithLogs
          : styles.menuOnVideo
      } ${!allowFloating && !isVideoFullScreenOn && styles.supportNoFloat}`}
    >
      <h2 id="menuTitle" className={styles.menuTitle}>
        {parentLabel}
      </h2>
      <div className={styles.menuScrollBox}>
        {data.map((dataItem, index) => {
          return (
            <List
              key={index}
              dataItem={dataItem}
              onSelectHandler={onSelectHandler}
              chosenCategory={chosenCategory}
              setChosenCategory={setChosenCategory}
              onKeyUp={onKeyUp}
              navSection={navSection}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Menu;
