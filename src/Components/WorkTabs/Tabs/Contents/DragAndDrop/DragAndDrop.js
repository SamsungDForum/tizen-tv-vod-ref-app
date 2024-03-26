import React from "react";
import styles from "./DragAndDrop.module.scss";
import { UploadSvgIcon } from "../../../../../helpers/SvgIcons";
import { firstUniqueID } from "../../../../FavouriteClips/firstUniqueID";
import { useSelector } from "react-redux";

export default function DragAndDrop({ onSuccessHandler, onErrorHandler }) {
  const isLeftBarOpen = useSelector((state) => state.LeftNavBar.isOpen);
  function preventDefault(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  function onDropHandler(event) {
    preventDefault(event);

    const reader = new FileReader();
    reader.readAsText(event.dataTransfer.files[0]);

    reader.onload = () => {
      onSuccessHandler(JSON.stringify(firstUniqueID(reader.result)));
    };

    reader.onerror = (err) => {
      onErrorHandler(err);
    };
  }

  return (
    <div className={`${styles.dropZoneContainer} ${isLeftBarOpen ? styles.centerWhenOpenBar : styles.centered}`}>
      <div
        className={styles.dropZone}
        onDragOver={preventDefault}
        onDragEnter={preventDefault}
        onDragLeave={preventDefault}
        onDrop={(event) => {
          onDropHandler(event);
          preventDefault(event);
        }}
      >
        <div className={styles.uploadIcon}>
          <UploadSvgIcon />
        </div>

        <span>Drop Video Content to upload</span>
        <span className={styles.spanWarning}>(It will overwrite your favorite clips)</span>

        <input id="actual-btn" type="file" name="myFile" className={styles.dropInput} />
      </div>
    </div>
  );
}
