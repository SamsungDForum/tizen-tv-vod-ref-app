import { type TizenDetailsType } from "../../src/Components/WorkTabs/Tabs/AdvancedContent/ChartsComponents/ChartTypes";
import { eventTypeMonitor, resourceMonitor } from "../resource-monitor";
import {
  unuseResourceMonitor,
  useResourceMonitor,
} from "../resource-monitor/resourceMonitorHandlers";
import { saveFilesWhenThresholdExceeded } from "./threshold-checker";

type bufferDataType = {
  cpuConsumption: number[];
  memoryConsumption: number[];
};

export class ResourceBuffer {
  private _chartDataSize = 30;
  private _errorCallback?: (error: Error) => void;

  buffer: bufferDataType = {
    cpuConsumption: [],
    memoryConsumption: [],
  };

  constructor() {
    this.addData = this.addData.bind(this);
    this.buffer = {
      cpuConsumption: [],
      memoryConsumption: [],
    };
  }

  setErrorCallback(callback) {
    this._errorCallback = callback;
  }

  start() {
    useResourceMonitor();
    resourceMonitor.addEventListener(eventTypeMonitor, this.addData);
  }

  stop() {
    unuseResourceMonitor();
    resourceMonitor.removeEventListener(eventTypeMonitor, this.addData);
  }

  reset() {
    this.buffer.cpuConsumption = [];
    this.buffer.memoryConsumption = [];
  }

  get data() {
    return this.buffer;
  }

  private addData(this: ResourceBuffer, e: any): void | null {
    if (e.detail.tizen == undefined) return null;

    const { memoryUsage, cpuUsage }: TizenDetailsType = e.detail.tizen;

    try {
      saveFilesWhenThresholdExceeded(memoryUsage, cpuUsage);
    } catch (error) {
      if (error instanceof Error && this._errorCallback != null) {
        this._errorCallback(error);
      }
    }

    const memoryArray = this.buffer.memoryConsumption;
    if (memoryArray.length > this._chartDataSize) memoryArray.pop();
    memoryArray.unshift(memoryUsage);

    const cpuArray = this.buffer.cpuConsumption;
    if (cpuArray.length > this._chartDataSize) cpuArray.pop();
    cpuArray.unshift(cpuUsage);
  }
}
