/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/**
 * @typedef {Object} AdaptationLogic
 * @property {(AudioAdaptationData)=>string} audio
 * @property {(AudioAdaptationData)=>string} video
 */
let adaptationLogic = {
  audio: defaultAdapter,
  video: defaultAdapter,
};

/**
 * Default adaptation handler
 * @param {VideoAdaptationData|AudioAdaptationData}
 * @returns {string}
 */
function defaultAdapter(data) {
  return data.suggested;
}

/**
 * Sets custom adaptation logic handlers. Setting handler to null/undefined
 * restores default adaptation handler
 * @param {(VideoAdaptationData)=>string} [videoAdapter]
 * @param {(AudioAdaptationData)=>string} [audioAdapter]
 */
function setAdaptationLogic(videoAdapter, audioAdapter) {
  adaptationLogic.video = videoAdapter ?? defaultAdapter;
  adaptationLogic.audio = audioAdapter ?? defaultAdapter;
}

function getPlayerConfig() {
  return {
    key: "29ba4a30-8b5e-4336-a7dd-c94ff3b25f30",
    ui: false,
    tweaks: {
      file_protocol: true,
      app_id: "com.bitmovin.demo.webap",
    },
    playback: {
      autoplay: false,
    },
    logs: {
      level: bitmovin.player.LogLevel.LOG,
    },
    adaptation: {
      startupBitrate: "1kbps",
      onAudioAdaptation: (data) => {
        return adaptationLogic.audio(data);
      },
      onVideoAdaptation: (data) => {
        return adaptationLogic.video(data);
      },
    },
  };
}

const sourceConfig = {
  // drm name default config, just fill in LA_URL
  playready: {
    // Necessary switches to make playready work.
    plaintextChallenge: true,
    utf8message: true,
    headers: { "Content-Type": "text/xml" },
    // Stability switches.
    maxLicenseRequestRetries: 2,
    licenseRequestRetryDelay: 1000,
  },
  widevine: {
    LA_URL: undefined,
  },
  clearkey: {
    LA_URL: undefined,
  },
};

const type = "bitmovin";

// CDN version links
// https://bitmovin.com/docs/player/releases/web
const version = [
  {
    type: type,
    version: "v8 latest",
    args: { src: "https://cdn.bitmovin.com/player/web/8/bitmovinplayer.js" },
  },
  {
    type: type,
    version: "8.93.0",
    args: {
      src: "https://cdn.bitmovin.com/player/web/8.93.0/bitmovinplayer.js",
    },
  },
];

export { getPlayerConfig, setAdaptationLogic, sourceConfig, type, version };
