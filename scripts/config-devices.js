/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const { confirm, input, select } = require("@inquirer/prompts");
const { writeFileSync, existsSync, readFileSync } = require("node:fs");
const path = require("node:path");
const { errorExit } = require("./lib/common");
const { getConfig } = require("./lib/application");

const colour = require("./lib/colour");
const tag = [path.parse(__filename).name];

function checkPortValue(portNo) {
  const num = Number.parseInt(portNo);
  return !(num == Number.NaN || num < 0 || num > 65535);
}

let devicePool = [];

async function getDevice() {
  let device = {
    name: await input({
      message: "Target name",
      validate: (value) => {
        if (value.length > 0) {
          const nameExists = devicePool.some((entry) => entry.name == value);
          if (nameExists) {
            console.error(" exists. Target name must be unique");
            return false;
          }
          return true;
        }
        return false;
      },
    }),
    target: await input({
      message: "Target IP/IP:Port",
      validate: (value) => {
        const ipPort = value.split(":");
        const ipValid =
          /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
            ipPort[0]
          );

        if (!ipValid) {
          console.error(" invalid IP", ipPort[0]);
          return false;
        }
        if (ipPort[1]) {
          const portValid = checkPortValue(ipPort[1]);
          if (!portValid) {
            console.error(" invalid port", ipPort[1]);
            return false;
          }
        }
        return true;
      },
    }),
    port: await input({
      message: "Local debug port",
      validate: (value) => {
        if (value.length == 0) return true;
        if (checkPortValue(value)) return true;
        console.error(" invalid port", value);
        return false;
      },
    }),
    profile: await input({ message: "Certificate profile" }),
    chrome: await input({
      message: "Chrome executable path",
      validate: (value) => {
        if (value.length == 0) return true;
        if (existsSync(value)) return true;
        console.error(" does not exist");
        return false;
      },
    }),
  };

  for (const key of Object.keys(device)) {
    if (device[key].length == 0) delete device[key];
  }

  return device;
}

async function currentConfig(file) {
  if (!existsSync(file)) return [];

  const action = await select({
    message: "device-configuration.json exists",
    choices: [
      {
        name: "overwrite",
        value: "overwrite",
        description: "Overwrite devices in device-configuration.json file",
      },
      {
        name: "append",
        value: "append",
        description: "Append devices to device-configuration.json file",
      },
    ],
  });

  if (action == "overwrite") return [];

  const fileData = readFileSync(file, { encoding: "utf8" });

  try {
    return JSON.parse(fileData);
  } catch (error) {
    console.error(file, "parse failed. File will be overwritten.");
    return [];
  }
}

function configureAnother() {
  return confirm({
    default: true,
    message: `Configure another device ?`,
  });
}

(async () => {
  try {
    
    const file = getConfig().fileDeviceConfiguration;
    console.log(tag, colour.yellow, file, colour.reset);
    devicePool = await currentConfig(file);

    do {
      devicePool.push(await getDevice());
    } while (await configureAnother());

    writeFileSync(file, JSON.stringify(devicePool, null, 2), { encoding: "utf8" });
    console.log(tag, colour.yellow, file, colour.reset, "written");
  } catch (error) {
    errorExit(2, tag, colour.red, "Error", colour.reset, error);
  }
})();
