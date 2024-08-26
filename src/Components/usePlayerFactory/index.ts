/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { useEffect } from "react";
import PlayerFactory from "./PlayerFactory";
import type { PlayerConfig } from "./types/PlayerConfig";
import { playAssetItemToString } from "./utils/playAssetCurrentTypes";
import { useTypedSelector } from "../../reduxStore/useTypedSelector";

const usePlayerFactory = (playerType: PlayerConfig) => {
  const player = PlayerFactory.create(playerType);

  const media = useTypedSelector((state) => state.playAsset.value.media);
  const audio = useTypedSelector((state) => state.playAsset.value.audio);
  const subtitle = useTypedSelector((state) => state.playAsset.value.subtitle);
  const quality = useTypedSelector((state) => state.playAsset.value.quality);
  const keySystem = useTypedSelector(
    (state) => state.playAsset.value.keySystem
  );

  useEffect(() => {
    // media is null during initial start, contains empty object after reload if no media was selected.
    if (media == null || Object.keys(media).length == 0) return;

    player.setAsset(media, keySystem);
    console.log("usePlayerFactory asset change queued:", media, keySystem);
  }, [media, keySystem]);

  useEffect(() => {
    if (audio != null) {
      player.changeCurrentAudio(audio);
      console.log(
        "usePlayerFactory audio change queued:",
        playAssetItemToString(audio)
      );
    }
  }, [audio]);

  useEffect(() => {
    if (subtitle != null) {
      player.changeCurrentSubtitles(subtitle);
      console.log(
        "usePlayerFactory subtitile change queued:",
        playAssetItemToString(subtitle)
      );
    }
  }, [subtitle]);

  useEffect(() => {
    if (quality != null) {
      player.changeCurrentVideoQuality(quality);
      console.log(
        "usePlayerFactory quality change queued:",
        playAssetItemToString(quality)
      );
    }
  }, [quality]);

  const destroyPlayer = PlayerFactory.destroy;
  return { player, destroyPlayer };
};

export default usePlayerFactory;
