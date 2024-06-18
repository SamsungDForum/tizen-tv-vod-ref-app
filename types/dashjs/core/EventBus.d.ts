/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

declare namespace dashjs {
  interface EventBus {
    on(type: string, listener: any, scope: any, options?: object): void;
    off(type: string, listener: any, scope: any): void;
    trigger(type: string, payload?: object, filters?: object): void;
    reset(): void;
  }
}