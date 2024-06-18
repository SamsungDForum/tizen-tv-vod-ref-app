/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const path = require("path");
const exec = require("./exec");
const colour = require("./colour");
const { errorExit } = require("./common");
const tag = [path.parse(__filename).name];

/**
 * sdb executable cache .
 * @type {string}
 */
let sdbExe = undefined;

/**
 * remote device capability cache
 * @type {Object.<string,Object.<string,string>}
 */
let deviceCapability = {};

/**
 * Returns sdb executable path.
 * @returns {Promise<string>}
 */
async function sdbExePath() {
  try {
    return sdbExe ?? (sdbExe = (await require("./tools").sdbTool()).trim());
  } catch (error) {
    errorExit(1, tag, [sdbExePath.name], colour.red, "Error", colour.reset, error);
  }
}

/**
 * Returns connection serial number.
 * @param {string} [target]
 * @returns {Promise<string>}
 */
async function connectionSerialNumber(target) {
  console.log(tag, [connectionSerialNumber.name], target ?? "Device manager active connection");

  /** @type {[ip: string, name: string, serial: string][]} */
  const activeConnections = (await exec.run(await sdbExePath(), "devices"))
    .replace("\r\n", "\n")
    .split("\n")
    .filter((line) => !line.startsWith("*"))
    .slice(1)
    .map((line) => line.split("\t").map((field) => field.trim()));

  const connection = target ? activeConnections.find((activeEntry) => activeEntry[0] == target) : activeConnections[0];

  if (!connection) {
    console.error(colour.gray, activeConnections, colour.reset);
    errorExit(1, colour.red, "Error", colour.reset, "Not connected to target", target ?? 0);
  }

  return connection[0];
}

/**
 * Returns connection serial number. If target is omitted, Device Manager
 * connection #0 will be returned when connected.
 * @param {string} [target] Target device IP/IP:Port.
 * @returns {Promise<string>} connection serial number.
 */
async function connect(target) {
  console.log(tag, [connect.name], target ?? "Device manager active connection");

  if (target) {
    if ((await exec.run(await sdbExePath(), "connect", target)).toLowerCase().includes("error")) {
      errorExit(1, colour.red, "Error", colour.reset, "Connection failed");
    }
  }

  return await connectionSerialNumber(target);
}

/**
 * Terminates running application.
 * @param {string} serialNumber
 * @param {string} packageId
 * @returns {Promise<string>}
 */
async function kill(serialNumber, packageId) {
  console.log(tag, [kill.name], serialNumber, packageId);
  return await exec.run(await sdbExePath(), "-s", serialNumber, "shell", 0, "kill", packageId);
}

/**
 * Installs package file on target device using connection serial number.
 * @param {string} serialNumber
 * @param {string} packageFile
 * @returns {Promise<string>}
 */
async function install(serialNumber, packageFile) {
  console.log(tag, [install.name], serialNumber, packageFile);
  const res = await exec.run(await sdbExePath(), "-s", serialNumber, "install", packageFile);
  if (res.includes("key[end] val[ok]")) return res;
  errorExit(1, tag, [install.name], colour.red, "Error", colour.reset, "Install failed");
}

/**
 * Uninstalls package packageId from target device using connection serial number.
 * @param {string} serialNumber
 * @param {string} packageId
 * @returns {Promise<string>}
 */
async function uninstall(serialNumber, packageId) {
  console.log(tag, [uninstall.name], serialNumber, packageId);
  return await exec.run(await sdbExePath(), "-s", serialNumber, "uninstall", packageId);
}

/**
 * Launches application.
 * @param {string} serialNumber
 * @param {string} packageId
 * @param {string} packageName
 * @returns {Promise<string>}
 */
async function run(serialNumber, packageId, packageName) {
  console.log(tag, [run.name], serialNumber, packageId, packageName);

  const args = ["-s", serialNumber, "shell", 0, "execute", `${packageId}.${packageName}`];
  if ((await capability(serialNumber))["platform_version"] == "3.0") {
    args.push(0);
  }

  // Launch application in non debug mode
  const res = await exec.run(await sdbExePath(), ...args);
  if (res.includes("successfully launched")) return res;
  errorExit(1, tag, [run.name], colour.red, "Error", colour.reset, "Run failed");
}

/**
 * Launches application in debug mode.
 * @param {string} serialNumber
 * @param {string} packageId
 * @param {string} packageName
 * @returns {Promise<string>}
 */
async function debug(serialNumber, packageId, packageName) {
  console.log(tag, [debug.name], serialNumber, packageId, packageName);

  const args = ["-s", serialNumber, "shell", 0, "debug", `${packageId}.${packageName}`];
  if ((await capability(serialNumber))["platform_version"] == "3.0") {
    args.push(0);
  }

  const res = await exec.run(await sdbExePath(), ...args);
  if (res.includes("successfully launched")) return res;
  errorExit(1, [debug.name], tag, colour.red, "Error", colour.reset, "Run failed");
}

/**
 * Configures port forwarding between local and remote port.
 * @param {string} serialNumber
 * @param {number} localPort
 * @param {number} remotePort
 * @returns {Promise<string>}
 */
async function portForward(serialNumber, localPort, remotePort) {
  console.log(tag, [portForward.name], serialNumber, localPort, remotePort);
  const res = await exec.run(
    await sdbExePath(),
    "-s",
    serialNumber,
    "forward",
    `tcp:${localPort}`,
    `tcp:${remotePort}`
  );
  if (!res.includes("error")) return res;
  errorExit(1, [debug.name], tag, colour.red, "Error", colour.reset, "Port forward failed");
}

/**
 * Configures port forwarding between local and remote port.
 * @param {string} serialNumber
 * @returns {Promise<Object.<string, string>}
 */
async function capability(serialNumber) {
  if (!deviceCapability[serialNumber]) {
    console.log(tag, [capability.name], serialNumber);
    const res = await exec.run(await sdbExePath(), "-s", serialNumber, "capability");
    if (res.includes("error")) {
      errorExit(1, [debug.name], tag, colour.red, "Error", colour.reset, "Capability failed");
    }

    deviceCapability[serialNumber] = {};
    for (const line of res.replaceAll("\r\n", "\n").split("\n")) {
      const [key, value] = line.split(":");
      deviceCapability[serialNumber][key] = value;
    }
  }

  return deviceCapability[serialNumber];
}

/**
 * Configures port forwarding between local and remote port.
 * @param {string} serialNumber
 * @param {string} serialNumber
 * @returns {Promise<string>}
 */
async function rmFile(serialNumber, remoteFilePath) {
  console.log(tag, [rmFile.name], serialNumber, colour.yellow, remoteFilePath, colour.reset);
  const res = await exec.run(await sdbExePath(), "-s", serialNumber, "shell", "0", "rmfile", remoteFilePath);
  if (!res.includes("error")) return res;
  errorExit(1, [debug.name], tag, colour.red, "Error", colour.reset, "Port forward failed");
}

module.exports = {
  connect: connect,
  kill: kill,
  install: install,
  uninstall: uninstall,
  run: run,
  debug: debug,
  portForward: portForward,
  capability: capability,
  rmFile: rmFile,
};
