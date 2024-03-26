const path = require("path");
const colour = require("./colour");
const os = require("node:os");
const { createHash } = require("node:crypto");
const { URL } = require("node:url");
const sdb = require("./sdb");
const { errorExit } = require("./common");
const tag = [path.parse(__filename).name];

const chromeDefaultArgs = [
  "--new-window",
  "--enable-blink-features=ShadowDOMV0,CustomElementsV0,HTMLImports",
  "--no-first-run",
  "--activate-on-launch",
  "--no-default-browser-check",
  "--allow-file-access-from-files",
  "--disable-web-security",
  "--disable-translate",
];

function devtoolsUrl(targetUrl) {
  console.log(tag, [devtoolsUrl.name], targetUrl);

  return new Promise((resolve) => {
    require("dns").setDefaultResultOrder("ipv4first");
    require("http").get(new URL(targetUrl + "/json"), (res) => {
      if (res.statusCode != 200) {
        errorExit(1, tag, [devtoolsUrl.name], colour.red, "Error", colour.reset, "HTTP status code", res.statusCode);
      }

      let data = [];
      res.on("data", (chunk) => data.push(chunk));
      res.once("end", () => {
        try {
          resolve(JSON.parse(Buffer.concat(data).toString())[0].devtoolsFrontendUrl);
        } catch (error) {
          errorExit(1, tag, [devtoolsUrl.name], colour.red, "Error", colour.reset, error);
        }
      });
    });
  });
}

/**
 * Launches installed application in debug mode and attaches devtools to running application
 * @param {string} connectionNo
 * @param {string} packageId
 * @param {string} packageName
 * @param {DeviceConfiguration} [config]
 * @returns {Promise<void>}
 */
async function devtools(connectionNo, packageId, packageName, config) {
  console.log(tag, [devtools.name], connectionNo, packageId, packageName);

  // Configure port forwarding to target devices via sdb.
  const remotePort = parseInt(
    (await sdb.debug(connectionNo, packageId, packageName))
      .split(":")
      .map((item) => item.trim())
      .pop()
  );
  const localPort = (config && config.port) ?? 9666;
  await sdb.portForward(connectionNo, localPort, remotePort);

  // Get DevTools frontend url.
  const targetUrl = `http://localhost:${localPort}`;
  const toolsUrl = await devtoolsUrl(targetUrl);
  const debugUrl = `${targetUrl}${toolsUrl}`;

  // launch DevTools using provided chrome.exe or in default browser if chrome.exe
  // is not specified.
  if (config && config.chrome) {
    const chromeUserDataDir = path.join(os.tmpdir(), createHash("md5").update(config.chrome).digest("hex"));
    const chromeArgs = chromeDefaultArgs.concat([`--user-data-dir=${chromeUserDataDir}`, `--app=${debugUrl}`]);

    console.log(tag, "User data path", colour.yellow, chromeUserDataDir, colour.reset);

    require("child_process").spawn(config.chrome, chromeArgs, { env: process.env, detached: true });
  } else {
    require("child_process").exec(
      (process.platform == "darwin" ? "open" : process.platform == "win32" ? "start" : "xdg-open") + " " + debugUrl
    );
  }
}

module.exports = {
  devtools: devtools,
};
