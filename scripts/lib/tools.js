const path = require("path");
const exec = require("./exec");
const tools = require("@tizentv/tools");
const colour = require("./colour");
const { errorExit } = require("./common");
const tag = [path.parse(__filename).name];

/**
 * Verifies sdb installation.
 * @returns {Promise<void>}
 */
async function probe() {
  try {
    console.log(tag, [probe.name]);

    const sdbTool = await tools.getSdbPath();
    const sdbVer = await exec.run(sdbTool, "version");

    console.log(tag, [probe.name], sdbVer);
  } catch (error) {
    errorExit(1, tag, [probe.name], colour.red, "Error", colour.reset, error);
  }
}

/**
 * Returns path to sdb executable
 * @returns {Promise<string>} sdb path
 */
async function sdbTool() {
  try {
    console.log(tag, [sdbTool.name], colour.gray);

    return await tools.getToolPath("sdb");
  } catch (error) {
    errorExit(1, tag, [sdbTool.name], colour.red, "Error", colour.reset, error);
  } finally {
    console.log(colour.reset);
  }
}

module.exports = {
  probe: probe,
  sdbTool: sdbTool,
};
