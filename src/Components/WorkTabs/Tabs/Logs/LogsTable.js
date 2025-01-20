/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, { useEffect, useRef } from "react";
import { ArrowKeyStepper, List, AutoSizer } from "react-virtualized";
import { nav } from "../../../../../libs/spatial-navigation";
import { useSelector } from "react-redux";

function LogsTable({ data, logs, logFilters, isAutoscroll }) {
  const listRef = useRef(null);
  const containerRef = useRef(null);
  const isVideoFullScreenOn = useSelector((state) => state.VideoFullScreen.value);

  function scrollToTheBottom() {
    if (isAutoscroll) {
      if (listRef.current) {
        const itemCount = data.length;
        listRef.current.scrollToRow(data.length);
      }
    }
  }

  useEffect(scrollToTheBottom, [logs, logFilters, isAutoscroll]);

  useEffect(() => {
    setTimeout(() => {
      if (isAutoscroll) {
        scrollToTheBottom();
      }
    });
  }, []);

  useEffect(() => {
    // it is used when the focused log item is removed from the screen due to scrolling
    const handleFocusout = (e) => {
      setTimeout(() => {
        // if focus out from the logs table and body is focused then move focus to left navigation bar or settings panel
        if (document.activeElement === document.body) {
          if (isVideoFullScreenOn) {
            nav.focus("settings-controls-panel");
          } else {
            nav.focus("left-navigation-bar");
          }
        }
      });
    };

    containerRef.current?.addEventListener("focusout", handleFocusout);
    return () => {
      containerRef.current?.removeEventListener("focusout", handleFocusout);
    };
  }, []);

  const calculatedItemHeight = ({ index }) => {
    const content = data[index].dataLine;

    const charPerLine = 200;
    const lineCount = Math.ceil(content.length / charPerLine);
    const minHeight = 35;

    const additionalHeight = lineCount * 30;
    return minHeight + additionalHeight;
  };

  function renderRow({ index, key, style, parent }) {
    return (
      <div
        style={style}
        key={key}
        id={`log-entry-${index}`}
        tabIndex="-1"
        className={`${index % 2 == 0 ? "log-even" : "log-odd"} log-${data[index].method} ${
          index == data.length - 1 ? "latest-log" : ""
        }`}
      >
        <p className="log-paragraph">{data[index].dataLine}</p>
      </div>
    );
  }

  return (
    <div ref={containerRef}>
      <AutoSizer>
        {({ width, height }) => (
          <ArrowKeyStepper mode="cells" rowCount={data.length} columnCount={1}>
            {({ onSectionRendered, scrollToRow }) => (
              <List
                width={width}
                height={900}
                rowHeight={calculatedItemHeight}
                rowRenderer={renderRow}
                rowCount={data.length}
                scrollToIndex={data.length}
                onSectionRendered={onSectionRendered}
                overscanRowCount={3}
                ref={listRef}
              />
            )}
          </ArrowKeyStepper>
        )}
      </AutoSizer>
    </div>
  );
}

export default LogsTable;
