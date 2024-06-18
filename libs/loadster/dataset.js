/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

function increment({ dataset }, key) {
  dataset[key] = parseInt(dataset[key]) + 1;
}

function decrement({ dataset }, key) {
  const useCount = parseInt(dataset[key]) - 1;
  dataset[key] = useCount;
  return useCount;
}

function setValue({ dataset }, key, value) {
  dataset[key] = value;
}

function setKey(dataset, key) {
  setValue(dataset, key, true);
}

function clearKey({ dataset }, key) {
  delete dataset[key];
}

function getKey({ dataset }, key) {
  return dataset[key] ? key : undefined;
}

export {increment, decrement, setValue, setKey, clearKey, getKey};