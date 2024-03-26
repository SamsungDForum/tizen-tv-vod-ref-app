import { Resource } from "./resource";

/** @extends Resource */
export class Memory extends Resource {
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
