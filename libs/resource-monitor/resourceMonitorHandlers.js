import { resourceMonitor } from ".";

export function unuseResourceMonitor() {
  resourceMonitor.unuse();
}

export function useResourceMonitor() {
  resourceMonitor.use();
}
