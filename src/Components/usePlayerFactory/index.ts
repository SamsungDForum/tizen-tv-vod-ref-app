import { useEffect, useState } from "react";
import PlayerFactory from "./PlayerFactory";
import type { PlayerConfig } from "./types/PlayerConfig";
import { playAssetItemToString } from "./utils/playAssetCurrentTypes";
import { IPlayer } from "./interfaces/IPlayer";
import { useTypedSelector } from "../../reduxStore/useTypedSelector";

const usePlayerFactory = (playerType: PlayerConfig) => {
  const [player, setPlayer] = useState<IPlayer | null | undefined>(null);
  const media = useTypedSelector(state => state.playAsset.value.media);
  const audio = useTypedSelector(state => state.playAsset.value.audio);
  const subtitle = useTypedSelector(state => state.playAsset.value.subtitle);
  const quality = useTypedSelector(state => state.playAsset.value.quality);
  const keySystem = useTypedSelector(state => state.playAsset.value.keySystem);

  const destroyPlayer = () => PlayerFactory.destroy();

  useEffect(() => {
    setPlayer(PlayerFactory.create(playerType));
  }, []);

  useEffect(() => {
    if(player != null && media != null) {
      player.setAsset(media, keySystem);
    }
  }, [media, keySystem]);

  useEffect(() => {
    if(player != null && audio != null) {
      player.changeCurrentAudio(audio);
      console.log(`audio has changed - ${playAssetItemToString(audio)}`);
    }
  }, [audio]);
  
  useEffect(() => {
    if(player != null && subtitle != null) {
      player.changeCurrentSubtitles(subtitle);
      console.log(`subtitile has changed - ${playAssetItemToString(subtitle)}`);
    }
  }, [subtitle]);
  
  useEffect(() => {
    if(player != null && quality != null) { 
      player.changeCurrentVideoQuality(quality);
      console.log(`quality has changed - ${playAssetItemToString(quality)}`);
    }
  }, [quality]);
    
  return [player, destroyPlayer];
}

export default usePlayerFactory;