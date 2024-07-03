/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { nav } from "../../../../libs/spatial-navigation";

const log = {
  name: "ModalPicker",
  done: "done",
};

/**
 * @param {string} id
 * @returns {string}
 */
function getDatasetKey(id) {
  const cleanId = id.replace(/(^\-|[^a-z0-9\-])/gi, "");
  // naming restrictions apply to data-* tag keys. Report discrepancies.
  const isValid = cleanId == id;
  console.assert(isValid, log.name, getDatasetKey.name, "data-{id} ribald chars:", `'${id}' -> '${cleanId}'`);
  return `modal-picker-${cleanId.toLowerCase()}`;
}

function getNavTag(id) {
  return { [`data-${getDatasetKey(id)}`]: true, tabIndex: -1 };
}

function getDatasetSelector(key) {
  return `[data-${key}]`;
}

/**
 * @param {string} id
 * @returns {void}
 */
function restrictNavigation(id) {
  // disable sections (all)
  for (const sectionId of nav.getSections()) {
    if (sectionId !== 'next-side-menu-panel' && sectionId !== 'side-menu-panel') {
      nav.disable(sectionId)
    }
  }
  // add picker's nav section
  const pickerSection = getDatasetKey(id);
  nav.add({ id: pickerSection, leaveFor: { left: '@asset-view', right: '@next-side-menu-panel' }, selector: getDatasetSelector(pickerSection) });

  console.log(log.name, restrictNavigation.name, "to:", `'${pickerSection}'`, log.done);
}

/**
 * @param {string} id
 * @returns {void}
 */
function freeNavigation(id) {
  // remove picker's nav section
  const pickerSection = getDatasetKey(id);
  nav.remove(pickerSection);
  // enable sections (all)
  for (const sectionId of nav.getSections()) nav.enable(sectionId);

  console.log(log.name, freeNavigation.name, "from:", `'${pickerSection}'`, log.done);
}

function containsOpenedPickers() {
  let sections = document.querySelectorAll("section").values();
  for (const section of sections) {
    const v = section.classList.value;
    if (v.indexOf("modal-picker") >= 0 && v.indexOf("expanded-background") >= 0) {
      return true;
    }
  }
  return false;
}

export { getNavTag, restrictNavigation, freeNavigation, containsOpenedPickers, getDatasetKey, getDatasetSelector };
