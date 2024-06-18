/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

function subscribe(eventName, listener) {
  document.addEventListener(eventName, listener);
}

function unsubscribe(eventName, listener) {
  document.removeEventListener(eventName, listener);
}

function publish(eventName, data) {
  const event = new CustomEvent(eventName, { detail: data });
  document.dispatchEvent(event);
}

export const EventEnum = {
  BitmovinPlayer: "bitmovinRef",
  DashJSPlayer: "dashjsRef",
  HLSJSPlayer: "hlsjsRef",
  ShakaPlayer: "shakaPlayerRef",
};

export { publish, subscribe, unsubscribe };
	