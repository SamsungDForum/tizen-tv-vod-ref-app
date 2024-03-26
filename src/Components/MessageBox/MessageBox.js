import React from "react";
import styles from "./MessageBox.module.scss";

function MessageBox({ messageText, boxCustomClassName, messageCustomClassName }) {
  return (
    <div className={boxCustomClassName ? boxCustomClassName : `${styles.messageBox}`}>
      <div className={messageCustomClassName ? messageCustomClassName : `${styles.messageBoxMessage}`}>
        {messageText}
      </div>
    </div>
  );
}

export { MessageBox };
