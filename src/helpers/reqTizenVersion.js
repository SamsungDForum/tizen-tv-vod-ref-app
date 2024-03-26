import { getTizenVersion } from "../../libs/tizenFilesystem";

export const reqTizenVersion = (version) => {
  if (typeof tizen !== "undefined") {
    var tizenVersion = parseFloat(getTizenVersion());
    return tizenVersion > version ? true : false;
  } else {
    return true;
  }
};
