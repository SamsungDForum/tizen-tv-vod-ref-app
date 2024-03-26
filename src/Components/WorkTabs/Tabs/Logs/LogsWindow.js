import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./LogsWindow.scss";
import "scroll-behavior-polyfill";
import { nav, navConfig } from "../../../../../libs/spatial-navigation";
import { domRef } from "../../../DOMhelper";
import { eventConsoleCapture, consoleLogs } from "./log-source";
import { WarningSvgIcon } from "../../../../helpers/SvgIcons";
import { tabsEnum } from "../../NavigationTabSlice";
import LogsTable from "./LogsTable";

export default function LogsWindow({ logsContainerClass, styles }) {
  // TODO:
  // Change local log storage approach. Instead of having local copy of all collected logs, keep only
  // a subset currently limited to those visible on screen.
  const isVideoFullScreenOn = useSelector((state) => state.VideoFullScreen.value);
  const isAutoscroll = useSelector((state) => state.LogOverlayScreen.autoscroll);
  const [logs, setLogs] = useState([]);
  const [ev] = eventConsoleCapture();
  const logFilters = useSelector((state) => state.LogOverlayScreen.stringArray);
  const capturedLogs = consoleLogs();

  useEffect(() => {
    const updatedCount = capturedLogs.length - logs.length;
    if (updatedCount > 0) {
      const updatedLogs = logs.concat(capturedLogs.slice(-updatedCount));
      setLogs(updatedLogs);
    }
  }, [ev]);

  const filteredLogs = logs.slice(-logs.length).filter((log) => logFilters.includes(log.method));

  useEffect(() => {
    if (capturedLogs.length > 0) {
      setLogs([]);
    }
  }, [capturedLogs]);

  useEffect(() => {
    const navSectionMessages = "logs-messages-navigation-section";
    let cfg = { ...navConfig };
    cfg.selector = "div.log-even, div.log-odd, div.latest-log";
    cfg.defaultElement = "div.latest-log";
    cfg.enterTo = "last-focused";
    cfg.leaveFor = {
      left: "@left-navigation-bar",
      down: "@playback-controls-nav-panel",
      up: "@logs-messages-navigation-section",
      right: "@playback-controls-nav-panel",
    };
    nav.remove(navSectionMessages);
    nav.add(navSectionMessages, cfg);

    return () => {
      nav.remove(navSectionMessages);
    };
  }, [isVideoFullScreenOn]);

  return (
    <div tabIndex="0" className={logsContainerClass} style={{ display: `${styles}` }}>
      {filteredLogs.length === 0 ? (
        <div className="no-logs-area">
          <div className="not-found-image">
            <WarningSvgIcon />
          </div>
          <h2>No logs to show!</h2>
          <p>Try to add few filters</p>
        </div>
      ) : (
        <LogsTable data={filteredLogs} logs={logs} logFilters={logFilters} isAutoscroll={isAutoscroll} />
      )}
    </div>
  );
}
