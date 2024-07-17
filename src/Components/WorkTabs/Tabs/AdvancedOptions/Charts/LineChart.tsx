/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, { useEffect, useMemo, useRef } from "react";
import { type ScaleLinear } from "d3";
import * as d3 from "d3";

type Props = {
  chartData: number[];
  width: number;
  height: number;
  yScaleSize: {
    yLow: number;
    yHigh: number;
  };
};
type ScaleType = ScaleLinear<number, number, never>;

function LineChart({ chartData, width, height, yScaleSize }: Props) {
  const { yLow, yHigh } = yScaleSize;
  const svgRef = useRef(null);
  const svgObj = useRef<any>(null);

  // Create scales
  const getScales: [ScaleType, ScaleType] = useMemo(() => {
    const xScale = d3.scaleLinear().domain([-60, 0]).range([0, width]);
    const yScale = d3.scaleLinear().domain([yLow, yHigh]).range([height, 0]);
    return [xScale, yScale];
  }, [width, height, yLow, yHigh]);

  // Initialize graph
  useEffect(() => {
    // Create graph sheet
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("overflow", "visible")
      .style("background", "transparent");
    svgObj.current = svg;
  }, []);
  useEffect(() => {
    const [xScale, yScale] = getScales;

    // Set the axes
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(30)
      .tickFormat((d) => `${d}s`);
    const yAxis = d3.axisLeft(yScale).ticks(8).tickSizeInner(-width).tickSizeOuter(0);

    svgObj.current.selectAll("g").remove();
    svgObj.current.append("g").call(xAxis).attr("transform", `translate(0,${height})`);
    svgObj.current.call((g) =>
      g.selectAll(".tick").selectChildren("text").attr("transform", "translate(-16, 1)").style("rotate", "-45deg")
    );

    svgObj.current
      .append("g")
      .call(yAxis)
      .call((g) => g.selectAll(".tick line").attr("class", "axis_y_tick").attr("stroke", "#6e6e6e"));
    svgObj.current.selectAll("g").style("color", "#b3b3b3").style("font-size", "9px").style("font-weight", "200");
  }, [yHigh, yLow]);

  // Update graph
  useEffect(() => {
    const [xScale, yScale] = getScales;

    // Setup functions to draw Lines
    const generateScaledLine = d3
      .line()
      .x((_, i) => xScale(i * -2))
      // @ts-expect-error
      .y(yScale);

    // Remove previous graph line
    svgObj.current.selectAll("path").remove();

    // Draw line
    svgObj.current
      .append("path")
      .data([chartData])
      .attr("d", (data: [number, number][]) => generateScaledLine(data))
      .attr("fill", "none")
      .attr("stroke", "rgba(255, 99, 132, 1)")
      .attr("stroke-width", 2);
  }, [chartData]);

  return <svg ref={svgRef} />;
}

export default LineChart;
