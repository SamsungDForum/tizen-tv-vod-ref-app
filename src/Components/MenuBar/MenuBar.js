/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setNavigationTab, tabs, tabsEnum } from "../WorkTabs/NavigationTabSlice";
import { dispatch } from "../../reduxStore/store";
import { navKeys } from "./navigation";
import { eventConsoleCapture } from "./../WorkTabs/Tabs/Logs/log-source";
import { nav, navConfig } from "../../../libs/spatial-navigation";
import { handleConfirmation } from "../ConfirmationModal/ConfirmationModal";
import toast from "react-hot-toast";

export default function MenuBar() {
  const navCb = useCallback((cbData) => {
    const val = cbData;
    dispatch(setNavigationTab(val));
  }, []);
  const [evLog] = eventConsoleCapture();
  const isVideoFullScreenOn = useSelector((state) => state.VideoFullScreen.value);

  React.useEffect(() => {
    navKeys.initialize(onKeyEvent);
    return () => {
      navKeys.destroy(onKeyEvent);
    };
  }, [isVideoFullScreenOn]);

  function notifyErrors(text) {
    if (text.substring(0, 5) === "ERROR") {
      const cutText = text.substring(21, 81);

      if (text.length > 100) {
        toast.error(`${cutText}...\n More info in logs ----->`, {
          duration: 5000,
          style: {
            maxWidth: "fit-content",
          },
        });
      } else {
        toast.error(cutText, {
          style: {
            maxWidth: "fit-content",
          },
        });
      }
    }
  }

  React.useEffect(() => {
    // TODO:
    // Expand consol log subscription for message class, i.e: log/warn/error/etc. or
    // multiple there of. Would for go listening of all messages and receiver filtration.
    evLog.detail && notifyErrors(evLog.detail);
  }, [evLog]);

  function askToQuit() {
    if (!isVideoFullScreenOn) {
      handleConfirmation("exitapp");
    }
  }

  function onKeyEvent(evt) {
    navKeys.onKeyEvent(evt, [askToQuit]);
  }

  return (<></>);
}
