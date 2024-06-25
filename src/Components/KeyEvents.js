/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const KeyName = {
  BACK: "return",
  ENTER: "enter",
  ARROW_UP: "arrowup",
  ARROW_DOWN: "arrowdown",
  ARROW_LEFT: "arrowleft",
  ARROW_RIGHT: "arrowright",
  PLAYPAUSE: "playpause",
  PAUSE: "pause",
  RED: "red",
  GREEN: "green",
  YELLOW: "yellow",
  BLUE: "blue",
  CHANNEL_UP: "channelup",
  CHANNEL_DOWN: "channeldown",
  FFW: "fastforward",
  REW: "rewind",
  INFO: "Info",
  STOP: "MediaStop"
};

const keyCodeToKeyName = {
  XF86Back: KeyName.BACK,
  Backspace: KeyName.BACK,
  Enter: KeyName.ENTER,
  ArrowUp: KeyName.ARROW_UP,
  ArrowDown: KeyName.ARROW_DOWN,
  ArrowLeft: KeyName.ARROW_LEFT,
  ArrowRight: KeyName.ARROW_RIGHT,
  " ": KeyName.PLAYPAUSE,
  XF86Red: KeyName.RED,
  XF86Green: KeyName.GREEN,
  XF86Yellow: KeyName.YELLOW,
  XF86Blue: KeyName.BLUE,
  XF86PlayBack: KeyName.PLAYPAUSE,
  XF86AudioPlay: KeyName.PLAYPAUSE,
  XF86AudioPause: KeyName.PAUSE,
  XF86AudioNext: KeyName.FFW,
  XF86AudioRewind: KeyName.REW,
  XF86AudioStop: KeyName.STOP,
  PageUp: KeyName.CHANNEL_UP,
  PageDown: KeyName.CHANNEL_DOWN,
  XF86RaiseChannel: KeyName.CHANNEL_UP,
  XF86LowerChannel: KeyName.CHANNEL_DOWN,
  ColorF0Red: KeyName.RED,
  ColorF1Green: KeyName.GREEN,
  ColorF2Yellow: KeyName.YELLOW,
  ColorF3Blue: KeyName.BLUE,
  XF86Info: KeyName.INFO
};


const keyMapping = {
  37: KeyName.ARROW_LEFT,
  38: KeyName.ARROW_UP,
  39: KeyName.ARROW_RIGHT,
  40: KeyName.ARROW_DOWN,
  34: KeyName.CHANNEL_DOWN,
  428: KeyName.CHANNEL_DOWN,
  33: KeyName.CHANNEL_UP,
  427: KeyName.CHANNEL_UP,
  10009: KeyName.BACK,
};

const getKey = function (evt) {
  if(evt.code === "PageUp" || evt.code === "PageDown" ) {
    evt.preventDefault()
  }

  if (evt?.nativeEvent?.keyIdentifier === "ColorF0Red") {
    return KeyName.RED;
  }

  if(keyMapping.hasOwnProperty(evt.keyCode)){
    return keyMapping[evt.keyCode]
  }

  if (evt.key !== undefined) {
    return keyCodeToKeyName[evt.key];
    // XF86Back is under keyIdentifier on 2017
  } else if (evt.keyIdentifier !== undefined && evt.keyIdentifier !== "") {
    return keyCodeToKeyName[evt.keyIdentifier];
  } else {
    //On the PC, the mouse click on button tag, do not provide the evt.key value.
    //In this case the evt.type decides about the response. It will be ENTER key.
    if (evt.type === "click") {
      return KeyName.ENTER;
    }

    // 2017 doesn't have the key property in its event object
    if (evt.type === "keypress" && evt.which === 13) {
      return KeyName.ENTER;
    }
  }

  return undefined;
};

function isEventTargetAncestor(domElement, target) {
  if (domElement === undefined) return false;
  let result = domElement === target.parentElement;
  for (let i = 0; i < domElement.childElementCount; i++) {
    if (!result) {
      result = isEventTargetAncestor(domElement.children[i], target);
    }
  }
  return result;
}

function registerTizenTVKeys() {
  if (window.tizen !== undefined) {
    window.tizen.tvinputdevice.registerKeyBatch([
      "ChannelUp",
      "ChannelDown",
      "MediaPlay",
      "MediaPause",
      "MediaStop",
      "MediaPlayPause",
      "MediaRewind",
      "MediaFastForward",
      "ColorF0Red",
      "ColorF1Green",
      "ColorF2Yellow",
      "ColorF3Blue",
      "Info"
    ]);
  }
}

export { KeyName, getKey, isEventTargetAncestor, registerTizenTVKeys };
