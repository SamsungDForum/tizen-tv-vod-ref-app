/*
  default configuration overrides
  https://github.com/video-dev/hls.js/blob/master/docs/API.md#fine-tuning
*/
const configOverrides = {
  debug: false,
  emeEnabled: true,
};

/*
  List of events to be monitored - in case config: { debug: true} is to noisy.
  No actions, other thje debug printed, is taken.
  https://github.com/video-dev/hls.js/blob/master/docs/API.md#runtime-events
  Available after hls is loaded.
*/
function getDebugMonitorEvents() {
  return [];
}

/*
const player = Object.keys(version).reduce((acc, value) => {
  return { ...acc, [`${value}`]: `${value}` };
}, {});
*/

const type = "hlsjs";

/*
  https://github.com/video-dev/hls.js/blob/master/docs/API.md#first-step-setup-and-support
  https://github.com/video-dev/hls.js/releases
*/
const version = [
  {
    type: type,
    version: "latest",
    args: { src: "https://cdn.jsdelivr.net/npm/hls.js@latest" },
  },
  {
    type: type,
    version: "1.1.5",
    args: { src: "https://cdn.jsdelivr.net/npm/hls.js@v1.1.5" },
  },
];

export { configOverrides, version, getDebugMonitorEvents, type };
