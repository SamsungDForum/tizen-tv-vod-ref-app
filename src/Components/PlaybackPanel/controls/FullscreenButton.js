import React from "react";
import { MinimizeSvgIcon } from "../../../helpers/SvgIcons";
function FullscreenButton(props) {
  function onButtonClick(evt) {
    props.onClick(evt);
  }

  return (
    <button
      className={"video-player-fullscreen-control video-player-button"}
      onClick={(evt) => onButtonClick(evt)}
      tabIndex={-1}
    >
      <MinimizeSvgIcon />
    </button>
  );
}

export default FullscreenButton;
