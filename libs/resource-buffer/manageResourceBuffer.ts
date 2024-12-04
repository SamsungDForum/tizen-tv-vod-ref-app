import { TizenDetailsType } from "../../src/Components/WorkTabs/Tabs/AdvancedContent/ChartsComponents/ChartTypes";
import { saveLogs } from "../../src/Components/WorkTabs/Tabs/Logs/logger";
import { eventTypeMonitor, resourceMonitor } from "../resource-monitor";
import { unuseResourceMonitor, useResourceMonitor } from "../resource-monitor/resourceMonitorHandlers";
import { ResourceBuffer } from "./resourceBuffer";

export class ManageResourceBuffer<TResourceBuffer extends ResourceBuffer> {
  private errorCallback?: (error: Error) => void;
  private lastResourceExceed = 0; // determines how many measurements must be taken to allow the dataUsage file to be saved
  private isPlotChartsOn = false;
  bufferSaver: TResourceBuffer;
  bufferPlotter: TResourceBuffer;

  constructor(saver: TResourceBuffer, plotter: TResourceBuffer) {
    this.bufferSaver = saver;
    this.bufferPlotter = plotter;
  }

  setErrorCallback(callback: (error: Error) => void) {
    this.errorCallback = callback;
  }

  start() {
    useResourceMonitor();
    resourceMonitor.addEventListener(eventTypeMonitor, this.onBufferData.bind(this));
    this.isPlotChartsOn = true;
  }

  stop() {
    unuseResourceMonitor();
    resourceMonitor.removeEventListener(eventTypeMonitor, this.onBufferData.bind(this));
    this.isPlotChartsOn = false;
  }
  reset() {
    this.bufferSaver.clear();
    this.bufferPlotter.clear();
  }

  onBufferData(e) {
    if (e.detail.tizen == undefined || !this.isPlotChartsOn) return null;
    const { memoryUsage, cpuUsage }: TizenDetailsType = e.detail.tizen;

    if (this.bufferSaver.length > 10) {
      try {
        this.saveFilesWhenThresholdExceeded(memoryUsage, cpuUsage);
      } catch (error) {
        if (error instanceof Error && this.errorCallback != null) this.errorCallback(error);
      }
    }

    if (this.bufferSaver.isFull) this.bufferSaver.removeItem();
    this.bufferSaver.appendItem(cpuUsage, memoryUsage);

    if (this.bufferPlotter.isFull) this.bufferPlotter.removeItem();
    this.bufferPlotter.appendItem(cpuUsage, memoryUsage);
  }

  private saveFilesWhenThresholdExceeded(memUsage: number, cpuUsage: number) {
    const memThreshold = Number(localStorage.getItem("memoryThreshold") ?? 350);
    const cpuThreshold = Number(localStorage.getItem("cpuThreshold") ?? 75);

    if (this.lastResourceExceed > 0) this.lastResourceExceed--;

    if (this.lastResourceExceed === 0) {
      if (memThreshold <= memUsage) {
        saveLogs();
        this.lastResourceExceed = 15;
        throw new Error("MEMORY Threshold Exceeded");
      }
      if (cpuThreshold <= cpuUsage) {
        this.lastResourceExceed = 15;
        saveLogs();
        throw new Error("CPU Threshold Exceeded");
      }
    }
  }
}
