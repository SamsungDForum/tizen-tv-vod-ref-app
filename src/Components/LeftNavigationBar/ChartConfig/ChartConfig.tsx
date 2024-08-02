/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from "react";
import { setChartTrackState, setControlBehaviour } from "./ChartConfigSlice";
import { FilterLogsSvgIcon } from "../../../helpers/SvgIcons";
import { useTypedSelector } from "../../../reduxStore/useTypedSelector";
import StyledButton from "../../ModalPicker/StyledButton";
import { dispatch } from "../../../reduxStore/store";

function ChartConfig() {
  const isChartTracking = useTypedSelector((state) => state.ChartConfig.isTracking);
  const isLeftBarOpen = useTypedSelector((state) => state.LeftNavBar.isOpen);

  return (
    <div className="nonExpandBorder">
      <StyledButton
        icon={<FilterLogsSvgIcon />}
        buttonName={`${isChartTracking ? "Deactivate" : "Activate"}`}
        label={isChartTracking ? "ON" : "OFF"}
        onClick={() => dispatch(setChartTrackState(!isChartTracking))}
        className="leftBarElement"
      />
      <div className={`logs-option-btns ${!isLeftBarOpen && "hidden"}`}>
        <StyledButton
          className={`button leftBarElement call-to-action-btn reset-logs-btn`}
          id={`reset-logs-btn`}
          onClick={() => dispatch(setControlBehaviour("Reset"))}
          buttonName={"Clear data"}
          label=""
        />
        <StyledButton
          className={`button leftBarElement call-to-action-btn save-btn`}
          id={`save-logs-messages`}
          onClick={() => dispatch(setControlBehaviour("Save"))}
          buttonName={`Save to USB`}
          label=""
        />
      </div>
    </div>
  );
}

export default ChartConfig;
