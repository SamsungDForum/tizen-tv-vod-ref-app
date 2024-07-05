import React from "react";
import styles from "./styles/Overlay.module.scss";

type Props = {
  isActivated: boolean;
  color?: string;
};

function Overlay({ isActivated, color }: Props): JSX.Element {
  return <>{isActivated ? <div className={styles.overlay} style={{ backgroundColor: color }} /> : null}</>;
}

export default Overlay;
