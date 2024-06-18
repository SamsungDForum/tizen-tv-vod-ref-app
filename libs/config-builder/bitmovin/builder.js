/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { protocol } from "./protocol";
import { fromType, fromKeySystems, fromPreference } from "./drm";

const config = {
  config: undefined,
  drmKeySystems: [],

  setAssetUrl: function setAssetUrl(asset) {
    this.config[protocol(asset)] = asset.url;
    return this;
  },

  setDrm: function setDrm(asset) {
    this.config["drm"] = { ...this.config.drm, ...fromType(asset) };
    return this;
  },

  setAssetDrmPreferences: function setAssetDrmPreferences({ drmPreference }) {
    if (drmPreference) {
      this.drmKeySystems = [...drmPreference];
      this.config["drm"] = { ...this.config.drm, ...fromKeySystems(this.drmKeySystems) };
    }
    return this;
  },

  setDrmPreference: function setDrmPreference(preference) {
    if (preference) this.config["drm"] = { ...this.config.drm, ...fromPreference(preference) };
    return this;
  },
};

function configBuilder(initialConfig) {
  const conf = Object.create(config);
  conf.config = { ...initialConfig };
  return conf;
}

export default configBuilder;
