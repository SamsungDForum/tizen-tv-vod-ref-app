import { Resource } from "./resource";
import { Memory } from "./memory";
import { VideoQuality } from "./video-quality";
import EventTarget from "@ungap/event-target";

export const eventTypeMonitor = "evtMonitor";

/** @extends {EventTarget} */
export class ResourceMonitor extends EventTarget {
  /** @type {number} */
  #useCount;
  /** @type {number} */
  #updateInterval;
  /** @type {number} */
  #updateHandle;
  /** @type {Resource[]} */
  #resources;

  /** @param {ResourceMonitor} instance */
  static #onTimeout(instance) {
    if (instance.#useCount) {
      let info = Object.assign({}, ...instance.#resources.map((r) => r.info));
      instance.dispatchEvent(new CustomEvent(eventTypeMonitor, { detail: { ...info } }));

      let resCount = instance.#resources.length;
      for (let idx = 0; idx < resCount; idx++) {
        instance.#resources[idx].request();
      }

      instance.#updateHandle = setTimeout(ResourceMonitor.#onTimeout, instance.#updateInterval, instance);
    }
  }

  /** @param {number} msInterval update interval in ms */
  constructor(msInterval) {
    super();
    this.#updateInterval = msInterval;
    this.#useCount = 0;
    this.#updateHandle = undefined;
  }

  use() {
    if (this.#useCount++ == 0) {
      this.#resources = [new Memory(), new VideoQuality()];
      this.#updateHandle = setTimeout(ResourceMonitor.#onTimeout, 0, this);
    }
  }

  unuse() {
    if (this.#useCount && --this.#useCount == 0) {
      this.#updateHandle = clearTimeout(this.#updateHandle);
      this.#resources = [];
    }
  }
}
