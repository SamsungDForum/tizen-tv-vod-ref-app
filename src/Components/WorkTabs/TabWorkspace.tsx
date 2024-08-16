/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from "react";
import styles from "./TabWorkspace.module.scss";
import LeftNavigationBar from "../LeftNavigationBar/LeftNavigationBar";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { useTypedSelector } from "../../reduxStore/useTypedSelector";
import RenderContent from "./RenderContent";

export type PlayerInfo = {
  id: number;
  trackId: number;
  label: string;
  type: string;
  version: string;
  args: {
    src: string;
  };
};
type Props = {
  currentPlayer: PlayerInfo;
};
export default function TabWorkspace({ currentPlayer }: Props) {
  const isVideoFullScreenOn = useTypedSelector((state) => state.VideoFullScreen.value);

  return (
    <div className={isVideoFullScreenOn ? "hide" : `${styles.tabWorkspace} ${styles.tabWorkspaceMin}`}>
      <LeftNavigationBar />
      <RenderContent currentPlayer={currentPlayer} />
      <ConfirmationModal />
    </div>
  );
}
