/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

type ModalPickerData = {
  category: string;
  options: Array<string>
}

type onSelectCallbackArgument = {
  category: string;
  option: string | null;
};

type VideoState = {
  VideoFullScreen: {
    value: boolean
  }
}

type LogOverState = {
  LogOverlayScreen: {
    showPlayerLogs: boolean
  }
}

export { ModalPickerData, onSelectCallbackArgument, VideoState, LogOverState };