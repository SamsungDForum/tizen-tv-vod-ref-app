import React from "react";
import styles from "./Panel.module.scss";

export default function Panel({ children }) {
  return (
    <div className={styles.optionSelectionPanel}>
      <div className={styles.optionSelectionPanelPickerContainer}>{children}</div>
    </div>
  );
}
