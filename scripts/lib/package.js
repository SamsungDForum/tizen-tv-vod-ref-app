const path = require("node:path");
const fs = require("node:fs");
const { URL } = require("node:url");
const colour = require("./colour");
const { existsSync } = require("node:fs");
const { errorExit, getFiles } = require("./common");
const tizen = require("./tizen");
const xmlParser = require("./xml-parser");
const tag = [path.parse(__filename).name];

/**
 * Update config.xml with package.json application data.
 * @param {object} configXml Parsed config.xml object
 * @param {import("./application").PackageInfo} info
 */
function updateConfigXml(configXml, info) {
  console.log(tag, [updateConfigXml.name], info);

  configXml.widget["tizen:application"][0].$.id = `${info.packageId}.${info.packageName}`;
  configXml.widget.$.version = info.version;
  configXml.widget.name = info.applicationName;
}

/**
 * @param {object} configXml Parsed config.xml object
 * @param {string} applicationUrl application url source
 */
function setApplicationUrl(configXml, applicationUrl) {
  if (!applicationUrl.toLowerCase().startsWith("http")) {
    applicationUrl = "http://" + applicationUrl;
  }
  const url = new URL(applicationUrl).href;
  console.log(tag, [setApplicationUrl.name], url);

  configXml.widget.content[0].$.src = url;
}

/**
 * Package directory into device package.
 * @param {string} packDir directory to package
 * @param {string} outputDir device package output directory
 * @param {DeviceConfiguration} deviceConfig profile name to be used for signing device package
 * @param {import("./application").PackageInfo} packageInfo Package information.
 * @param {string} [sourceUrl] Optional source url to be placed in config.xml.
 * @returns {Promise<[applicationId: string, applicationName: string, packageFilePath: string]>}
 */
async function pack(packDir, outputDir, deviceConfig, packageInfo, sourceUrl) {
  try {
    console.log(tag, [pack.name], colour.yellow, packDir, colour.reset);

    for await (const filePath of getFiles(packDir)) console.log(colour.gray, filePath, colour.reset);

    const configXmlPath = path.join(packDir, "config.xml");
    if (!existsSync(configXmlPath)) {
      errorExit(
        1,
        tag,
        [pack.name],
        colour.red,
        "Error",
        colour.reset,
        "No/invalid bundle",
        colour.yellow,
        packDir,
        colour.reset
      );
    }

    const configXml = await xmlParser.read(configXmlPath);
    updateConfigXml(configXml, packageInfo);
    if (sourceUrl) {
      setApplicationUrl(configXml, sourceUrl);
    }

    await xmlParser.write(configXmlPath, configXml);
    await tizen.package(packDir, outputDir, deviceConfig);
    const [appId, appName] = configXml.widget["tizen:application"][0].$.id.split(".");
    
    const orgPackageUrl = path.join(outputDir, `${configXml.widget.name}.wgt`);
    const renamedPackageUrl = path.join(outputDir, `${packageInfo.packageName}.wgt`);

    console.log(tag, [pack.name], "rename", colour.yellow, orgPackageUrl, colour.reset, "to", colour.yellow, renamedPackageUrl, colour.reset);
    fs.renameSync(orgPackageUrl, renamedPackageUrl);

    return [appId, appName, renamedPackageUrl];
  } catch (error) {
    errorExit(1, tag, [pack.name], colour.red, "Error", colour.reset, error);
  }
}

module.exports = {
  pack: pack,
};
