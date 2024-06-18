/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import toast from "react-hot-toast";
import { writeToFileAsync } from "../../../libs/tizenFilesystem";

function getCurrentTime() {
  let current = new Date();
  return [current.getHours(), current.getMinutes(), current.getSeconds()]
    .map((myNumber) =>
      myNumber.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })
    )
    .join("-");
}

function listStorages() {
  return new Promise((resolve, reject) => tizen.filesystem.listStorages(resolve, reject));
}

function logFileStorage(storages) {
  return new Promise((resolve, reject) => {
    for (const storage of storages) {
      if (storage.type !== "EXTERNAL" || storage.state !== "MOUNTED") continue;
      resolve(storage);
      return;
    }
    reject("No suitable storage found");
  });
}

function logFileStorageLocation(storage) {
  return new Promise((resolve, reject) => tizen.filesystem.resolve(storage.label, resolve, reject, null, "r"));
}

function writeLogData(logData) {
  return (location) => {
    const logPath = `${location.path}${location.name}/refapp_${getCurrentTime()}.log`;
    console.log("Saving logs to:", logPath);
    writeToFileAsync(logPath, logData)
      .then(() => console.log("Saving logs completed"))
      .then(() => toast.success("Saving logs completed"));
  };
}

function writeFavouriteData(favouriteClips) {
  return (location) => {
    const favPath = `${location.path}${location.name}/VideoContent.json`;
    console.log("Saving favorite clips to:", favPath);
    writeToFileAsync(favPath, JSON.stringify(favouriteClips, null, 2))
      .then(() => console.log("Saving favorite clips completed"))
      .then(() => toast.success("Saving favorite clips completed"));
  };
}

function writeError(error) {
  console.error("Save logs error:", error);
}

function writeFavouritesError(error) {
  console.error("Error saving favorite clips:", error);
}

function createLogFile(logData) {
  return listStorages().then(logFileStorage).then(logFileStorageLocation).then(writeLogData(logData)).catch(writeError);
}

function createClipsFile(logData) {
  return listStorages()
    .then(logFileStorage)
    .then(logFileStorageLocation)
    .then(writeFavouriteData(logData))
    .catch(writeFavouritesError);
}

export { createLogFile, createClipsFile, getCurrentTime };
