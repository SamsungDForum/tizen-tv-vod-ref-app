/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./importExportClips.scss";
import StyledButton from "../ModalPicker/StyledButton";
import { handleConfirmation } from "../ConfirmationModal/ConfirmationModal";

const ImportExportClips = () => {
  const customAllContent = useSelector((state) => state.CustomCommon.myCustomCommon);
  const favClips = useSelector((state) => state.FavouriteClips.myClips);
  const isLeftBarOpen = useSelector((state) => state.LeftNavBar.isOpen);

  return (
    <div className={`nonExpandBorder importExportButtons ${isLeftBarOpen ? "" : "hidden"}`}>
      <p className={"option-title"}>Selection:</p>

      <StyledButton
        buttonName={`Clear`}
        label=""
        id="fav-clips-clear"
        isDisabled={favClips.length > 0 ? false : true}
        className={"button leftBarElement ml-btn call-to-action-btn"}
        onClick={() => handleConfirmation("clear")}
      />

      <StyledButton
        buttonName={`Export to ${typeof tizen !== "undefined" ? "USB" : "file"}`}
        label=""
        id="fav-clips-export-to"
        isDisabled={favClips.length > 0 ? false : true}
        className={"button leftBarElement ml-btn call-to-action-btn"}
        onClick={() => handleConfirmation("export")}
      />

      {typeof tizen !== "undefined" ? (
        <StyledButton
          buttonName="Import from USB"
          label=""
          id="fav-clips-import"
          className={"button leftBarElement ml-btn call-to-action-btn"}
          onClick={() => handleConfirmation("import")}
        />
      ) : null}

      <p className={"option-title"}>Clips:</p>

      <StyledButton
        buttonName={`Replace All`}
        label=""
        id="fav-clips-replace"
        isDisabled={favClips.length > 0 ? false : true}
        className={"button leftBarElement ml-btn call-to-action-btn"}
        onClick={() => handleConfirmation("swap")}
      />

      <StyledButton
        buttonName={`Back to initial`}
        label=""
        id="fav-clips-initial"
        className={"button leftBarElement ml-btn call-to-action-btn"}
        isDisabled={customAllContent.length !== 0 ? false : true}
        onClick={() => {
          handleConfirmation("initial");
        }}
      />
    </div>
  );
};

export default ImportExportClips;
