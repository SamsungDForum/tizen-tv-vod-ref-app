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

function getCurrentDate() {
  let current = new Date();
  return [current.getMonth() + 1, current.getDate(), current.getFullYear()]
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
      .then(() => {
        console.log("Saving logs completed");
        toast.success("Saving logs completed");
      })
      .catch((err) => {
        console.log("Error saving logs");
        toast.error(`Error saving logs: ${err}`);
      });
  };
}
function writeResourceData(usageData) {
  return (location) => {
    const usagePath = `${location.path}${location.name}/dataUsage_${getCurrentTime()}_${getCurrentDate()}.log`;
    console.log("Saving resource data to:", usagePath);
    writeToFileAsync(usagePath, usageData)
      .then(() => {
        console.log("Saving resource data completed");
        toast.success("Saving resource data completed");
      })
      .catch((err) => {
        console.log("Error saving resource data");
        toast.error(`Error saving resource data: ${err}`);
      });
  };
}

function writeFavouriteData(favouriteClips) {
  return (location) => {
    const favPath = `${location.path}${location.name}/VideoContent.json`;
    console.log("Saving favorite clips to:", favPath);
    writeToFileAsync(favPath, JSON.stringify(favouriteClips, null, 2))
      .then(() => {
        console.log("Saving favorite clips completed");
        toast.success("Saving favorite clips completed");
      })
      .catch((err) => {
        console.log("Error saving clips");
        toast.error(`Error saving clips: ${err}`);
      });
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
function createResourceConsumptionFile(resourceData) {
  return listStorages()
    .then(logFileStorage)
    .then(logFileStorageLocation)
    .then(writeResourceData(resourceData))
    .catch(writeError);
}

function createClipsFile(logData) {
  return listStorages()
    .then(logFileStorage)
    .then(logFileStorageLocation)
    .then(writeFavouriteData(logData))
    .catch(writeFavouritesError);
}

export { createResourceConsumptionFile, createLogFile, createClipsFile, getCurrentTime };
