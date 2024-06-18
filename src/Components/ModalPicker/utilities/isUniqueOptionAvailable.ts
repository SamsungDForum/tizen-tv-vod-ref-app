/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { ModalPickerData } from "../types";

function isUniqueOptionAvailable(
  data: Array<ModalPickerData | string>,
  mainLabel: string
) {
  if(data.length === 0) {
    return false;
  }
  
  if (data.length === 1) {
    if (data[0] === mainLabel) {
      return false;
    }

    let labelName: string;
    if (typeof data[0] === 'string') {
      labelName = data[0];
    } else {
      const { category, options } = data[0];
      if (options !== undefined) {
        labelName = `${category} ${options[0]}`;
      } else {
        labelName = category;
      }
    }

    if (labelName === mainLabel) {
      return false;
    }
  }
  return true;
}

export default isUniqueOptionAvailable;