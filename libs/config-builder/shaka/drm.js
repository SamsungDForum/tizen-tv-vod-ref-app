const keySystem = {
  // key system -> drm name
  "org.w3.clearkey": "org.w3.clearkey",
  "com.widevine.alpha": "com.widevine.alpha",
  "com.microsoft.playready": "com.microsoft.playready",
  "com.youtube.playready": "com.microsoft.playready",
};

function fromType({ drmType, licenseServerURL }) {
  return keySystem[drmType] && { servers: { [keySystem[drmType]]: licenseServerURL } };
}

function fromKeySystems(keySystems) {
  return keySystem[keySystems[0]] && { preferredKeySystems: [keySystem[keySystems[0]]] };
}

function fromPreference({ system }) {
  return { preferredKeySystems: [system] };
}

export { fromType, fromKeySystems, fromPreference };
