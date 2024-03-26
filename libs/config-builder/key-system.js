const keySystemNames = {
  "org.w3.clearkey": "clearkey",
  "com.widevine.alpha": "widevine",
  "com.microsoft.playready": "playready",
  "com.youtube.playready": "YT playready",
};

function nameKeySystem(systemName) {
  return keySystemNames[systemName];
}

function preferredKeySystems(builder) {
  return builder.drmKeySystems.map(nameKeySystem);
}

export { nameKeySystem, preferredKeySystems };
