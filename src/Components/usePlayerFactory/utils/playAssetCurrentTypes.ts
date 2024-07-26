/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

type Media = {
  id: number;
  name: string;
  requiresAuth: boolean;
  live?: boolean;
  url: string;
  poster: string;
  contentType?: string;
  licenseServerURL?: string;
  drmType?: string;
  drmPreference?: string[];
  licenseRequestHeaders?: {};
  widthResolution: number[];
  heightResolution: number[];
  audio?: string[];
  manifest?: string;
  container: string | string[];
  excludedFrom?: string | string[];
};

type Audio = {
  category: string;
  option: string | null;
};

type Subtitle = {
  category: string;
  option: string | null;
};

type Quality = {
  category: string;
  option: string | null;
};

type KeySystem = {
  category: string;
  option: string | null;
};

const playAssetItemToString = function (
  item: Audio | Subtitle | Quality | KeySystem
): string {
  let str = `${item.category}`;
  if (item.option) {
    str += ` ${item.option}`;
  }
  return str;
};

export { playAssetItemToString };
export type { Media, Audio, Subtitle, Quality, KeySystem };
