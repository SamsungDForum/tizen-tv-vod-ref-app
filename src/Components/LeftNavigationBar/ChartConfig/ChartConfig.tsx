/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, { useEffect, useState } from "react";
import { setChartTrackState, setControlBehaviour, setPlotterTimeFrame } from "./ChartConfigSlice";
import { FilterLogsSvgIcon, TimeIcon } from "../../../helpers/SvgIcons";
import { useTypedSelector } from "../../../reduxStore/useTypedSelector";
import StyledButton from "../../ModalPicker/StyledButton";
import ValuePicker from "../../ValuePicker/ValuePicker";
import styles from "../leftNavigationBar.module.scss";
import { dispatch } from "../../../reduxStore/store";
import ModalPicker from "../../ModalPicker";

function setThreshold(storageName: string, value: number) {
  localStorage.setItem(storageName, value.toString());
}

function ChartConfig() {
  const localmemoryThreshold = Number(localStorage.getItem("memoryThreshold") ?? 350);
  const localcpuThreshold = Number(localStorage.getItem("cpuThreshold") ?? 100);
  const isChartTracking = useTypedSelector((state) => state.ChartConfig.isTracking);
  const isLeftBarOpen = useTypedSelector((state) => state.LeftNavBar.isOpen);

  const [memoryThreshold, setmemoryThreshold] = useState(localmemoryThreshold);
  const [cpuThreshold, setcpuThreshold] = useState(localcpuThreshold);

  useEffect(() => setThreshold("memoryThreshold", memoryThreshold), [memoryThreshold]);
  useEffect(() => setThreshold("cpuThreshold", cpuThreshold), [cpuThreshold]);

  return (
    <div className="nonExpandBorder">
      <StyledButton
        icon={<FilterLogsSvgIcon />}
        buttonName={`${isChartTracking ? "STOP PLOTTER" : "START PLOTTER"}`}
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
        <ValuePicker
          name="Memory"
          value={memoryThreshold}
          jumpVal={10}
          maxVal={1000}
          setter={setmemoryThreshold}
          isLeftBarOpen={isLeftBarOpen}
          label="AUTOSAVE THRESHOLDS:"
          unit="MB"
        />
        <ValuePicker
          name="Cpu"
          value={cpuThreshold}
          jumpVal={5}
          maxVal={100}
          isLeftBarOpen={isLeftBarOpen}
          setter={setcpuThreshold}
          unit="%"
        />
        <p className={styles.optionTitle}>Time Frame:</p>
        <ModalPicker
          icon={<TimeIcon />}
          data={["1 minute", "5 minutes", "30 minutes"]}
          onSelectCallback={(data) => {
            const timeFrame = data.category.match(/\d+/g);
            dispatch(setPlotterTimeFrame(timeFrame));
          }}
          initialLabel={"1 minute"}
          navSectionName="menubar-view-switch"
          label="Time Frame"
        />
      </div>
    </div>
  );
}

export default ChartConfig;
