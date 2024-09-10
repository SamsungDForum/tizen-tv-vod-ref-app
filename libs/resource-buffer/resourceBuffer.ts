import type { TizenDetailsType } from "../../src/Components/WorkTabs/Tabs/AdvancedContent/ChartsComponents/ChartTypes";
import { saveLogs } from "../../src/Components/WorkTabs/Tabs/Logs/logger";
import { eventTypeMonitor, resourceMonitor } from "../resource-monitor";
import { unuseResourceMonitor, useResourceMonitor } from "../resource-monitor/resourceMonitorHandlers";
import { BufferDataType } from "./types";

export class ResourceBuffer {
  private errorCallback?: (error: Error) => void;
  private lastResourceExceed = 0; // determines how many measurements must be taken to allow the dataUsage file to be saved
  private saverSize = 200;
  private plotterSize = 30;
  dataSaver: BufferDataType = {
    cpuConsumption: [],
    memoryConsumption: [],
  };
  dataPlotter: BufferDataType = {
    cpuConsumption: [],
    memoryConsumption: [],
  };

  setErrorCallback(callback: (error: Error) => void) {
    this.errorCallback = callback;
  }

  start() {
    useResourceMonitor();
    resourceMonitor.addEventListener(eventTypeMonitor, this.save.bind(this));
  }

  stop() {
    unuseResourceMonitor();
    resourceMonitor.removeEventListener(eventTypeMonitor, this.save.bind(this));
  }

  reset() {
    this.dataSaver = {
      cpuConsumption: [],
      memoryConsumption: [],
    };
    this.dataPlotter = {
      cpuConsumption: [],
      memoryConsumption: [],
    };
  }

  save(e) {
    if (e.detail.tizen == undefined) return null;
    const { memoryUsage, cpuUsage }: TizenDetailsType = e.detail.tizen;

    // Check if threshold has been exceeded
    if (this.dataSaver.cpuConsumption.length > 10) {
      try {
        this.saveFilesWhenThresholdExceeded(memoryUsage, cpuUsage);
      } catch (error) {
        if (error instanceof Error && this.errorCallback != null) this.errorCallback(error);
      }
    }

    // Saving
    const memoryArraySaver = this.dataSaver.memoryConsumption;
    if (memoryArraySaver.length > this.saverSize) memoryArraySaver.pop();
    memoryArraySaver.unshift(memoryUsage);

    const cpuArraySaver = this.dataSaver.cpuConsumption;
    if (cpuArraySaver.length > this.saverSize) cpuArraySaver.pop();
    cpuArraySaver.unshift(cpuUsage);

    // Plotting
    const memoryArrayPlotter = this.dataPlotter.memoryConsumption;
    if (memoryArrayPlotter.length > this.plotterSize) memoryArrayPlotter.pop();
    memoryArrayPlotter.unshift(memoryUsage);

    const cpuArrayPlotter = this.dataPlotter.cpuConsumption;
    if (cpuArrayPlotter.length > this.plotterSize) cpuArrayPlotter.pop();
    cpuArrayPlotter.unshift(cpuUsage);
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
