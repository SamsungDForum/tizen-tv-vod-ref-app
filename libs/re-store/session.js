/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

function readSession(name) {
  try {
    return JSON.parse(sessionStorage[name]);
  } catch {
    // Ignore parse errors.
  } finally {
    // Restore deletes session stored data.
    delete sessionStorage[name];
  }
  return undefined;
}

function storeSession(name, data) {
  sessionStorage[name] = JSON.stringify(data);
}

function sessionRestore(name, restoreDefault) {
  return typeof restoreDefault == typeof Object()
    ? { ...restoreDefault, ...readSession(name) }
    : readSession(name) ?? restoreDefault;
}

export { storeSession, sessionRestore };
