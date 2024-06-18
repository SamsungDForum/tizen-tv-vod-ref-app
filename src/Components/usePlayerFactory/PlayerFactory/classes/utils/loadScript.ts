/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const loadScript = (url: string) => {
  return new Promise<any>(resolve => {
    let body = document.getElementsByTagName('body')[0];
    let script = document.createElement('script');
    script.crossOrigin = 'anonymous';
    script.type = 'text/javascript';
    script.onload = resolve;
    script.src = url;
    body.appendChild(script);
  });
}

export { loadScript };