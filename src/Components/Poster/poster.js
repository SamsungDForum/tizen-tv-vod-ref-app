/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from "react";
import styles from "./poster.module.scss";

// Up for grabs: Convert to JSDoc for tooltip help.
//
// <Poster [url='image path']> [overlay] </Poster>
// [url] - optional. Image url.
// [overlay] - optional. Overlay to display on top of poster's image
export function Poster(props) {
  const { className, url, style, ...unconsumedProps } = props;

  return (
    <div
      {...unconsumedProps}
      className={`${className} ${styles.posterImage}`}
      style={url ? { ...style, backgroundImage: `url(${url})` } : { ...style }}
    />
  );
}
