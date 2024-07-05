/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, { useEffect, useState } from "react";
import { PlaySvgIcon, PauseSvgIcon } from "../../../helpers/SvgIcons";

type Props = {
  onClick: () => void;
};
function PlayPauseButton({ onClick }: Props) {
  const [playIcon, setPlayIcon] = useState(true);

  function onButtonClick() {
    onClick();
  }

  useEffect(() => {
    let video = document.getElementById("elVideo");

    video?.addEventListener("play", () => {
      setPlayIcon(false);
    });
    video?.addEventListener("pause", () => {
      setPlayIcon(true);
    });

    return () => {
      video?.removeEventListener("play", () => {
        setPlayIcon(false);
      });
      video?.removeEventListener("pause", () => {
        setPlayIcon(true);
      });
    };
  }, []);

  return (
    <button
      className={`${
        playIcon ? "video-player-play-control" : "video-player-pause-control"
      } video-player-button video-player-play-pause-button`}
      onClick={() => onButtonClick()}
      tabIndex={-1}
    >
      {playIcon ? <PlaySvgIcon /> : <PauseSvgIcon />}
    </button>
  );
}

export default PlayPauseButton;
