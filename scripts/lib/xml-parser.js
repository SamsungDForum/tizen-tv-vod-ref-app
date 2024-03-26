const fs = require("node:fs");
const path = require("node:path");
const xml2js = require("xml2js");
const colour = require("./colour");
const { errorExit } = require("./common");
const promisify = require("util").promisify;
const readAsync = promisify(fs.readFile);
const writeAsync = promisify(fs.writeFile);
const tag = [path.parse(__filename).name];

/**
 * Parses xml file.
 * @param {string} xmlFilePath path to xml file
 * @returns {Promise<object>} parsed xml object
 */
async function read(xmlFilePath) {
  try {
    console.log(tag, [read.name], colour.yellow, xmlFilePath, colour.reset);

    const data = await readAsync(xmlFilePath, { encoding: "utf8", flag: "r" });
    return await new xml2js.Parser().parseStringPromise(data);
  } catch (error) {
    errorExit(1, tag, [read.name], colour.red, "Error", colour.reset, error);
  }
}

/**
 * Writes xml parsed object as xml file.
 * @param {string} xmlFilePath path to xml file
 * @param {object} xmlObject parsed xml object
 */
async function write(xmlFilePath, xmlObject) {
  try {
    console.log(tag, [write.name], colour.yellow, xmlFilePath, colour.reset);

    const xml = new xml2js.Builder({
      rootName: Object.keys(xmlObject)[0],
      xmldec: {
        version: "1.0",
        encoding: "UTF-8",
      },
    }).buildObject(xmlObject.widget);

    await writeAsync(xmlFilePath, xml, { encoding: "utf8", flag: "w" });
  } catch (error) {
    errorExit(1, tag, [write.name], colour.red, "Error", colour.reset, error);
  }
}

module.exports = {
  read: read,
  write: write,
};
