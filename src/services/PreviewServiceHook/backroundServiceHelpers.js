/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { dispatch } from "../../reduxStore/store";
import { startPreviewLoading, setPreviewLoadingState  } from "../PreviewLoadingSlice";
import { REQUEST_PORT_TIMEOUT, REQUEST_PORT_INTERVAL, MESSAGE_PORT_NAME, DYNAMIC_PREVIEW_SERVICE_ID, STATIC_PREVIEW_SERVICE_ID, SETTING_PREVIEW_THROTTLE_TIME, SETTING_PREVIEW_TIME_NEEDED } from "./constants";

function launchBackgroundService(serviceID) {
  return new Promise((resolve, reject) => {
    tizen.application.launch(
      serviceID,
      () => resolve(),
      error => reject(error)
    );
  });
}

function isBackgroundServiceRunning(serviceID) {
  return new Promise(resolve => {
    tizen.application.getAppsContext(contexts => {
      for(const process of contexts) {
        if(process.appId === serviceID) {
          resolve(true);
        }
      }
      resolve(false);
    })
  });
}

function requestRemoteMessagePort(serviceID) {
  return new Promise((resolve, reject) => {
    console.log(`Waiting for message port ${MESSAGE_PORT_NAME}`);
    let remotePort;
    let id = setInterval(() => {
      try {
        remotePort = tizen.messageport.requestRemoteMessagePort(serviceID, MESSAGE_PORT_NAME);
      } catch (error) {}

      if(remotePort) {
        clearInterval(id);
        id = null;
        resolve(remotePort);
      }
    }, REQUEST_PORT_INTERVAL);

    setTimeout(() => {
      if(id) {
        clearInterval(id);
        reject(new Error(`Requesting remote port timeout: ${REQUEST_PORT_TIMEOUT}ms`));
      }
    }, REQUEST_PORT_TIMEOUT);
  });
}

function sendMessageToRemotePort(remotePort, previewData) {
  console.log('Sending preview data to remote port', previewData);
  remotePort.sendMessage([{ key: "Preview", value: JSON.stringify(previewData) }]);
}

function setStaticPreview() {
  const result = { state: 'success' };
  dispatch(startPreviewLoading());
  setTimeout(() => dispatch(setPreviewLoadingState(result.state)), SETTING_PREVIEW_TIME_NEEDED);
  isBackgroundServiceRunning(STATIC_PREVIEW_SERVICE_ID)
    .then(isServicePresent => {
      if(!isServicePresent) {
        return launchBackgroundService(STATIC_PREVIEW_SERVICE_ID);
      }
    })
    .then(() => console.log(`Static Preview has been successfully set`))
    .catch(error => {
      result.state = 'failure';
      console.log(`There was an error with Static Preview: ${error.message}`);
    });
}

function setDynamicPreview(previewData) {
  const result = { state: 'success' };
  dispatch(startPreviewLoading());
  setTimeout(() => dispatch(setPreviewLoadingState(result.state)), SETTING_PREVIEW_TIME_NEEDED);
  isBackgroundServiceRunning(DYNAMIC_PREVIEW_SERVICE_ID)
    .then(isServicePresent => {
      if(!isServicePresent) {
        return launchBackgroundService(DYNAMIC_PREVIEW_SERVICE_ID);
      }
    })
    .then(() => requestRemoteMessagePort(DYNAMIC_PREVIEW_SERVICE_ID))
    .then(remotePort => sendMessageToRemotePort(remotePort, previewData))
    .catch(error => {
      result.state = 'failure';
      console.log(`There was an error with Dynamic Preview: ${error.message}`);
    });
}

export { setStaticPreview, setDynamicPreview };
