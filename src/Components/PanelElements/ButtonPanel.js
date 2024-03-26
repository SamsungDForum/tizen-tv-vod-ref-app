import React from "react";
import Panel from "./Panel";
import StyledButton from "../ModalPicker/StyledButton";

export default function ButtonPanel({ id, optionLabel, clickCallback, label, className }) {
  return (
    <Panel>
      <StyledButton
        className={`button call-to-action-btn ${className}`}
        id={id}
        onClick={clickCallback}
        buttonName={label}
        label=""
      ></StyledButton>
    </Panel>
  );
}
