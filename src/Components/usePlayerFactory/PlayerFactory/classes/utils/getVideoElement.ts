/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const getVideoElement = (): HTMLVideoElement => {
  return document.getElementById("elVideo") as HTMLVideoElement;
};

// This is the same as above but with nullable value
// It will be removed in the future
const getNullableVideoElement = (): HTMLVideoElement | null => {
  const video = document.getElementById("elVideo") as HTMLVideoElement | null;
  return video;
};

export { getVideoElement, getNullableVideoElement };
