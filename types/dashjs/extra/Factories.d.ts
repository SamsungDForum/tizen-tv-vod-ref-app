/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

declare namespace dashjs {
  export interface Factory<T = any> {
    create: () => T;
  }

  export interface SingletonFactory<T = any> {
    getInstance: () => T;
  }

  export interface ReportingFactory {
    create(entry: object, reportingController: ReportingController): void;
    register(schemeIdUri: string, moduleName: string): void;
    unregister(schemeIdUri: string): void;
  }

  export interface MetricsHandlerFactory {
    create(listType: string, reportingController: ReportingController): void;
    register(key: string, handler: object): void;
    unregister(key: string): void;
  }
}