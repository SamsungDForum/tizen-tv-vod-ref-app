const path = require("node:path");
const { readFileSync, existsSync } = require("node:fs");
const { URL } = require("node:url");
const http = require("node:http");
const { readdir } = require("node:fs/promises");
const { exit } = require("process");
const colour = require("./colour");
const tag = [path.parse(__filename).name];

/**
 * @typedef UserArgs
 * @property {string} [device] Device name defined in device-configuration.json
 * @property {string} [server] Hot reload server
 */

function serverHotReload() {
  let { host, port, server } = require("./../webpack.devserver").devServer;

  if (host == "0.0.0.0") {
    const netIfs = require("node:os").networkInterfaces();
    const ifName = Object.keys(netIfs)[0];
    if (!ifName) {
      errorExit(
        1,
        tag,
        [serverHotReload.name],
        colour.red,
        "Error",
        colour.reset,
        "Unable to determine interface used by web server. Specify IP in 'webpack.common'"
      );
    }
    const inf = netIfs[ifName].find((ifInfo) => ifInfo.family == "IPv4");
    if (!inf) {
      errorExit(
        1,
        tag,
        [serverHotReload.name],
        colour.red,
        "Error",
        colour.reset,
        "Unable to determine IP to use as server URL. Specify IP in 'webpack.common'"
      );
    }

    host = inf.address;
  }

  return `${server.type}://${host}:${port}`;
}

/**
 * @param {string} targetUrl
 * @returns {Promise<bool>}
 */
async function httpOpen(targetUrl) {
  console.log(tag, [httpOpen.name], targetUrl);
  const url = new URL(targetUrl);

  return await new Promise((resolve) => {
    require("dns").setDefaultResultOrder("ipv4first");
    http
      .request(
        url,
        {
          method: "HEAD",
          timeout: 5000,
        },
        (res) => {
          if (res.statusCode == 200) {
            resolve(true);
          } else {
            console.error(tag, [httpOpen.name], colour.gray, res.statusCode, res.statusMessage, colour.reset);
            resolve(false);
          }
        }
      )
      .on("error", (err) => {
        console.error(tag, [httpOpen.name], colour.gray, err.message, colour.reset);
        resolve(false);
      })
      .end();
  });
}

/**
 * Returns script's arguments. If script has no arguments, empty array is returned.
 * @param {string} scriptFile Script file name
 * @returns {UserArgs}
 */
function scriptArgs(scriptFile) {
  const parsedArgs = {};
  const scriptArgsIdx = process.argv.findIndex((arg) => arg.includes(scriptFile));

  if (scriptArgsIdx != -1) {
    const argsData = process.argv.slice(scriptArgsIdx + 1);
    for (const arg of argsData) {
      const [param, value] = arg.split("=");
      parsedArgs[param] = value;
    }
  }

  return parsedArgs;
}

/**
 * Exits application logging error message & params to console.error.
 * @param {number} errorCode exit code.
 * @param {any} [errorMessage] error message.
 * @param  {...any} [errorOptionalParams] Additional error parameters.
 */
function errorExit(errorCode, errorMessage, ...errorOptionalParams) {
  if (errorMessage) {
    if (errorOptionalParams) {
      console.error(errorMessage, ...errorOptionalParams);
    } else {
      console.error(errorMessage);
    }
    // failsafe. Reset colour if caller forgets.
    console.error(colour.reset);
  }
  exit(errorCode);
}

/**
 * Recursively iterates files in directory and subdirectories
 * @param {string} dir directory path
 * @returns {Promise<string>}
 */
async function* getFiles(dir) {
  const dirEntries = await readdir(dir, { withFileTypes: true });
  for (const entry of dirEntries) {
    const res = path.resolve(dir, entry.name);
    if (entry.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

function packageFile(wgtName, outDir) {
  const file = path.join(process.env.INIT_CWD, outDir, wgtName + ".wgt");
  if (!existsSync(file)) {
    errorExit(1, tag, [packageFile.name], colour.red, "Error", colour.yellow, file, colour.reset, "does not exist");
  }
  return file;
}

module.exports = {
  scriptArgs: scriptArgs,
  errorExit: errorExit,
  getFiles: getFiles,
  packageFile: packageFile,
  serverHotReload: serverHotReload,
  httpOpen: httpOpen,
};
