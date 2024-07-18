/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { useEffect, useState } from "react";
import PlayerFactory from "./PlayerFactory";
import type { PlayerConfig } from "./types/PlayerConfig";
import { playAssetItemToString } from "./utils/playAssetCurrentTypes";
import { IPlayer } from "./interfaces/IPlayer";
import { useTypedSelector } from "../../reduxStore/useTypedSelector";

const usePlayerFactory = (playerType: PlayerConfig) => {
  const [player, setPlayer] = useState<IPlayer | null | undefined>(null);
  const destroyPlayer = () => PlayerFactory.destroy();

  // Run prior to any effect accessing player
  useEffect(() => {
    setPlayer(PlayerFactory.create(playerType));
  }, []);

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

    player?.setAsset(media, keySystem);
  }, [media, keySystem]);

  useEffect(() => {
    if (player != null && audio != null) {
      player.changeCurrentAudio(audio);
      console.log(`audio has changed - ${playAssetItemToString(audio)}`);
    }
  }, [audio]);

  useEffect(() => {
    if (player != null && subtitle != null) {
      player.changeCurrentSubtitles(subtitle);
      console.log(`subtitile has changed - ${playAssetItemToString(subtitle)}`);
    }
  }, [subtitle]);

  useEffect(() => {
    if (player != null && quality != null) {
      player.changeCurrentVideoQuality(quality);
      console.log(`quality has changed - ${playAssetItemToString(quality)}`);
    }
  }, [quality]);

  return [player, destroyPlayer];
};

export default usePlayerFactory;
