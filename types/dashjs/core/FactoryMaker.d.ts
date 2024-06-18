/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

declare namespace dashjs {
  export interface FactoryMaker {
    extend(name: string, childInstance: object, override: boolean, context: object): void;
    getSingletonInstance(context: object, className: string): any,
    setSingletonInstance(context: object, className: string, instance: object): void;
    deleteSingletonInstances(context: object): void;
    getFactoryByName(name: string, factoriesArray: Factory[]): Factory;
    updateFactory(name: string, factoriesArray: Factory[]): void;
    getSingletonFactory(classConstructor: ClassConstructor): SingletonFactory,
    getSingletonFactoryByName(name: string): SingletonFactory;
    updateSingletonFactory(name: string, factory: SingletonFactory): void;
    getClassFactory(classConstructor: ClassConstructor): Factory;
    getClassFactoryByName(name: string): Factory;
    updateClassFactory(name: string, factory: Factory): void;
  }

  export interface ClassConstructor {
    __dashjs_factory_name: string
  }
}