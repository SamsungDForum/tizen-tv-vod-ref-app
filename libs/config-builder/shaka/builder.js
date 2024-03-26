import { fromType, fromKeySystems, fromPreference } from "./drm";

const config = {
  config: undefined,
  drmKeySystems: [],

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

  setAbr: function setAbr(abrEnabled) {
    this.config["abr"] = { ...this.config.abr, enabled: abrEnabled };
    return this;
  },
};

function configBuilder(initialConfig) {
  const conf = Object.create(config);
  conf.config = { ...initialConfig };
  return conf;
}

export default configBuilder;
