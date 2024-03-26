const path = require("node:path");
const { readFileSync, writeFileSync, existsSync } = require("node:fs");
const colour = require("./colour");
const { errorExit } = require("./common");
const tag = [path.parse(__filename).name];

/**
 * @typedef PackageInfo
 * @property {string} name Application name.
 * @property {string} version Application version.
 * @property {string} packageId Tizen package id.
 * @property {string} packageName Tizen package name.
 * @property {string} applicationName Application name.
 */

/**
 * @typedef ApplicationConfig
 * @property {PackageInfo} pvod pvod config.xml data
 * @property {PackageInfo} [bootstrap] bootstrap config.xml data
 * @property {string} fileDeviceConfiguration device-configuration file path. Defaults to project root.
 */

const versionFile = path.join(process.env.INIT_CWD, "src", "version.json");
const configFile = path.join(process.env.INIT_CWD, "application.json");
const configFileOverride = path.join(process.env.INIT_CWD, ".local", "application.json");

/** @type {ApplicationConfig} */
let config = undefined;

/** @returns {ApplicationConfig} */
function getConfig() {
  console.log(tag, [getConfig.name]);
  if (config) return config;

  try {
    console.log(tag, [getConfig.name], "configuration", colour.yellow, configFile, colour.reset);
    config = JSON.parse(readFileSync(configFile, { encoding: "utf8", flag: "r" }));
    if (!config.fileDeviceConfiguration || config.fileDeviceConfiguration.trim() == "") {
      config.fileDeviceConfiguration = path.join(process.env.INIT_CWD, "device-configuration.json");
    }
  } catch (error) {
    errorExit(1, tag, [getConfig.name], colour.red, "Error", colour.reset, error);
  }

  try {
    if (existsSync(configFileOverride)) {
      console.log(tag, [getConfig.name], "overrides", colour.yellow, configFileOverride, colour.reset);
      const overrides = JSON.parse(readFileSync(configFileOverride, { encoding: "utf8", flag: "r" }));
      config = { ...config, ...overrides };
    }
  } catch (error) {
    console.warn(
      tag,
      [getConfig.name],
      colour.yellow,
      configFileOverride,
      colour.red,
      "processing failed",
      colour.reset,
      error
    );
  }

  console.log(tag, [getConfig.name], colour.gray, JSON.stringify(config, null, 2), colour.reset);
  return config;
}

/**
 * @returns {ApplicationVersion}
 */
function getVersionInfo() {
  try {
    console.log(tag, [getVersionInfo.name]);
    if (existsSync(versionFile)) return JSON.parse(readFileSync(versionFile, { encoding: "utf8", flag: "r" }));
    return { version: "" };
  } catch (error) {
    errorExit(1, tag, [getVersionInfo.name], colour.red, "Error", colour.reset, error);
  }
}

/**
 * @param {ApplicationVersion} versionObj
 */
function setVersionInfo(versionObj) {
  try {
    console.log(tag, [setVersionInfo.name], versionObj);
    writeFileSync(versionFile, JSON.stringify(versionObj, null, 2), { encoding: "utf8" });
  } catch (error) {
    errorExit(1, tag, [setVersionInfo.name], colour.red, "Error", colour.reset, error);
  }
}

module.exports = {
  getVersionInfo: getVersionInfo,
  setVersionInfo: setVersionInfo,
  getConfig: getConfig,
};
