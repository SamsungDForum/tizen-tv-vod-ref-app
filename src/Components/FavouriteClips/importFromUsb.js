/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { readFileFromSomeUSBRoot } from "../../../libs/tizenFilesystem";
import { dispatch } from "../../reduxStore/store";
import { loadFavouriteClips } from "../WorkTabs/Tabs/Contents/AssetView/FavouriteClipsSlice";
import { isContentValid } from "../WorkTabs/Tabs/Contents/ContentValidator";
import { firstUniqueID } from "./firstUniqueID";
import toast from "react-hot-toast";

export async function importFromUsb() {
  try {
    const result = await readFileFromSomeUSBRoot("VideoContent.json");
    const isValid = isContentValid(result.message);

    if (!isValid.success) {
      toast.error(`Something is wrong with your file: ${isValid.error || 'Unknown error'}`, {
        duration: 3000,
      });
    } else {
      dispatch(loadFavouriteClips(JSON.stringify(firstUniqueID(result.message))));
      toast.success("Clips imported from USB", {
        duration: 3000,
      });
    }
  } catch (error) {
    toast.error(`An error occurred while importing from USB: ${error.message || 'Unknown error'}`, {
      duration: 3000,
    });
  }
}