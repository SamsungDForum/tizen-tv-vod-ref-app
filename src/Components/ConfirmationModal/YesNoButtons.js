import React from "react";
import styles from "./YesNoButtons.module.scss";
import StyledButton from "../ModalPicker/StyledButton";
import { navKeys, DialogType } from "./navigation";

function YesNoButtons({ onYesCallback, onNoCallback, messageText }) {
  const id = "yesnobuttons";

  React.useEffect(() => {
    navKeys.initialize(id);
    navKeys.focusNo();  
    return () => {
      navKeys.destroy(id);
    };
  }, []);

  function onKeyEvent(evt) {
    navKeys.onKeyEvent(evt, [onYesCallback, onNoCallback], DialogType.YesNo);
  }

  const args = navKeys.getNavTag(id);

  return (
    <div className={`${styles.dialogButtonsPanel} ${styles.yesNoDialogButtonsPanel}`}>
      <h2>{messageText}</h2>
      <div className={`${styles.dialogButtonsBox}`}>
        <div className={`${styles.modalButton}`}>
         <StyledButton buttonName="YES" label="" className={styles.dialogButtonYes} onClick={onKeyEvent} {...args} />
        </div>
        <div className={`${styles.modalButton}`}>
         <StyledButton buttonName="NO" label="" className={styles.dialogButtonNo} onClick={onKeyEvent} {...args} />
        </div>
        
      </div>
    </div>
  );
}

export { YesNoButtons };
