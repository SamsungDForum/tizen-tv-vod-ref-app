/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import "./ProgressControl.scss";

import React, { useEffect, useState } from "react";

export function RemainingTimeDisplay({ video }: { video: HTMLVideoElement }) {
  const [timeLeft, setTimeLeft] = useState(convertToMinutes(video.duration - video.currentTime));

  useEffect(() => {
    const updateTimeLeft = () => {
      const currentTimeLeft = video.duration - video.currentTime;
      setTimeLeft(convertToMinutes(currentTimeLeft));
    };

    video.addEventListener("timeupdate", updateTimeLeft);

    return () => {
      video.removeEventListener("timeupdate", updateTimeLeft);
    };
  }, [video]);

  return <p className="timeLeft">{timeLeft}</p>;
}

function convertToMinutes(timeInSeconds: number) {
  if (isNaN(timeInSeconds)) return null;
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  const formattedSeconds = (seconds < 10 ? "0" : "") + seconds;

  return `${minutes}:${formattedSeconds}`;
}
