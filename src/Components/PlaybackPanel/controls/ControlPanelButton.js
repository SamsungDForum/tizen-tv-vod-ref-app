import React from "react";
function ControlPanelButton(props) {
  function onButtonClick(evt) {
    props.onClick();
  }

  return (
    <button id={props.id} className={props.className} onClick={(evt) => onButtonClick(evt)} tabIndex={-1}>
      {props.icon}
    </button>
  );
}

export default ControlPanelButton;
