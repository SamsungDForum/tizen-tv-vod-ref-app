/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { FilterEnums } from "./FiltersSlice";

export function createSourceFilter(curSRCFilter) {
  return function (video) {
    if (curSRCFilter !== FilterEnums.SRC.ALL) {
      return video.url.includes(curSRCFilter);
    } else {
      return true;
    }
  };
}

export function createDRMFilter(curDRMFilter) {
  return function (video) {
    if (curDRMFilter !== FilterEnums.DRM.ALL) {
      if (curDRMFilter === FilterEnums.DRM.NONE) {
        return video.requiresAuth === false;
      }
      return video.drmType === curDRMFilter;
    } else {
      //when ALL is selected - we dont want to filter - return true
      return true;
    }
  };
}

export function createContainerFilter(curContainerFilter) {
  let filterVideosByContainer = function (video) {
    if (curContainerFilter != FilterEnums.Container.ALL) {
      return video.container?.includes(curContainerFilter);
    } else {
      return true;
    }
  };

  return filterVideosByContainer;
}

export function createManifestFilter(currentManifestFilter) {
  return function filterVideosByManifest(video) {
    if (currentManifestFilter != FilterEnums.Manifest.ALL) {
      return video.manifest === currentManifestFilter;
    } else {
      return true;
    }
  };
}
