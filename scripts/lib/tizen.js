const colour = require("./colour");
const fs = require("node:fs");
const path = require("node:path");
const { run } = require("./exec");
const { errorExit } = require("./common");
const cmd = require("os").platform() == "win32" ? "tizen.bat" : "tizen";
const tag = [path.parse(__filename).name];

/**
 * Verifies tizen installation
 * @returns {Promise<void>}
 */
async function probe() {
  console.log(tag, [probe.name]);
  const tizenVer = await run(cmd, "version");
  console.log(tag, [probe.name], tizenVer);
}

/**
 * @param {string} packDir directory to pack into wgt file.
 * @param {string} outputDir directory where wgt file will be stored.
 * @param {import("./device-config").DeviceConfiguration} [config] signing certificate profile name.
 * @returns {Promise<string>}
 */
async function package(packDir, outputDir, config) {
  console.log(tag, [package.name], packDir, outputDir, config ?? "Certificate Manager active profile");

  const res = config.profile
    ? await run(cmd, "package", "-t", "wgt", "--sign", config.profile, "-o", outputDir, "--", packDir)
    : await run(cmd, "package", "-t", "wgt", "-o", outputDir, "--", packDir);

  if (res.includes("Package File Location")) return res;
  errorExit(1, tag, [package.name], colour.red, "Error", colour.reset, "Packaging failed");
}

/**
 * @param {string} wgtFilePath
 * @returns {string}
 */
function sanitiseWgtFilePath(wgtFilePath) {
  const parsedPath = path.parse(wgtFilePath);
  if (parsedPath.base.includes(" ")) {
    parsedPath.base = parsedPath.base.replaceAll(" ", "");
    return path.format(parsedPath);
  }

  return wgtFilePath;
}

/**
 * @param {string} serialNumber connection serial
 * @param {string} wgtFilePath wgt file path
 */
async function install(serialNumber, wgtFilePath) {
  console.log(tag, [install.name], serialNumber, colour.yellow, wgtFilePath, colour.reset);

  const sanitisedFileName = sanitiseWgtFilePath(wgtFilePath);
  if (wgtFilePath != sanitisedFileName) {
    try {
      console.log(
        tag,
        [install.name],
        "copying",
        colour.yellow,
        wgtFilePath,
        colour.reset,
        "to",
        colour.yellow,
        sanitisedFileName,
        colour.reset
      );
      fs.copyFileSync(wgtFilePath, sanitisedFileName);

      wgtFilePath = sanitisedFileName;
    } catch (error) {
      errorExit(1, tag, [install.name], colour.red, "Error", error);
    }
  }

  const res = await run(cmd, "install", "-n", wgtFilePath, "-s", serialNumber);

  if (res.includes("Tizen application is successfully installed")) return res;
  errorExit(1, tag, [install.name], colour.red, "Error", colour.reset, "Installation failed");
}

module.exports = {
  probe: probe,
  package: package,
  install: install,
  sanitiseWgtFilePath: sanitiseWgtFilePath,
};
