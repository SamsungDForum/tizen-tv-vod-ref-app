import React, { useState, useEffect, useRef, SVGProps } from "react";
import { KeyName, getKey } from "../KeyEvents";
import StyledButton from "./StyledButton";
import Menu from "./Menu";
import Overlay from "./Overlay";
import styles from "./styles/ModalPicker.module.scss";
import type { ModalPickerData, onSelectCallbackArgument } from "./types";
import { nav } from "../../../libs/spatial-navigation";
import {
  isExpectedData,
  isUniqueOptionAvailable,
  restrictNavigation,
  freeNavigation,
} from "./utilities";
import { dispatch } from "../../reduxStore/store";
import { setVideoFullScreenOn } from "../PlaybackPanel/VideoFullScreenSlice";
import { tabs } from "../WorkTabs/NavigationTabSlice";
import { useSelector } from "react-redux";

type Props = {
  parentLabel?: string;
  icon?: SVGProps<SVGSVGElement>;
  data: Array<ModalPickerData | string>;
  className?: string;
  initialLabel: string;
  label?: string;
  navSectionName?: string;
  onSelectCallback?: (arg: onSelectCallbackArgument) => void;
  onExpandCallback?: () => void;
  onCollapseCallback?: () => void;
};

type BarState = {
  LeftNavBar: {
    isOpen: boolean;
  };
};
type OverlayState = {
  OverlayVisible: {
    value: boolean;
  };
};
type FullscreenState = {
  VideoFullScreen: {
    value: boolean;
  };
};
function ModalPicker({
  icon,
  data,
  initialLabel,
  label,
  className,
  navSectionName,
  onSelectCallback,
  onExpandCallback,
  onCollapseCallback,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mainLabel, setMainLabel] = useState(initialLabel);
  const mainButtonRef = useRef<HTMLButtonElement>(null);
  const [navSection] = useState(
    navSectionName !== undefined
      ? { [`data-modal-picker-${navSectionName}`]: true }
      : undefined
  );
  const isLeftBarOpen = useSelector(
    (state: BarState) => state.LeftNavBar.isOpen
  );
  const isOverlayVisible = useSelector(
    (state: OverlayState) => state.OverlayVisible.value
  );
  const isVideoFullScreenOn = useSelector(
    (state: FullscreenState) => state.VideoFullScreen.value
  );

  useEffect(() => {
    setMainLabel(initialLabel);
  }, [initialLabel]);

  useEffect(() => {
    if (!isExpectedData(data)) {
      return;
    }

    if (isExpanded) {
      if (navSectionName !== undefined) {
        nav.focus("side-menu-panel");
        restrictNavigation(navSectionName);
      }
    } else {
      if (navSectionName !== undefined) {
        freeNavigation(navSectionName);
      }
    }
  }, [isExpanded]);

  const handleBackspace: React.KeyboardEventHandler = (event) => {
    if (!isExpanded) {
      return;
    }

    if (getKey(event) === KeyName.BACK) {
      event.preventDefault();
      event.stopPropagation();
      mainButtonRef?.current?.focus();
      setIsExpanded(false);
    }
  };

  function onSelectHandler(
    newLabel: string,
    callbackArgument: onSelectCallbackArgument
  ): void {
    switchIsExpanded();

    if (tabs.some((element) => element === newLabel)) {
      dispatch(setVideoFullScreenOn(false));
    }
    if (mainLabel == newLabel) {
      return;
    }

    setMainLabel(newLabel);
    if (onSelectCallback && callbackArgument) {
      onSelectCallback(callbackArgument);
    }
  }

  useEffect(() => {
    if (!isOverlayVisible && isVideoFullScreenOn) {
      setIsExpanded(false);
    }
  }, [isOverlayVisible]);

  function switchIsExpanded() {
    setIsExpanded(false);

    if (!isUniqueOptionAvailable(data, mainLabel)) {
      return;
    }

    if (onExpandCallback && !isExpanded) {
      onExpandCallback();
    }
    if (onCollapseCallback && isExpanded) {
      onCollapseCallback();
    }

    mainButtonRef?.current?.focus();
    setIsExpanded(!isExpanded);
  }

  useEffect(() => {
    if (isLeftBarOpen === false) {
      setIsExpanded(false);
    }
  }, [isLeftBarOpen]);

  return (
    <>
      <Overlay isActivated={isExpanded} color="transparent" />
      <section
        className={`${isExpanded ? styles.expandedBackground : ""} ${
          styles.modalPicker
        }`}
        id={navSectionName ? `${navSectionName}-picker` : undefined}
      >
        <div className={styles.modalPickerHead}>
          <StyledButton
            icon={icon}
            buttonName={label}
            id={navSectionName ? `${navSectionName}-refocus` : undefined}
            label={mainLabel}
            reference={mainButtonRef}
            onClick={switchIsExpanded}
            onKeyUp={handleBackspace}
            navSection={navSection}
            className={className}
          />
        </div>
        {isExpanded ? (
          <Menu
            parentLabel={label}
            data={data}
            onSelectHandler={onSelectHandler}
            onKeyUp={handleBackspace}
            navSection={navSection}
          />
        ) : null}
      </section>
    </>
  );
}

export default ModalPicker;
