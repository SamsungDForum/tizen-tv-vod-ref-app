/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { Audio, Media, Quality, Subtitle, KeySystem } from "../utils/playAssetCurrentTypes";

interface IPlayer {
  setAsset(media: Media, keySystem?: KeySystem): void;
  changeCurrentAudio(audio: Audio): void;
  changeCurrentVideoQuality(quality: Quality): void;
  changeCurrentSubtitles(subtitles: Subtitle): void;
}

export type { IPlayer };