import { Resource } from "./resource";

/** @extends Resource */
export class Memory extends Resource {
  /**
   * Checks if performance.memory is available
   * @override
   */
  static isSupported() {
    const support = typeof performance.memory != "undefined";
    console.log(Resource.name, Memory.name, Memory.isSupported.name, support);

    return support;
  }

  /** @override @returns {{memory: Object.<string,number>}} */
  get info() {
    /** @type {MemoryInfo} */
    let mem = performance.memory;
    return {
      memory: {
        jsHeapSizeLimit: mem.jsHeapSizeLimit,
        totalJSHeapSize: mem.totalJSHeapSize,
        usedJSHeapSize: mem.usedJSHeapSize,
      },
    };
  }
}
