import { ResourceMonitor, eventTypeMonitor } from "./resource-monitor";

const resourceMonitor = new ResourceMonitor(2000);

export { resourceMonitor, eventTypeMonitor };
