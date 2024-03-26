import React from "react";
import { useSelector } from "react-redux";
import ButtonPanel from "../../../../PanelElements/ButtonPanel";

export default function SaveButton({ saveLogsCallback }) {
  return <ButtonPanel id="save-logs-messages" label={"Save logs to file"} clickCallback={saveLogsCallback} />;
}
