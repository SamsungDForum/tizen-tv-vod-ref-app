/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import * as subscribe from "./subscribe";

function resolvePromise(evSource, evName) {
  return subscribe.resolvePromise(evSource, evSource.addEventListener, evSource.removeEventListener, evName);
}

function rejectPromise(evSource, evName) {
  return subscribe.rejectPromise(evSource, evSource.addEventListener, evSource.removeEventListener, evName);
}

function promise(evSource, evResolveName, evRejectName) {
  return subscribe.promise(
    evSource,
    evSource.addEventListener,
    evSource.removeEventListener,
    evResolveName,
    evRejectName
  );
}

export { resolvePromise, rejectPromise, promise };
