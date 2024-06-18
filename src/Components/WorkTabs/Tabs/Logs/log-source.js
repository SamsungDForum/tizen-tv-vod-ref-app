/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, { useState, useEffect, useRef } from "react";
import { Console, Hook, Unhook, HookedConsole } from "console-feed";
import { useStateEvent } from "../../../../../libs/native-event";
import EventTarget from "@ungap/event-target";

let hook = null;
let collectedLogs = [];
const onLogs = new EventTarget();
const ConsoleCaptureEvent = "ConsoleCapture";

function timeStamp() {
  const date = new Date();
  const hours = String(date.getHours());
  const minutes = String(date.getMinutes());
  const seconds = String(date.getSeconds());
  const milliseconds = String(date.getMilliseconds());

  return (
    "[" +
    (hours.length === 2 ? hours : "0" + hours) +
    ":" +
    (minutes.length === 2 ? minutes : "0" + minutes) +
    ":" +
    (seconds.length === 2 ? seconds : "0" + seconds) +
    "." +
    (milliseconds.length === 3 ? milliseconds : milliseconds.length === 2 ? "0" + milliseconds : "00" + milliseconds) +
    "]"
  );
}

function appendLog(log) {
  // Index is call location dependant. Needs to be updated if moved to different
  // position in call tree.
  log.data.push(new Error().stack.split("\n")[4]);

  // Tagging messages with 'WARN'/'ERROR' for message colouring compatibility with
  // preexisting UI component.
  if (log.method == "warn") {
    log.data = ["WARN", timeStamp(), ...log.data];
  } else if (log.method == "error") {
    log.data = ["ERROR", timeStamp(), ...log.data];
  } else if (log.method == "log") {
    log.data = ["LOG", timeStamp(), ...log.data];
  } else if (log.method == "info") {
    log.data = ["INFO", timeStamp(), ...log.data];
  } else if (log.method == "debug") {
    log.data = ["DEBUG", timeStamp(), ...log.data];
  } else {
    log.data = [log.method, timeStamp(), ...log.data];
  }

  log.dataLine = log.data.join(" ");
  collectedLogs.push(log);

  onLogs.dispatchEvent(new CustomEvent(ConsoleCaptureEvent, { detail: log.dataLine }));
}

function startCapture() {
  if (hook) {
    console.warn(startCapture.name, "capture is running");
  } else {
    hook = Hook(console, appendLog, false);
  }
}

function stopCapture() {
  if (!hook) {
    console.warn(startCapture.name, "capture is not running");
  } else {
    Unhook(hook);
    hook = null;
    collectedLogs = [];
  }
}

function consoleLogs() {
  return collectedLogs;
}

function resetLogs() {
  collectedLogs = [];
}

function eventConsoleCapture() {
  return useStateEvent(onLogs, ConsoleCaptureEvent);
}

export { startCapture, stopCapture, eventConsoleCapture, consoleLogs, resetLogs };
