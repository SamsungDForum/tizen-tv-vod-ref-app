import { sourceConfig } from "../../../configs/player/bitmovin";

const keySystemToName = {
  // key system -> drm name
  "org.w3.clearkey": "clearkey",
  "com.widevine.alpha": "widevine",
  "com.microsoft.playready": "playready",
  "com.youtube.playready": "playready",
};

const keyNameToSystem = {
  // key system -> drm name
  clearkey: "org.w3.clearkey",
  widevine: "com.widevine.alpha",
  playready: "com.microsoft.playready",
};

function fromType({ drmType, licenseServerURL }) {
  const systemName = keySystemToName[drmType];
  return systemName && { [systemName]: { ...sourceConfig[systemName], LA_URL: licenseServerURL } };
}

function fromKeySystems(keySystems) {
  const systemName = keySystemToName[keySystems[0]];
  return systemName && { preferredKeySystems: [systemName] };
}

function fromPreference({ name }) {
  return { preferredKeySystems: [name] };
}

export { keySystemToName, keyNameToSystem, fromKeySystems, fromPreference, fromType };
