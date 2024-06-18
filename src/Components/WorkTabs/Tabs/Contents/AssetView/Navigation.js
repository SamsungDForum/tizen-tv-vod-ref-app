/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { nav, navConfig } from "../../../../../../libs/spatial-navigation";

const navSection = "asset-view";

function addNavigationSection() {
  const cfg = { ...navConfig };
  cfg.selector = "div.asset-view-asset";
  cfg.leaveFor = { up: "@fullscreen-video-button", left: "@left-navigation-bar", down: "" };
  nav.add(navSection, cfg);
}

function removeNavigationSection() {
  nav.remove(navSection);
}

function refreshNavigationSection() {
  removeNavigationSection();
  addNavigationSection();
}

export { refreshNavigationSection };
