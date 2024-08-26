/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { Media } from "../../../../utils/playAssetCurrentTypes";

function createDrmConfig(media: Media):
  | undefined
  | {
      [key: string]: {
        serverURL?: string;
        priority?: number;
        httpRequestHeaders?: {};
      };
    } {
  if (!isAuthicationRequired(media)) {
    return;
  }

  if (isDrmLicenseProvided(media)) {
    if (media.drmType == null) {
      return;
    }

    const config = {
      [media.drmType]: {
        serverURL: media.licenseServerURL,
        priority: 0,
      },
    };

    if (media.licenseRequestHeaders) {
      config[media.drmType]["httpRequestHeaders"] = {
        ...media.licenseRequestHeaders,
      };
    }

    return config;
  }

  if (isDrmPreferenceProvided(media)) {
    return media.drmPreference?.reduce((result, item) => {
      return {
        [item]: {
          priority: 0,
        },
        ...result,
      };
    }, {});
  }

  return;

  function isAuthicationRequired(media: Media) {
    return media.requiresAuth === true;
  }

  function isDrmLicenseProvided(media: Media) {
    return media.hasOwnProperty("licenseServerURL");
  }

  function isDrmPreferenceProvided(media: Media) {
    return media.hasOwnProperty("drmPreference");
  }
}

export { createDrmConfig };
