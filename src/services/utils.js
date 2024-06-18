/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

function deepLink(setState) {
  const requestedAppControl = tizen.application
    .getCurrentApplication()
    .getRequestedAppControl();
  let appControlData, actionData, videoId, pictureId;

  if (requestedAppControl) {
    appControlData = requestedAppControl.appControl.data;

    for (let i = 0; i < appControlData.length; i++) {
      if (appControlData[i].key === 'PAYLOAD') {
        actionData = JSON.parse(appControlData[i].value[0]).values;

        if (JSON.parse(actionData).videoId) {
          videoId = JSON.parse(actionData).videoId;
          setState(videoId);
        }
      }
    }
  }
}

function addPreviewService(setState) {
  window.addEventListener('appcontrol', () => {
    deepLink(setState);
  });
  
  deepLink(setState);
}

function removePreviewService(setState) {
  window.removeEventListener('appcontrol', () => {
    deepLink(setState);
  });
}

export { addPreviewService, removePreviewService };