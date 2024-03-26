import { Subtitle } from "../../../../utils/playAssetCurrentTypes";
import Hlsjs from "..";

const changeCurrentSubtitles = function(this: Hlsjs, subtitles: Subtitle): void {
  this.player = this.player.then(player => new Promise(res => {
    if(subtitles.category === 'off') {
      player.subtitleTrack = -1
    } else {
      const subtitleId = player.subtitleTracks
        .find(item => item.lang === subtitles.category).id;
      player.subtitleTrack = subtitleId;
    }
    res(player);
  }));
}

export default changeCurrentSubtitles;