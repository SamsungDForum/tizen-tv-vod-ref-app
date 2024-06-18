/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from "react";
import * as d3 from "d3";

const Arc = ({ data, index, createArc, colors, format, stroke }) => (
  <g key={index} className="arc">
    <path className="arc" d={createArc(data)} fill={index} stroke={stroke} strokeWidth="1" />
  </g>
);

const Pie = (props) => {
  const createPie = d3
    .pie()
    .value((d) => d.value)
    .sort(null);

  const createArc = d3.arc().innerRadius(props.innerRadius).outerRadius(props.outerRadius).padAngle(0.009);

  const colors = d3.scaleOrdinal(d3.schemeSet3);
  const format = d3.format(".2f");
  const data = createPie(props.data);

  return (
    <svg width={props.width} height={props.height}>
      <g transform={`translate(${props.outerRadius + 5} ${props.outerRadius + 5})`}>
        {data.map((d, i) => (
          <Arc
            key={i}
            index={d.data.color}
            data={d}
            createArc={createArc}
            colors={colors}
            format={format}
            stroke={d.data.stroke}
          />
        ))}
      </g>
    </svg>
  );
};

export default Pie;
