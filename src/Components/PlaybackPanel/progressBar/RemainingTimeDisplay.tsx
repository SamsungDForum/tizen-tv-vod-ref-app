/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import "./ProgressControl.scss";

import React, { useMemo } from "react";

export function RemainingTimeDisplay({ video }: { video: HTMLVideoElement }) {
  const showTimeLeft = useMemo(() => {
    const timeLeft = video.duration - video.currentTime;
    return convertToMinutes(timeLeft);
  }, [video.duration, video.currentTime]);

  if (isNaN(video.duration) || isNaN(video.currentTime)) return null;
  return <p className="timeLeft video-player-remaining-time-display">{showTimeLeft}</p>;
}

// Helper function
function convertToMinutes(timeInSeconds: number) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  const formattedSeconds = (seconds < 10 ? "0" : "") + seconds;

  return `${minutes}:${formattedSeconds}`;
}
