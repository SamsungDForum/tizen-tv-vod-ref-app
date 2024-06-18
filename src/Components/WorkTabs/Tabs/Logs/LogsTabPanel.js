/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dispatch } from "../../../../reduxStore/store";
import "./LogsWindow.scss";
import SaveButton from "./SaveButton/SaveButton";
import { navKeys } from "./../navigation";
import { saveLogs } from "./logger";
import { toggleFilters, toogleActiveFilters, starterLogFilters } from "./Options/LogOverlayScreenSlice";
import StyledButton from "../../../ModalPicker/StyledButton";
import { FilterLogsSvgIcon, AutoscrollSvgIcon } from "../../../../helpers/SvgIcons";
import { toggleAutoscroll } from "./Options/LogOverlayScreenSlice";
import { handleConfirmation } from "../../../ConfirmationModal/ConfirmationModal";

export default function LogsTabPanel() {
  React.useEffect(() => {
    navKeys.initialize((evt) => navKeys.onKeyEvent(evt));
    return () => {
      navKeys.destroy((evt) => navKeys.onKeyEvent(evt));
    };
  }, []);

  const stringArray = useSelector((state) => state.LogOverlayScreen.stringArray);
  const isAutoscroll = useSelector((state) => state.LogOverlayScreen.autoscroll);
  const isLeftBarOpen = useSelector((state) => state.LeftNavBar.isOpen);

  function isStringInArray(stringToCheck) {
    return stringArray.includes(stringToCheck);
  }

  function toggleAllFilters() {
    if (stringArray.length === 0) {
      dispatch(toggleFilters(starterLogFilters));
    } else {
      dispatch(toggleFilters([]));
    }
  }

  function isStringInArrayFilters(stringToToggle) {
    const index = stringArray.indexOf(stringToToggle);
    const newArray = [...stringArray];

    if (index !== -1) {
      newArray.splice(index, 1);
    } else {
      newArray.push(stringToToggle);
    }

    dispatch(toogleActiveFilters(newArray));
  }

  return (
    <div className="nonExpandBorder">
      <div className={`${isLeftBarOpen ? "" : "hidden"}`}>
        <StyledButton
          buttonName={"Toggle filters"}
          id={"filter-log-option-method-info"}
          label={""}
          onClick={() => {
            toggleAllFilters();
          }}
          className={"leftBarElement center-btn btn-flex-right call-to-action-btn"}
        />
      </div>

      {starterLogFilters.map((key, idx) => (
        <StyledButton
          icon={<FilterLogsSvgIcon />}
          key={idx}
          buttonName={`${key.toUpperCase()}`}
          id={`filter-log-option-method-${key}`}
          label={isStringInArray(`${key}`) ? "ON" : "OFF"}
          onClick={() => isStringInArrayFilters(`${key}`)}
          className="leftBarElement"
        />
      ))}

      <StyledButton
        icon={<AutoscrollSvgIcon />}
        buttonName={`Autoscroll`}
        id={`filter-log-option-method-log`}
        label={isAutoscroll ? "ON" : "OFF"}
        onClick={() => dispatch(toggleAutoscroll(!isAutoscroll))}
        className="leftBarElement"
      />

      <div className={`logs-option-btns ${isLeftBarOpen ? "" : "hidden"}`}>
        <StyledButton
          className={`button leftBarElement call-to-action-btn reset-logs-btn`}
          id={`reset-logs-btn`}
          onClick={() => {
            handleConfirmation("resetlogs");
          }}
          buttonName={"Reset Logs"}
          label=""
        ></StyledButton>

        <StyledButton
          className={`button leftBarElement call-to-action-btn save-btn`}
          id={`save-logs-messages`}
          onClick={() => saveLogs()}
          buttonName={`Save logs to file`}
          label=""
        ></StyledButton>
      </div>
    </div>
  );
}
