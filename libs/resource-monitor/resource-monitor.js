import { Resource } from "./resource";
import { Memory } from "./memory";
import { VideoQuality } from "./video-quality";
import { TizenWebApplication } from "./tizen-web-application";
import EventTarget from "@ungap/event-target";

export const eventTypeMonitor = "evtMonitor";

/** @extends {EventTarget} */
export class ResourceMonitor extends EventTarget {
  /** @type {number} */
  useCount = 0;
  /** @type {number} */
  updateInterval = undefined;
  /** @type {number} */
  updateHandle = undefined;
  /** @type {Resource[]} */
  resources = [];

  /** @param {ResourceMonitor} instance */
  static onTimeout(instance) {
    if (instance.useCount) {
      const payload = { detail: {} };
      for (let idx = 0; idx < instance.resources.length; idx++) {
        payload.detail = { ...payload.detail, ...instance.resources[idx].info };
        instance.resources[idx].request();
      }

      instance.dispatchEvent(new CustomEvent(eventTypeMonitor, payload));
      instance.updateHandle = setTimeout(ResourceMonitor.onTimeout, instance.updateInterval, instance);
    }
  }

  /** @param {number} msInterval update interval in ms */
  constructor(msInterval) {
    super();
    this.updateInterval = msInterval;
    this.useCount = 0;
  }

  use() {
    if (this.useCount == 0) {
      this.resources = [];
      if (VideoQuality.isSupported()) this.resources.push(new VideoQuality());
      if (TizenWebApplication.isSupported()) this.resources.push(new TizenWebApplication());
      if (Memory.isSupported()) this.resources.push(new Memory());

      if (this.resources.length > 0) {
        this.updateHandle = setTimeout(ResourceMonitor.onTimeout, 0, this);
        this.useCount++;
      }
    }
  }

  unuse() {
    if (this.useCount == 1) {
      clearTimeout(this.updateHandle);
      this.updateHandle = undefined;
      this.resources = [];
      this.useCount = 0;
    }
  }
}
