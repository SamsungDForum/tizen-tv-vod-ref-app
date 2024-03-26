const colour = require("./colour");

// Snoops stream. Prints stream output returning collected buffer upon completion.
async function snoopStream(stream, encoding = "utf8") {
  let streamDump = "";
  stream.uncork(); // Let it flow, let it flow, let it flow...

  for await (const chunk of stream) {
    if (typeof chunk == "string") {
      streamDump += chunk;
      process.stdout.write(`${colour.gray}${chunk}${colour.reset}`);
    } else {
      const strChunk = chunk.toString(encoding);
      streamDump += strChunk;
      process.stdout.write(`${colour.gray}${strChunk}${colour.reset}`);
    }
  }

  return streamDump;
}

/**
 * Snoops process. Prints stderr/stdout streams returning collected buffers and exit code upon completion.
 * @param {ChildProcess} childProc
 * @return {Promise<[exitCode: number, stdout: string, stderr: string]>}
 */
function snoopProc(childProc) {
  return Promise.allSettled([
    this.onComplete(childProc),
    this.snoopStream(childProc.stdout),
    this.snoopStream(childProc.stderr),
  ]).then((promiseRes) => {
    if (promiseRes[0].status == "rejected") throw promiseRes[0].reason;
    return [promiseRes[0].value, promiseRes[1].value.trim(), promiseRes[2].value.trim()];
  });
}

module.exports = {
  // Completes when child process completes.
  // Failed - if process did not execute.
  // Sucess - if process did execute returning child process exit code for further processing.
  onComplete: (childProc) =>
    new Promise((resolve, reject) => {
      childProc.once("exit", (code, signal) => resolve(code));
      childProc.once("error", (err) => reject(err));
    }),

  snoopStream: snoopStream,
  snoopProc: snoopProc,
};
