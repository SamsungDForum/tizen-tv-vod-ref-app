import { Media } from "../../../../utils/playAssetCurrentTypes";
import Hlsjs from "..";
import { getPlaybackTime } from "../../../../utils/playAsset";

const setAsset = function(this: Hlsjs, media: Media): void {
  console.log(`${Hlsjs.name}: setAsset()`, media);
  this.player = this.player.then(player => new Promise(res => {

    const playbackTime = getPlaybackTime();
    player.config.startPosition = playbackTime;
    console.log('Continuous watching:', playbackTime);
    player.loadSource(media.url);
    res(player);
  }));
}

export default setAsset;