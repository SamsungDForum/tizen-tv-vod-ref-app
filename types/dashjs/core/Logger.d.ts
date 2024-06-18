/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

declare namespace dashjs {
  interface Logger {
    debug(...params: any[]): void;
    info(...params: any[]): void;
    warn(...params: any[]): void;
    error(...params: any[]): void;
    fatal(...params: any[]): void;
  }
}