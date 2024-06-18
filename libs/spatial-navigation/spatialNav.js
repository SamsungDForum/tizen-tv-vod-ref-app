/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/*
The one, the only, original SpatialNavigation
https://luke-chang.github.io/js-spatial-navigation/spatial_navigation.js
can be used as drop in replacment with commented out code.
Unreplacable tinker debug helper.
*/

import { default as nav } from "./spatial_navigation";

// All available events
const validEvents = [
  "sn:willmove",
  "sn:willunfocus",
  "sn:unfocused",
  "sn:willfocus",
  "sn:focused",
  "sn:enter-down",
  "sn:enter-up",
  "sn:navigatefailed",
];

// default configuration differences:
// restrict: 'none'
//  'self-first' does not transition between sections when using keys. Rodent
//  navigation works fine. No further checks for underlying cause done.
//  Lib issues / UI layout. Lib's focusNext() looks odd in that regard. Up 4 grabs.
const navConfig = {
  selector: "",
  straightOnly: true,
  straightOverlapThreshold: 0.3,
  rememberSource: false,
  disabled: false,
  defaultElement: "",
  enterTo: "last-focused",
  leaveFor: null,
  tabIndexIgnoreList: "a, input, select, textarea, iframe, [contentEditable=true]",
  navigableFilter: null,
  restrict: "self-first",
};

const spNav = "spatialNav";
const done = "done";

const navState = {
  eventTrace: false,
};

function evTrace(evt) {
  console.log(spNav, evTrace.name, evt);
}

function initNavigation() {
  nav.init();
  nav.set(navConfig);

  console.log(spNav, initNavigation.name, done);
}

function uninitNavigation() {
  if (navState.eventTrace) enableEventTrace(false);
  nav.uninit();

  console.log(spNav, uninitNavigation.name, done);
}

function enableEventTrace(enable) {
  if (navState.eventTrace == enable) return;
  navState.eventTrace = enable;

  const eventListener = enable ? window.addEventListener : window.removeEventListener;
  for (const evName of validEvents) {
    eventListener(evName, evTrace);
  }

  console.log(spNav, enableEventTrace.name, enable, done);
}

export { initNavigation, uninitNavigation, enableEventTrace, navConfig };
