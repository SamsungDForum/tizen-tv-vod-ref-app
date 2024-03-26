import React, { useEffect, useRef } from "react";
import { ArrowKeyStepper, List, AutoSizer } from "react-virtualized";

function LogsTable({ data, logs, logFilters, isAutoscroll }) {
  const listRef = useRef(null);

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
    <AutoSizer>
      {({ width, height }) => (
        <ArrowKeyStepper mode="cells" rowCount={data.length} columnCount={1}>
          {({ onSectionRendered, scrollToRow }) => (
            <List
              width={width}
              height={972}
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
  );
}

export default LogsTable;
