/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const path = require("node:path");
const { spawn } = require("child_process");
const colour = require("./colour");
const procTools = require("./snoop");
const { errorExit } = require("./common");
const tag = [path.parse(__filename).name];

/**
 * Invokes executable with optional set of arguments.
 * @param {string} exe executable to invoke
 * @param  {...string} [args] executable arguments
 * @returns {Promise<[exitCode: number, stdout: string, stderr: string]>}
 */
async function invoke(exe, ...args) {
  try {
    return await procTools.snoopProc(spawn(exe, args, { shell: true }));
  } catch (error) {
    errorExit(1, tag, [invoke.name], colour.red, "Error", colour.reset, error);
  }
}

/**
 * Runs exe with provided args returning string collected from stdout/stderr.
 * @param {string} exe executable to run
 * @param {string[]} args executable arguments
 * @returns {Promise<string>} collected from stdout/stderr
 */
async function run(exe, ...args) {
  console.log(tag, [run.name], colour.yellow, exe, colour.reset, ...args);

  const [exitCode, stdout, stderr] = await invoke(exe, ...args);

  if (exitCode) {
    errorExit(exitCode, tag, [run.name], colour.red, "exit code:", exitCode, colour.reset);
  }

  return stdout.trim() + stderr.trim();
}

module.exports = {
  run: run,
};
