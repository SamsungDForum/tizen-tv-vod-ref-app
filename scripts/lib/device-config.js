const path = require("node:path");
const fs = require("node:fs");
const os = require("node:os");
const colour = require("./colour");
const { errorExit } = require("./common");
const { getConfig } = require("./application");
const tag = [path.parse(__filename).name];
const configFile = getConfig().fileDeviceConfiguration;

const noConfigMessage = [
  `${colour.yellow}device-configuration.json${colour.reset} not found`,
  "Active Device and Certificate Manager settings will be used.",
  "",
  `${colour.yellow}npm run config:devices${colour.reset} runs ${colour.yellow}device-configuration.json${colour.reset} configuration wizard`,
  "See docs device-configuration.json for details on how to configure target devices.",
  "",
];
/**
 * @typedef {object} DeviceConfiguration target device parameters
 * @property {string} name configuration name.
 * @property {string} target device ip/ip:port.
 * @property {string} [profile] Signing certificate profile.
 * @property {string} [chrome] path to chrome browser used for debugging.
 * @property {number} [port] WebInspector local debug port.
 */

/** @type {DeviceConfiguration[]} */
let devices = undefined;

/**
 * Returned named device from set of defined devices.
 * @param {string} device Configuration name
 * @returns {DeviceConfiguration}
 */
function namedDevice({ device }) {
  let namedDevice = devices.filter(({ name }) => name == device);
  if (namedDevice.length == 0) {
    errorExit(1, tag, [namedDevice.name], colour.red, "Error", colour.reset, "Device", `'${device}'`, "not found");
  }

  if (namedDevice.length > 1) {
    console.error(devices);
    errorExit(1, tag, [namedDevice.name], colour.red, "Error", colour.reset, "Device", `'${device}'`, "duplicated");
  }

  // verify mandatories
  if (!namedDevice[0].target || namedDevice[0].target.length == 0) {
    errorExit(1, tag, [namedDevice.name], colour.red, "Error", colour.reset, "Device", `${device}`, "no target");
  }

  // default target port
  if (!namedDevice[0].target.includes(":")) namedDevice[0].target = namedDevice[0].target + ":26101";

  // default debug port
  if (!namedDevice[0].port) namedDevice[0].port = 9666;

  return namedDevice[0];
}

/** Checks existence of device-configuration.json file */
function probe() {
  console.log(tag, [probe.name]);
  if (!fs.existsSync(configFile)) console.log(noConfigMessage.join(os.EOL));
}

/**
 * Returns device configuration for provided device name.
 * @param {UserArgs} [args] configuration name
 * @returns {DeviceConfiguration|{}} device configuration
 */
function config(args) {
  if (args.device) {
    if (!devices) {
      console.log(tag, [config.name]);
      try {
        devices = JSON.parse(fs.readFileSync(configFile));
      } catch (error) {
        errorExit(1, tag, [config.name], colour.red, "Error", colour.reset, error);
      }
    }
    return { ...namedDevice(args), ...args };
  } else {
    return { ...args };
  }
}

module.exports = {
  probe: probe,
  config: config,
};
