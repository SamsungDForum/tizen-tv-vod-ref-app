/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

export function hlsPromisify(
  hls: hlsjs.HlsjsInstance,
  evResolve: string[],
  evReject: string[],
  exec?: (this: hlsjs.HlsjsInstance, ...args) => any,
  ...args
) {
  let resolveFn: (value: unknown) => void;
  let rejectFn: (reason?: any) => void;

  const execFn = exec;
  const execArgs = args;
  const hlsInstance = hls;
  const resolveNames = evResolve;
  const rejectNames = evReject;

  return new Promise((resolve, reject) => {
    resolveFn = resolve;
    rejectFn = reject;
    resolveNames.forEach((evName) => hlsInstance.once(evName, resolveFn));
    rejectNames.forEach((evName) => hlsInstance.once(evName, rejectFn));

    execFn?.apply(hlsInstance, execArgs);
  }).finally(() => {
    resolveNames.forEach((evName) => hlsInstance.off(evName, resolveFn));
    rejectNames.forEach((evName) => hlsInstance.off(evName, rejectFn));
  });
}
