import { TizenWebApplication } from "../resource-monitor/tizen-web-application";

export const isTizenSupported = (function () {
  const isTizenSupported = TizenWebApplication.isSupported();
  return isTizenSupported;
})();
