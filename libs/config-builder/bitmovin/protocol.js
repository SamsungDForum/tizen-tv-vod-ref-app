/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const mimeTypeProtocol = {
  // content type mappings
  "application/dash+xml": "dash",
  "application/x-mpegurl": "hls",
  "application/vnd.apple.mpegurl": "hls",
  "application/vnd.ms-sstr+xml": "smooth",
  "video/mp4": "progressive",
  "video/webm": "progressive",

  // url extension mappings
  mpd: "dash",
  m3u8: "hls",
  ism: "smooth",
  mp4: "progressive",
  webm: "progressive",

  dash: "dash",
  hls: "hls",
};

function fromUrlExtension(url) {
  return url ? mimeTypeProtocol[new URL(url).pathname.split(".").pop().toLocaleLowerCase()] : undefined;
}

function protocol({ contentType, manifest, url })
{
  return mimeTypeProtocol[contentType] ?? mimeTypeProtocol[manifest?.toLocaleLowerCase()] ?? fromUrlExtension(url);
}

export { protocol };
