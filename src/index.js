/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./style.scss";
import entries from "object.entries";
import values from "object.values";
import MenuBar from "./Components/MenuBar/MenuBar";
import PlayerWindow from "./Components/PlayerWindow/PlayerWindow";
import TabWorkspace from "./Components/WorkTabs/TabWorkspace";
import { Provider } from "react-redux";
import { getAppStore } from "./reduxStore/store";
import { configureLogger } from "./Components/WorkTabs/Tabs/Logs/logger";
import { initNavigation, uninitNavigation } from "../libs/spatial-navigation";
import { useSetting, store, valueOf } from "./Components/usePlayerFactory/utils/setting";
import { MessageBox } from "./Components/MessageBox/MessageBox";
import { registerTizenTVKeys } from "./Components/KeyEvents";
import application from "./version.json";
import { LogSource, startCapture, stopCapture } from "./Components/WorkTabs/Tabs/Logs/log-source";
import ColorsChanger from "./Components/ColorsChanger/ColorsChanger";
import { addPreviewService, removePreviewService } from "./services/utils";
import { setMedia } from "./Components/usePlayerFactory/utils/playAsset";
import data from "./data/VideoContent.json";
import { setVideoFullScreenOn } from "./Components/PlaybackPanel/VideoFullScreenSlice";
import { dispatch } from "./reduxStore/store";
import { keySystem } from "./Components/usePlayerFactory/utils/setting";
import { setting, settingDefault } from "./Components/usePlayerFactory/utils/setting-slice";
import PreviewServiceHook from "./services/PreviewServiceHook";
import { isTizenPlatform } from "../libs/tizenFilesystem";
import { useSelector } from "react-redux";
import channel from "./Components/ChannelZapping/channel";
import focusBehavior from "./helpers/focusBehavior";
import { Toaster } from "react-hot-toast";
import {FullScreenNotification} from "./Components/Notifications/FullScreenNotification"
import { reqTizenVersion } from "./helpers/reqTizenVersion";
import { networkStatus } from "./helpers/networkStatus";

function onMount(setId) {
  // Initialise navigation in accordance to uninitialisation point.
  initNavigation();
  registerTizenTVKeys();

  if (isTizenPlatform()) {
    addPreviewService(setId);
  }

  return function onUnmount() {
    stopCapture();
    uninitNavigation();

    if (isTizenPlatform()) {
      removePreviewService(setId);
    }

    // Contradicting expectation, 'App()' is not the last component getting unmounted.
    // Using same scheduling to issue 'reload()' as unmout is invoked yield intended behaviour.
    Promise.resolve().then(function reload() {
      store((setting) => ({ source: { current: setting.source.reload } }));
      window.location.reload();
    });
  };
}

function App() {
  // TODO: Review
  // use 'useSetting()' in components consuming state, limitg state extraction to what's actually needed. Will reduce
  // number of redraws. See 'UnmountableApp()' for use example. Using components may be happy with getSetting() which
  // does cause redraws on change.
  // Current use model will redraw entire app on every setting change.
  const playbackSettings = useSetting();
  const [id, setId] = useState(null);
  const previewData = PreviewServiceHook();
  React.useEffect(() => onMount(setId), []);

  channel();
  focusBehavior();

  React.useEffect(() => {
    if (!isTizenPlatform() || id === null) {
      return;
    }

    const dispatchPayload = data.find((video) => video.id === id);
    !dispatchPayload.requiresAuth && keySystem(settingDefault[setting.keySystem]);
    setMedia(dispatchPayload);
    dispatch(setVideoFullScreenOn(true));
  }, [id]);

  const isNetworkConnected = networkStatus()  
  return (
    <div id="app-div" className="app-div">
      <TabWorkspace currentPlayer={playbackSettings.source.current} />
      <PlayerWindow playbackSettings={playbackSettings} />
      <MenuBar/>
      <FullScreenNotification displayNotification={!isNetworkConnected} title="Network error" desc="It seems that your device is not connected to the internet. Please ensure the cable is properly plugged in." />
      <MessageBox 
        boxCustomClassName="version-message-box"
        messageText={`PVOD Ref App v${application.version}`}
        messageCustomClassName={"version-info"}
      />
      <Toaster />
    </div>
  );
}

function Initialise() {
  startCapture();

  if (!Object.entries) {
    entries.shim();
  }
  if (!Object.values) {
    values.shim();
  }

  if (typeof NodeList.prototype[Symbol.iterator] === "undefined") {
    NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
  }
  if (typeof NodeList.prototype.forEach === "undefined") {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }
  if (typeof HTMLCollection.prototype[Symbol.iterator] === "undefined") {
    HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
  }

  return null;
}

/*
  'App()' unmounting wrapper.
*/
function UnmountableApp() {
  const { reload } = useSetting(valueOf.source);
  return reload == undefined && <App />;
}

ReactDOM.render(
  <Provider store={getAppStore()}>
    <Initialise />
    <ColorsChanger>
      <UnmountableApp />
    </ColorsChanger>
  </Provider>,
  document.getElementById("root")
);
